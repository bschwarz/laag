#!/usr/bin/env bun

/**
 * Workspace version management script
 * Replaces Lerna's version management with Bun workspace support
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface VersionOptions {
  type?: 'patch' | 'minor' | 'major' | 'prerelease';
  version?: string;
  preid?: string;
  independent?: boolean;
  dryRun?: boolean;
  tag?: boolean;
  push?: boolean;
}

class WorkspaceVersionManager {
  private workspaceRoot: string;
  private packages: Map<string, any> = new Map();

  constructor(workspaceRoot: string = process.cwd()) {
    this.workspaceRoot = workspaceRoot;
    this.discoverPackages();
  }

  private discoverPackages(): void {
    const packagesDir = join(this.workspaceRoot, 'packages');
    const packageDirs = ['core', 'openapi', 'raml', 'cli', 'smithy'];

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

  private bumpVersion(currentVersion: string, type: string, preid?: string): string {
    const parts = currentVersion.split('.');
    let [major, minor, patch] = parts.map(Number);

    switch (type) {
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
        if (currentVersion.includes('-')) {
          // Increment existing prerelease
          const prereleaseParts = currentVersion.split('-');
          const prereleaseVersion = prereleaseParts[1];
          const prereleaseNumber = parseInt(prereleaseVersion.split('.').pop() || '0');
          return `${major}.${minor}.${patch}-${preid || 'alpha'}.${prereleaseNumber + 1}`;
        } else {
          // Create new prerelease
          return `${major}.${minor}.${patch + 1}-${preid || 'alpha'}.0`;
        }
      default:
        throw new Error(`Unknown version type: ${type}`);
    }

    return `${major}.${minor}.${patch}`;
  }

  private updatePackageVersion(packageName: string, newVersion: string): void {
    const pkg = this.packages.get(packageName);
    if (!pkg) {
      throw new Error(`Package ${packageName} not found`);
    }

    const oldVersion = pkg.version;
    pkg.version = newVersion;

    // Update workspace dependencies
    for (const [depName, depVersion] of Object.entries(pkg.dependencies || {})) {
      if (this.packages.has(depName) && typeof depVersion === 'string' && depVersion.startsWith('workspace:')) {
        pkg.dependencies[depName] = `workspace:^${newVersion}`;
      }
    }

    writeFileSync(pkg.packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`✅ ${packageName}: ${oldVersion} → ${newVersion}`);
  }

  private updateRootVersion(newVersion: string): void {
    const rootPackageJsonPath = join(this.workspaceRoot, 'package.json');
    const rootPackageJson = JSON.parse(readFileSync(rootPackageJsonPath, 'utf-8'));
    
    const oldVersion = rootPackageJson.version || '0.0.0';
    rootPackageJson.version = newVersion;
    
    writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2) + '\n');
    console.log(`✅ Root package: ${oldVersion} → ${newVersion}`);
  }

  private createGitTag(version: string, options: VersionOptions): void {
    if (!options.tag) return;

    const tagName = `v${version}`;
    
    try {
      this.exec(`git tag ${tagName}`);
      console.log(`✅ Created git tag: ${tagName}`);
      
      if (options.push) {
        this.exec(`git push origin ${tagName}`);
        console.log(`✅ Pushed git tag: ${tagName}`);
      }
    } catch (error) {
      console.error(`❌ Failed to create/push git tag: ${error}`);
    }
  }

  async version(options: VersionOptions = {}): Promise<void> {
    console.log('🚀 Starting workspace version update...');

    try {
      let newVersion: string;

      if (options.version) {
        // Use specific version
        newVersion = options.version;
      } else if (options.type) {
        // Calculate new version based on type
        const currentVersions = Array.from(this.packages.values()).map(pkg => pkg.version);
        const rootPackageJson = JSON.parse(readFileSync(join(this.workspaceRoot, 'package.json'), 'utf-8'));
        const currentVersion = rootPackageJson.version || Math.max(...currentVersions.map(v => v.split('.')[0])) + '.0.0';
        
        newVersion = this.bumpVersion(currentVersion, options.type, options.preid);
      } else {
        throw new Error('Must specify either --version or version type (--patch, --minor, --major, --prerelease)');
      }

      console.log(`📝 New version: ${newVersion}`);

      if (options.dryRun) {
        console.log('🔍 Dry run - would update:');
        for (const [name, pkg] of this.packages) {
          console.log(`  ${name}: ${pkg.version} → ${newVersion}`);
        }
        return;
      }

      // Update root package.json
      this.updateRootVersion(newVersion);

      if (options.independent) {
        // Independent versioning - each package can have different versions
        console.log('📦 Independent versioning mode - update packages individually');
        for (const [name, pkg] of this.packages) {
          const packageNewVersion = options.type ? this.bumpVersion(pkg.version, options.type, options.preid) : newVersion;
          this.updatePackageVersion(name, packageNewVersion);
        }
      } else {
        // Unified versioning - all packages get the same version
        console.log('📦 Unified versioning mode - all packages get same version');
        for (const packageName of this.packages.keys()) {
          this.updatePackageVersion(packageName, newVersion);
        }
      }

      // Create git tag
      this.createGitTag(newVersion, options);

      console.log('🎉 Version update completed successfully!');
    } catch (error) {
      console.error('❌ Version update failed:', error);
      throw error;
    }
  }

  listPackages(): void {
    console.log('📦 Workspace packages:');
    for (const [name, pkg] of this.packages) {
      console.log(`  ${name}@${pkg.version} (${pkg.directoryName})`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🚀 Bun Workspace Version Manager

Usage: bun run scripts/version-workspace.ts [options]

Options:
  --patch                 Bump patch version (x.y.Z)
  --minor                 Bump minor version (x.Y.z)
  --major                 Bump major version (X.y.z)
  --prerelease            Bump prerelease version (x.y.z-alpha.N)
  --version=X.Y.Z         Set specific version
  --preid=ID              Prerelease identifier (alpha, beta, rc)
  --independent           Independent package versioning
  --tag                   Create git tag
  --push                  Push git tag to remote
  --dry-run               Show what would be updated
  --list                  List all workspace packages
  --help, -h              Show this help message

Examples:
  # Bump patch version for all packages
  bun run workspace:version --patch

  # Bump minor version and create git tag
  bun run workspace:version --minor --tag

  # Set specific version
  bun run workspace:version --version=2.0.0

  # Create prerelease with beta tag
  bun run workspace:version --prerelease --preid=beta

  # Independent versioning (each package bumped individually)
  bun run workspace:version --patch --independent

  # Dry run to see what would change
  bun run workspace:version --minor --dry-run
`);
    return;
  }

  const options: VersionOptions = {
    type: args.includes('--patch') ? 'patch' :
          args.includes('--minor') ? 'minor' :
          args.includes('--major') ? 'major' :
          args.includes('--prerelease') ? 'prerelease' : undefined,
    version: args.find(arg => arg.startsWith('--version='))?.split('=')[1],
    preid: args.find(arg => arg.startsWith('--preid='))?.split('=')[1] || 'alpha',
    independent: args.includes('--independent'),
    dryRun: args.includes('--dry-run'),
    tag: args.includes('--tag'),
    push: args.includes('--push'),
  };

  const manager = new WorkspaceVersionManager();

  if (args.includes('--list')) {
    manager.listPackages();
    return;
  }

  try {
    await manager.version(options);
  } catch (error) {
    console.error('Version management failed:', error);
    process.exit(1);
  }
}

if (import.meta.main) {
  main().catch(console.error);
}