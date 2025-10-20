#!/usr/bin/env bun

/**
 * Workspace build orchestration script
 * Handles building all packages in the correct dependency order
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface PackageInfo {
  name: string;
  path: string;
  packageJson: any;
  dependencies: string[];
}

class WorkspaceBuilder {
  private workspaceRoot: string;
  private packages: Map<string, PackageInfo> = new Map();

  constructor(workspaceRoot: string = process.cwd()) {
    this.workspaceRoot = workspaceRoot;
    this.discoverPackages();
  }

  private discoverPackages(): void {
    const packagesDir = join(this.workspaceRoot, 'packages');
    
    if (!existsSync(packagesDir)) {
      throw new Error('No packages directory found');
    }

    const packageDirs = readdirSync(packagesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const packageDir of packageDirs) {
      const packagePath = join(packagesDir, packageDir);
      const packageJsonPath = join(packagePath, 'package.json');

      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        const dependencies = this.extractWorkspaceDependencies(packageJson);

        this.packages.set(packageJson.name, {
          name: packageJson.name,
          path: packagePath,
          packageJson,
          dependencies,
        });
      }
    }
  }

  private extractWorkspaceDependencies(packageJson: any): string[] {
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    return Object.entries(deps)
      .filter(([_, version]) => typeof version === 'string' && version.startsWith('workspace:'))
      .map(([name, _]) => name);
  }

  private topologicalSort(): string[] {
    const visited = new Set<string>();
    const visiting = new Set<string>();
    const result: string[] = [];

    const visit = (packageName: string) => {
      if (visiting.has(packageName)) {
        throw new Error(`Circular dependency detected involving ${packageName}`);
      }
      if (visited.has(packageName)) {
        return;
      }

      visiting.add(packageName);
      const packageInfo = this.packages.get(packageName);
      
      if (packageInfo) {
        for (const dep of packageInfo.dependencies) {
          if (this.packages.has(dep)) {
            visit(dep);
          }
        }
      }

      visiting.delete(packageName);
      visited.add(packageName);
      result.push(packageName);
    };

    for (const packageName of this.packages.keys()) {
      visit(packageName);
    }

    return result;
  }

  private async buildPackage(packageName: string, options: BuildOptions): Promise<void> {
    const packageInfo = this.packages.get(packageName);
    if (!packageInfo) {
      throw new Error(`Package ${packageName} not found`);
    }

    console.log(`\n🔨 Building ${packageName}...`);
    
    const buildScript = join(this.workspaceRoot, 'scripts/build-package.ts');
    const args = [];
    
    if (options.watch) args.push('--watch');
    if (!options.sourceMaps) args.push('--no-source-maps');
    if (!options.clean) args.push('--no-clean');
    if (options.verbose) args.push('--verbose');

    try {
      execSync(`bun run ${buildScript} ${args.join(' ')}`, {
        cwd: packageInfo.path,
        stdio: 'inherit',
      });
      console.log(`✅ ${packageName} built successfully`);
    } catch (error) {
      console.error(`❌ Failed to build ${packageName}:`, error);
      throw error;
    }
  }

  async buildAll(options: BuildOptions = {}): Promise<void> {
    console.log('🚀 Starting workspace build...');
    
    const buildOrder = this.topologicalSort();
    console.log(`Build order: ${buildOrder.join(' → ')}`);

    for (const packageName of buildOrder) {
      await this.buildPackage(packageName, options);
    }

    console.log('\n🎉 Workspace build completed successfully!');
  }

  async buildPackageByName(packageName: string, options: BuildOptions = {}): Promise<void> {
    if (!this.packages.has(packageName)) {
      throw new Error(`Package ${packageName} not found`);
    }

    // Build dependencies first
    const packageInfo = this.packages.get(packageName)!;
    for (const dep of packageInfo.dependencies) {
      if (this.packages.has(dep)) {
        await this.buildPackage(dep, options);
      }
    }

    // Build the target package
    await this.buildPackage(packageName, options);
  }

  listPackages(): void {
    console.log('📦 Workspace packages:');
    for (const [name, info] of this.packages) {
      console.log(`  ${name} (${info.path})`);
      if (info.dependencies.length > 0) {
        console.log(`    Dependencies: ${info.dependencies.join(', ')}`);
      }
    }
  }
}

interface BuildOptions {
  watch?: boolean;
  sourceMaps?: boolean;
  clean?: boolean;
  verbose?: boolean;
  package?: string;
}

async function main() {
  const options: BuildOptions = {
    watch: process.argv.includes('--watch'),
    sourceMaps: !process.argv.includes('--no-source-maps'),
    clean: !process.argv.includes('--no-clean'),
    verbose: process.argv.includes('--verbose'),
    package: process.argv.find(arg => arg.startsWith('--package='))?.split('=')[1],
  };

  const builder = new WorkspaceBuilder();

  if (process.argv.includes('--list')) {
    builder.listPackages();
    return;
  }

  try {
    if (options.package) {
      await builder.buildPackageByName(options.package, options);
    } else {
      await builder.buildAll(options);
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

if (import.meta.main) {
  main().catch(console.error);
}