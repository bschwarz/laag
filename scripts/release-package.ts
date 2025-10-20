#!/usr/bin/env bun

/**
 * Individual package release script
 * Handles releasing a single package with independent versioning
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface PackageReleaseOptions {
  packageName: string;
  version?: string;
  versionType?: 'patch' | 'minor' | 'major' | 'prerelease';
  tag?: string;
  dryRun?: boolean;
  skipTests?: boolean;
  skipBuild?: boolean;
  verbose?: boolean;
}

class PackageReleaseManager {
  private workspaceRoot: string;
  private packageInfo: any;

  constructor(packageName: string, workspaceRoot: string = process.cwd()) {
    this.workspaceRoot = workspaceRoot;
    this.packageInfo = this.loadPackageInfo(packageName);
  }

  private loadPackageInfo(packageName: string): any {
    // Map package names to directory names
    const packageMap: Record<string, string> = {
      '@laag/core': 'core',
      '@laag/openapi': 'openapi',
      '@laag/raml': 'raml',
      '@laag/cli': 'cli',
    };

    const dirName = packageMap[packageName];
    if (!dirName) {
      throw new Error(`Unknown package: ${packageName}`);
    }

    const packagePath = join(this.workspaceRoot, 'packages', dirName);
    const packageJsonPath = join(packagePath, 'package.json');

    if (!existsSync(packageJsonPath)) {
      throw new Error(`Package not found: ${packageName} at ${packagePath}`);
    }

    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    return {
      ...packageJson,
      path: packagePath,
      packageJsonPath,
      directoryName: dirName,
    };
  }

  private exec(command: string, cwd?: string): string {
    return execSync(command, {
      cwd: cwd || this.workspaceRoot,
      encoding: 'utf-8',
      stdio: 'pipe',
    }).toString().trim();
  }

  private updateVersion(versionType?: string, customVersion?: string): string {
    if (customVersion) {
      this.packageInfo.version = customVersion;
      writeFileSync(this.packageInfo.packageJsonPath, JSON.stringify(this.packageInfo, null, 2) + '\n');
      return customVersion;
    }

    if (versionType) {
      // Parse current version and bump it
      const currentVersion = this.packageInfo.version;
      const newVersion = this.bumpVersion(currentVersion, versionType);
      this.packageInfo.version = newVersion;
      writeFileSync(this.packageInfo.packageJsonPath, JSON.stringify(this.packageInfo, null, 2) + '\n');
      return newVersion;
    }

    return this.packageInfo.version;
  }

  private bumpVersion(currentVersion: string, versionType: string): string {
    const parts = currentVersion.split('.');
    let [major, minor, patch] = parts.map(Number);

    switch (versionType) {
      case 'major':
        major++;
        minor = 0;
        patch = 0;
        break;
      case 'minor':
        minor++;
        patch = 0;
        break;
      case 'patch':
        patch++;
        break;
      case 'prerelease':
        // Simple prerelease implementation
        if (currentVersion.includes('-')) {
          // Increment existing prerelease
          const [base, prerelease] = currentVersion.split('-');
          const prereleaseNum = parseInt(prerelease.split('.').pop() || '0') + 1;
          return `${base}-alpha.${prereleaseNum}`;
        } else {
          // Add first prerelease
          return `${currentVersion}-alpha.0`;
        }
      default:
        throw new Error(`Unknown version type: ${versionType}`);
    }

    return `${major}.${minor}.${patch}`;
  }

  private validatePackage(): void {
    console.log(`🔍 Validating ${this.packageInfo.name}...`);

    // Check required fields
    const requiredFields = ['name', 'version', 'description', 'license'];
    for (const field of requiredFields) {
      if (!this.packageInfo[field]) {
        throw new Error(`Package ${this.packageInfo.name} is missing required field: ${field}`);
      }
    }

    // Check exports configuration
    if (!this.packageInfo.exports || !this.packageInfo.exports['.']) {
      throw new Error(`Package ${this.packageInfo.name} is missing proper exports configuration`);
    }

    // Check publishConfig
    if (!this.packageInfo.publishConfig || this.packageInfo.publishConfig.access !== 'public') {
      throw new Error(`Package ${this.packageInfo.name} is missing publishConfig.access: "public"`);
    }

    console.log('✅ Package validated');
  }

  private async runTests(): Promise<void> {
    console.log(`🧪 Running tests for ${this.packageInfo.name}...`);
    this.exec('bun test', this.packageInfo.path);
    console.log('✅ Tests passed');
  }

  private async buildPackage(): Promise<void> {
    console.log(`🔨 Building ${this.packageInfo.name}...`);
    
    // Build dependencies first if needed
    if (this.packageInfo.name !== '@laag/core') {
      console.log('Building dependencies...');
      this.exec('bun run build:core');
    }
    
    this.exec(`bun run build:${this.packageInfo.directoryName}`);
    console.log('✅ Package built');
  }

  private async publishPackage(options: PackageReleaseOptions): Promise<void> {
    console.log(`📦 Publishing ${this.packageInfo.name}...`);

    const publishCmd = options.dryRun 
      ? 'npm publish --dry-run'
      : `npm publish${options.tag ? ` --tag ${options.tag}` : ''}`;

    try {
      this.exec(publishCmd, this.packageInfo.path);
      console.log(`✅ Published ${this.packageInfo.name}@${this.packageInfo.version}`);
    } catch (error) {
      console.error(`❌ Failed to publish ${this.packageInfo.name}:`, error);
      throw error;
    }
  }

  async release(options: PackageReleaseOptions): Promise<void> {
    console.log(`🚀 Starting release for ${this.packageInfo.name}...`);

    try {
      // Validate package
      this.validatePackage();

      // Update version
      const newVersion = this.updateVersion(options.versionType, options.version);
      console.log(`📝 Version: ${newVersion}`);

      // Run tests
      if (!options.skipTests) {
        await this.runTests();
      }

      // Build package
      if (!options.skipBuild) {
        await this.buildPackage();
      }

      // Publish package
      await this.publishPackage(options);

      console.log(`🎉 Successfully released ${this.packageInfo.name}@${newVersion}!`);
    } catch (error) {
      console.error('❌ Release failed:', error);
      throw error;
    }
  }

  getPackageInfo(): any {
    return {
      name: this.packageInfo.name,
      version: this.packageInfo.version,
      path: this.packageInfo.path,
    };
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help')) {
    console.log(`
Usage: bun run scripts/release-package.ts <package-name> [options]

Package Names:
  @laag/core      - Core utilities and base classes
  @laag/openapi   - OpenAPI/Swagger document library
  @laag/raml      - RAML document library
  @laag/cli       - Command-line interface

Options:
  --version=X.Y.Z     Set specific version
  --patch             Bump patch version
  --minor             Bump minor version  
  --major             Bump major version
  --prerelease        Bump prerelease version
  --tag=TAG           NPM tag (latest, beta, alpha)
  --dry-run           Test without publishing
  --skip-tests        Skip running tests
  --skip-build        Skip building package
  --verbose           Verbose output

Examples:
  # Release OpenAPI package with patch version bump
  bun run scripts/release-package.ts @laag/openapi --patch

  # Release with specific version
  bun run scripts/release-package.ts @laag/openapi --version=2.1.0

  # Dry run release
  bun run scripts/release-package.ts @laag/openapi --patch --dry-run

  # Release with beta tag
  bun run scripts/release-package.ts @laag/openapi --prerelease --tag=beta
`);
    return;
  }

  const packageName = args[0];
  if (!packageName.startsWith('@laag/')) {
    console.error('❌ Package name must start with @laag/');
    process.exit(1);
  }

  const options: PackageReleaseOptions = {
    packageName,
    version: args.find(arg => arg.startsWith('--version='))?.split('=')[1],
    versionType: args.includes('--patch') ? 'patch' :
                 args.includes('--minor') ? 'minor' :
                 args.includes('--major') ? 'major' :
                 args.includes('--prerelease') ? 'prerelease' : undefined,
    tag: args.find(arg => arg.startsWith('--tag='))?.split('=')[1],
    dryRun: args.includes('--dry-run'),
    skipTests: args.includes('--skip-tests'),
    skipBuild: args.includes('--skip-build'),
    verbose: args.includes('--verbose'),
  };

  try {
    const manager = new PackageReleaseManager(packageName);
    
    if (args.includes('--info')) {
      console.log('📦 Package Information:');
      console.log(JSON.stringify(manager.getPackageInfo(), null, 2));
      return;
    }

    await manager.release(options);
  } catch (error) {
    console.error('Release failed:', error);
    process.exit(1);
  }
}

if (import.meta.main) {
  main().catch(console.error);
}