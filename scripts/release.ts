#!/usr/bin/env bun

/**
 * Release management script for the laag workspace
 * Handles version bumping, building, testing, and publishing
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface ReleaseOptions {
  version?: string;
  tag?: string;
  dryRun?: boolean;
  skipTests?: boolean;
  skipBuild?: boolean;
  packages?: string[];
  verbose?: boolean;
  independent?: boolean;
}

class ReleaseManager {
  private workspaceRoot: string;
  private packages: Map<string, any> = new Map();

  constructor(workspaceRoot: string = process.cwd()) {
    this.workspaceRoot = workspaceRoot;
    this.discoverPackages();
  }

  private discoverPackages(): void {
    const packagesDir = join(this.workspaceRoot, 'packages');
    const packageDirs = ['core', 'openapi', 'raml', 'cli'];

    for (const packageDir of packageDirs) {
      const packagePath = join(packagesDir, packageDir);
      const packageJsonPath = join(packagePath, 'package.json');

      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        this.packages.set(packageJson.name, {
          ...packageJson,
          path: packagePath,
          packageJsonPath,
          directoryName: packageDir,
        });
      }
    }
  }

  private exec(command: string, cwd?: string): string {
    return execSync(command, {
      cwd: cwd || this.workspaceRoot,
      encoding: 'utf-8',
      stdio: 'pipe',
    }).toString().trim();
  }

  private updatePackageVersion(packageName: string, version: string): void {
    const pkg = this.packages.get(packageName);
    if (!pkg) {
      throw new Error(`Package ${packageName} not found`);
    }

    pkg.version = version;
    
    // Update workspace dependencies
    for (const [depName, depVersion] of Object.entries(pkg.dependencies || {})) {
      if (this.packages.has(depName) && typeof depVersion === 'string' && depVersion.startsWith('workspace:')) {
        pkg.dependencies[depName] = `workspace:^${version}`;
      }
    }

    writeFileSync(pkg.packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`✅ Updated ${packageName} to version ${version}`);
  }

  private validatePackages(packagesToValidate?: Map<string, any>): void {
    console.log('🔍 Validating packages...');
    
    const packages = packagesToValidate || this.packages;
    
    for (const [name, pkg] of packages) {
      // Check required fields
      const requiredFields = ['name', 'version', 'description', 'license', 'author'];
      for (const field of requiredFields) {
        if (!pkg[field]) {
          throw new Error(`Package ${name} is missing required field: ${field}`);
        }
      }

      // Check exports configuration
      if (!pkg.exports || !pkg.exports['.']) {
        throw new Error(`Package ${name} is missing proper exports configuration`);
      }

      // Check files array
      if (!pkg.files || !Array.isArray(pkg.files)) {
        throw new Error(`Package ${name} is missing files array`);
      }

      // Check publishConfig
      if (!pkg.publishConfig || pkg.publishConfig.access !== 'public') {
        throw new Error(`Package ${name} is missing publishConfig.access: "public"`);
      }
    }

    console.log('✅ All packages validated');
  }

  private async runTests(packages?: string[]): Promise<void> {
    console.log('🧪 Running tests...');
    if (packages && packages.length > 0) {
      // Run tests for specific packages
      for (const packageName of packages) {
        const pkg = this.packages.get(packageName);
        if (pkg) {
          console.log(`Testing ${packageName}...`);
          this.exec('bun test', pkg.path);
        }
      }
    } else {
      // Run all tests
      this.exec('bun test --recursive');
    }
    console.log('✅ All tests passed');
  }

  private async buildPackages(packages?: string[]): Promise<void> {
    console.log('🔨 Building packages...');
    if (packages && packages.length > 0) {
      // Build specific packages
      for (const packageName of packages) {
        const pkg = this.packages.get(packageName);
        if (pkg) {
          console.log(`Building ${packageName}...`);
          this.exec(`bun run build:${pkg.directoryName}`);
        }
      }
    } else {
      // Build all packages
      this.exec('bun run build');
    }
    console.log('✅ All packages built');
  }

  private async publishPackages(options: ReleaseOptions, packagesToPublish?: Map<string, any>): Promise<void> {
    const packages = packagesToPublish || this.packages;
    const publishOrder = ['@laag/core', '@laag/openapi', '@laag/raml', '@laag/cli'];
    
    // Filter and order packages based on dependency order
    const orderedPackages = publishOrder.filter(name => packages.has(name));
    
    for (const packageName of orderedPackages) {
      const pkg = packages.get(packageName);
      if (!pkg) continue;

      console.log(`📦 Publishing ${packageName}...`);
      
      const publishCmd = options.dryRun 
        ? 'npm publish --dry-run'
        : `npm publish${options.tag ? ` --tag ${options.tag}` : ''}`;

      try {
        this.exec(publishCmd, pkg.path);
        console.log(`✅ Published ${packageName}`);
      } catch (error) {
        console.error(`❌ Failed to publish ${packageName}:`, error);
        throw error;
      }
    }
  }

  async release(options: ReleaseOptions = {}): Promise<void> {
    console.log('🚀 Starting release process...');

    try {
      // Filter packages if specific packages are requested
      const packagesToRelease = options.packages 
        ? new Map([...this.packages].filter(([name]) => options.packages!.includes(name)))
        : this.packages;

      if (packagesToRelease.size === 0) {
        throw new Error('No packages found to release');
      }

      console.log(`📦 Releasing packages: ${Array.from(packagesToRelease.keys()).join(', ')}`);

      // Validate packages
      this.validatePackages(packagesToRelease);

      // Update versions if specified
      if (options.version) {
        console.log(`📝 Updating versions to ${options.version}...`);
        for (const packageName of packagesToRelease.keys()) {
          this.updatePackageVersion(packageName, options.version);
        }
      }

      // Run tests (for specific packages if specified)
      if (!options.skipTests) {
        await this.runTests(options.packages);
      }

      // Build packages (for specific packages if specified)
      if (!options.skipBuild) {
        await this.buildPackages(options.packages);
      }

      // Publish packages
      if (!options.dryRun) {
        await this.publishPackages(options, packagesToRelease);
      } else {
        console.log('🔍 Dry run - would publish packages');
      }

      console.log('🎉 Release completed successfully!');
    } catch (error) {
      console.error('❌ Release failed:', error);
      throw error;
    }
  }

  listPackages(): void {
    console.log('📦 Publishable packages:');
    for (const [name, pkg] of this.packages) {
      console.log(`  ${name}@${pkg.version}`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  // Parse packages argument
  const packagesArg = args.find(arg => arg.startsWith('--packages='))?.split('=')[1];
  const packages = packagesArg ? packagesArg.split(',') : undefined;
  
  const options: ReleaseOptions = {
    version: args.find(arg => arg.startsWith('--version='))?.split('=')[1],
    tag: args.find(arg => arg.startsWith('--tag='))?.split('=')[1],
    dryRun: args.includes('--dry-run'),
    skipTests: args.includes('--skip-tests'),
    skipBuild: args.includes('--skip-build'),
    verbose: args.includes('--verbose'),
    packages,
    independent: args.includes('--independent'),
  };

  const manager = new ReleaseManager();

  if (args.includes('--list')) {
    manager.listPackages();
    return;
  }

  try {
    await manager.release(options);
  } catch (error) {
    console.error('Release failed:', error);
    process.exit(1);
  }
}

if (import.meta.main) {
  main().catch(console.error);
}