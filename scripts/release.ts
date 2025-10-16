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
    const packageDirs = ['core', 'openapi', 'raml'];

    for (const packageDir of packageDirs) {
      const packagePath = join(packagesDir, packageDir);
      const packageJsonPath = join(packagePath, 'package.json');

      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        this.packages.set(packageJson.name, {
          ...packageJson,
          path: packagePath,
          packageJsonPath,
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

  private validatePackages(): void {
    console.log('🔍 Validating packages...');
    
    for (const [name, pkg] of this.packages) {
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

  private async runTests(): Promise<void> {
    console.log('🧪 Running tests...');
    this.exec('bun test --recursive');
    console.log('✅ All tests passed');
  }

  private async buildPackages(): Promise<void> {
    console.log('🔨 Building packages...');
    this.exec('bun run build');
    console.log('✅ All packages built');
  }

  private async publishPackages(options: ReleaseOptions): Promise<void> {
    const publishOrder = ['@laag/core', '@laag/openapi', '@laag/raml'];
    
    for (const packageName of publishOrder) {
      const pkg = this.packages.get(packageName);
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
      // Validate packages
      this.validatePackages();

      // Update versions if specified
      if (options.version) {
        console.log(`📝 Updating versions to ${options.version}...`);
        for (const packageName of this.packages.keys()) {
          this.updatePackageVersion(packageName, options.version);
        }
      }

      // Run tests
      if (!options.skipTests) {
        await this.runTests();
      }

      // Build packages
      if (!options.skipBuild) {
        await this.buildPackages();
      }

      // Publish packages
      if (!options.dryRun) {
        await this.publishPackages(options);
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
  
  const options: ReleaseOptions = {
    version: args.find(arg => arg.startsWith('--version='))?.split('=')[1],
    tag: args.find(arg => arg.startsWith('--tag='))?.split('=')[1],
    dryRun: args.includes('--dry-run'),
    skipTests: args.includes('--skip-tests'),
    skipBuild: args.includes('--skip-build'),
    verbose: args.includes('--verbose'),
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