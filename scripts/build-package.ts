#!/usr/bin/env bun

/**
 * Enhanced build script for individual packages
 * Handles TypeScript compilation with proper dependency management, source maps, and watch mode
 */

import { execSync, spawn } from 'child_process';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'fs';
import { basename, join } from 'path';

interface BuildOptions {
  watch?: boolean;
  sourceMaps?: boolean;
  clean?: boolean;
  verbose?: boolean;
}

class PackageBuilder {
  private packageDir: string;
  private distDir: string;
  private packageJson: any;
  private packageName: string;

  constructor(packageDir: string = process.cwd()) {
    this.packageDir = packageDir;
    this.distDir = join(packageDir, 'dist');
    this.packageJson = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf-8'));
    this.packageName = this.packageJson.name || basename(packageDir);
  }

  private log(message: string, verbose = false) {
    if (!verbose || process.argv.includes('--verbose')) {
      console.log(`[${this.packageName}] ${message}`);
    }
  }

  private async checkDependencies(): Promise<void> {
    const dependencies = {
      ...this.packageJson.dependencies,
      ...this.packageJson.devDependencies,
    };

    // Check if workspace dependencies are built
    for (const [dep, version] of Object.entries(dependencies)) {
      if (typeof version === 'string' && version.startsWith('workspace:')) {
        const depName = dep.replace('@laag/', '');
        const depPath = join(this.packageDir, '..', depName, 'dist');
        
        if (!existsSync(depPath)) {
          this.log(`Building dependency: ${dep}`);
          try {
            execSync(`bun run build`, {
              cwd: join(this.packageDir, '..', depName),
              stdio: 'inherit',
            });
          } catch (error) {
            throw new Error(`Failed to build dependency ${dep}: ${error}`);
          }
        }
      }
    }
  }

  private clean(): void {
    if (existsSync(this.distDir)) {
      this.log('Cleaning dist directory...');
      rmSync(this.distDir, { recursive: true });
    }
    mkdirSync(this.distDir, { recursive: true });
  }

  private buildESM(sourceMaps: boolean): void {
    this.log('Building ESM...');
    const sourceMapFlag = sourceMaps ? '--sourceMap' : '';
    execSync(
      `tsc --project tsconfig.json --module ESNext --moduleResolution bundler --outDir dist/esm --rootDir src --target ES2020 ${sourceMapFlag}`,
      {
        stdio: 'inherit',
        cwd: this.packageDir,
      }
    );
  }

  private buildCJS(sourceMaps: boolean): void {
    this.log('Building CommonJS...');
    const sourceMapFlag = sourceMaps ? '--sourceMap' : '';
    execSync(
      `tsc --project tsconfig.json --module CommonJS --moduleResolution node --outDir dist/cjs --rootDir src --target ES2020 ${sourceMapFlag}`,
      {
        stdio: 'inherit',
        cwd: this.packageDir,
      }
    );
  }

  private buildTypes(): void {
    this.log('Generating type declarations...');
    execSync(
      'tsc --project tsconfig.json --declaration --emitDeclarationOnly --outDir dist/types --rootDir src --skipLibCheck',
      {
        stdio: 'inherit',
        cwd: this.packageDir,
      }
    );
  }

  private buildBrowser(sourceMaps: boolean): void {
    // Only build browser bundle if package.json has browser field
    if (!this.packageJson.browser) return;

    const entryPoint = join(this.packageDir, 'src/index.ts');
    if (!existsSync(entryPoint)) return;

    this.log('Building browser bundle...');
    const sourceMapFlag = sourceMaps ? '--sourcemap' : '';
    
    execSync(
      `bun build ${entryPoint} --outdir dist/browser --format esm --target browser --minify ${sourceMapFlag}`,
      {
        stdio: 'inherit',
        cwd: this.packageDir,
      }
    );
  }

  private runPostBuild(): void {
    const postBuildScript = join(this.packageDir, 'scripts/post-build.js');
    if (existsSync(postBuildScript)) {
      this.log('Running post-build script...');
      execSync(`node ${postBuildScript}`, {
        stdio: 'inherit',
        cwd: this.packageDir,
      });
    }
  }

  async build(options: BuildOptions = {}): Promise<void> {
    const { clean = true, sourceMaps = true, verbose = false } = options;

    try {
      this.log(`Building ${this.packageName}...`);

      // Check if src directory exists
      const srcDir = join(this.packageDir, 'src');
      if (!existsSync(srcDir)) {
        this.log('No src directory found, skipping build');
        return;
      }

      // Check and build dependencies first
      await this.checkDependencies();

      // Clean if requested
      if (clean) {
        this.clean();
      }

      // Build all formats
      this.buildESM(sourceMaps);
      this.buildCJS(sourceMaps);
      this.buildTypes();
      this.buildBrowser(sourceMaps);

      // Run post-build script if it exists
      this.runPostBuild();

      this.log('Build completed successfully! ✅');
    } catch (error) {
      console.error(`Build failed for ${this.packageName}:`, error);
      process.exit(1);
    }
  }

  watch(): void {
    this.log('Starting watch mode...');
    
    // Initial build
    this.build({ clean: true, sourceMaps: true });

    // Watch for changes
    const watcher = spawn('tsc', [
      '--project', 'tsconfig.json',
      '--watch',
      '--preserveWatchOutput',
      '--module', 'ESNext',
      '--outDir', 'dist/esm',
      '--sourceMap'
    ], {
      cwd: this.packageDir,
      stdio: 'inherit'
    });

    watcher.on('close', (code) => {
      if (code !== 0) {
        console.error(`Watch process exited with code ${code}`);
      }
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      this.log('Stopping watch mode...');
      watcher.kill();
      process.exit(0);
    });
  }
}

// Main execution
async function main() {
  const options: BuildOptions = {
    watch: process.argv.includes('--watch'),
    sourceMaps: !process.argv.includes('--no-source-maps'),
    clean: !process.argv.includes('--no-clean'),
    verbose: process.argv.includes('--verbose'),
  };

  const builder = new PackageBuilder();

  if (options.watch) {
    builder.watch();
  } else {
    await builder.build(options);
  }
}

// Run if called directly
if (import.meta.main) {
  main().catch(console.error);
}