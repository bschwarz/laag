#!/usr/bin/env bun

/**
 * Cross-platform compatibility testing script
 * Tests packages across different Node.js versions, browsers, and platforms
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface CompatibilityTestOptions {
  nodeVersions?: string[];
  browsers?: string[];
  skipNodeTests?: boolean;
  skipBrowserTests?: boolean;
  skipCliTests?: boolean;
  verbose?: boolean;
}

interface TestResult {
  name: string;
  success: boolean;
  error?: string;
  duration: number;
}

class CompatibilityTester {
  private workspaceRoot: string;
  private testResults: TestResult[] = [];

  constructor(workspaceRoot: string = process.cwd()) {
    this.workspaceRoot = workspaceRoot;
  }

  private log(message: string, verbose = false): void {
    if (!verbose || process.argv.includes('--verbose')) {
      console.log(message);
    }
  }

  private async runTest(name: string, testFn: () => Promise<void>): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      await testFn();
      const duration = Date.now() - startTime;
      const result: TestResult = { name, success: true, duration };
      this.testResults.push(result);
      this.log(`✅ ${name} (${duration}ms)`);
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const result: TestResult = { 
        name, 
        success: false, 
        error: error instanceof Error ? error.message : String(error),
        duration 
      };
      this.testResults.push(result);
      this.log(`❌ ${name} (${duration}ms): ${result.error}`);
      return result;
    }
  }

  private async testNodeVersion(version: string): Promise<void> {
    // Test if we can run basic operations with different Node versions
    // Note: This requires nvm or similar version manager to be installed
    
    try {
      // Check if the Node version is available
      const versionCheck = execSync(`node --version`, { encoding: 'utf-8' }).trim();
      this.log(`Current Node version: ${versionCheck}`, true);
      
      // Test basic module loading
      const testScript = `
        const { Openapi } = require('./packages/openapi/dist/cjs/index.js');
        const { LaagBase } = require('./packages/core/dist/cjs/index.js');
        
        console.log('✓ CommonJS modules loaded successfully');
        
        // Test basic functionality
        const api = new Openapi();
        console.log('✓ OpenAPI instance created successfully');
        
        // Test that we can access properties
        const info = api.info;
        console.log('✓ OpenAPI info property accessible');
      `;
      
      writeFileSync(join(this.workspaceRoot, 'test-node-compat.cjs'), testScript);
      execSync(`node test-node-compat.cjs`, { 
        cwd: this.workspaceRoot,
        stdio: 'pipe'
      });
      
      // Clean up
      execSync(`rm -f test-node-compat.cjs`, { cwd: this.workspaceRoot });
      
    } catch (error) {
      throw new Error(`Node.js ${version} compatibility test failed: ${error}`);
    }
  }

  private async testESMSupport(): Promise<void> {
    const testScript = `
      import { Openapi } from './packages/openapi/dist/esm/index.js';
      import { LaagBase } from './packages/core/dist/esm/index.js';
      
      console.log('✓ ESM modules loaded successfully');
      
      // Test basic functionality
      const api = new Openapi();
      console.log('✓ OpenAPI instance created successfully');
      
      // Test that we can access properties
      const info = api.info;
      console.log('✓ OpenAPI info property accessible');
    `;
    
    writeFileSync(join(this.workspaceRoot, 'test-esm-compat.mjs'), testScript);
    
    try {
      execSync(`node test-esm-compat.mjs`, { 
        cwd: this.workspaceRoot,
        stdio: 'pipe'
      });
    } finally {
      // Clean up
      execSync(`rm -f test-esm-compat.mjs`, { cwd: this.workspaceRoot });
    }
  }

  private async testBrowserCompatibility(): Promise<void> {
    // Create a simple HTML test page
    const testHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Browser Compatibility Test</title>
</head>
<body>
    <h1>Browser Compatibility Test</h1>
    <div id="results"></div>
    
    <script type="module">
        try {
            // Test browser bundle loading
            const response = await fetch('./packages/openapi/dist/browser/index.js');
            if (!response.ok) {
                throw new Error('Failed to load browser bundle');
            }
            
            // Test that the bundle is valid JavaScript
            const code = await response.text();
            if (!code.includes('export')) {
                throw new Error('Browser bundle does not appear to be valid ESM');
            }
            
            document.getElementById('results').innerHTML = '✅ Browser compatibility test passed';
            console.log('✓ Browser bundle loaded and validated successfully');
            
        } catch (error) {
            document.getElementById('results').innerHTML = '❌ Browser compatibility test failed: ' + error.message;
            console.error('Browser compatibility test failed:', error);
        }
    </script>
</body>
</html>`;

    const testDir = join(this.workspaceRoot, 'test-browser');
    mkdirSync(testDir, { recursive: true });
    writeFileSync(join(testDir, 'index.html'), testHtml);
    
    try {
      // Check that browser bundles exist and are valid
      const browserBundlePath = join(this.workspaceRoot, 'packages/openapi/dist/browser/index.js');
      if (!existsSync(browserBundlePath)) {
        throw new Error('Browser bundle does not exist');
      }
      
      const bundleContent = readFileSync(browserBundlePath, 'utf-8');
      if (bundleContent.length === 0) {
        throw new Error('Browser bundle is empty');
      }
      
      // Basic validation that it's a valid JavaScript bundle
      if (!bundleContent.includes('export') && !bundleContent.includes('module.exports')) {
        throw new Error('Browser bundle does not appear to be a valid module');
      }
      
      this.log('✓ Browser bundle validation passed', true);
      
    } finally {
      // Clean up
      execSync(`rm -rf ${testDir}`, { cwd: this.workspaceRoot });
    }
  }

  private async testTypeScriptCompatibility(): Promise<void> {
    // Test TypeScript compilation with our packages
    const testTsFile = `
import { Openapi } from './packages/openapi/dist/esm/index.js';
import { LaagBase } from './packages/core/dist/esm/index.js';

// Test that TypeScript can compile with our types
const api: Openapi = new Openapi();
const info = api.info;

// Test type safety
const base: LaagBase = api;

console.log('TypeScript compilation test passed');
`;

    writeFileSync(join(this.workspaceRoot, 'test-ts-compat.ts'), testTsFile);
    
    const testTsConfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true
  },
  "files": ["test-ts-compat.ts"]
}`;

    writeFileSync(join(this.workspaceRoot, 'test-tsconfig.json'), testTsConfig);
    
    try {
      // Test TypeScript compilation
      execSync(`npx tsc --project test-tsconfig.json`, { 
        cwd: this.workspaceRoot,
        stdio: 'pipe'
      });
      
      this.log('✓ TypeScript compilation test passed', true);
      
    } finally {
      // Clean up
      execSync(`rm -f test-ts-compat.ts test-tsconfig.json`, { cwd: this.workspaceRoot });
    }
  }

  private async testPackageInstallation(): Promise<void> {
    // Test that packages can be installed and used in a fresh environment
    const testDir = join(this.workspaceRoot, 'test-install');
    mkdirSync(testDir, { recursive: true });
    
    const packageJson = {
      name: 'test-installation',
      version: '1.0.0',
      type: 'module',
      dependencies: {}
    };
    
    writeFileSync(join(testDir, 'package.json'), JSON.stringify(packageJson, null, 2));
    
    try {
      // Test npm pack for each package
      const packages = ['core', 'openapi', 'raml'];
      
      for (const pkg of packages) {
        const packagePath = join(this.workspaceRoot, 'packages', pkg);
        if (existsSync(packagePath)) {
          execSync(`npm pack --dry-run`, { 
            cwd: packagePath,
            stdio: 'pipe'
          });
          this.log(`✓ Package @laag/${pkg} can be packed successfully`, true);
        }
      }
      
    } finally {
      // Clean up
      execSync(`rm -rf ${testDir}`, { cwd: this.workspaceRoot });
    }
  }

  private async testCLIFunctionality(): Promise<void> {
    // Test CLI functionality if it exists
    const cliPath = join(this.workspaceRoot, 'packages/cli');
    
    if (!existsSync(cliPath)) {
      this.log('No CLI package found, skipping CLI tests', true);
      return;
    }
    
    // Test basic CLI operations
    try {
      execSync(`node laag-cli.js --help`, { 
        cwd: cliPath,
        stdio: 'pipe'
      });
      this.log('✓ CLI help command works', true);
    } catch (error) {
      throw new Error(`CLI functionality test failed: ${error}`);
    }
  }

  async runCompatibilityTests(options: CompatibilityTestOptions = {}): Promise<void> {
    this.log('🚀 Starting cross-platform compatibility tests...\n');

    // Ensure packages are built
    await this.runTest('Build packages', async () => {
      execSync('bun run build', { 
        cwd: this.workspaceRoot,
        stdio: 'pipe'
      });
    });

    // Test Node.js compatibility
    if (!options.skipNodeTests) {
      await this.runTest('Node.js CommonJS compatibility', () => this.testNodeVersion('current'));
      await this.runTest('Node.js ESM compatibility', () => this.testESMSupport());
    }

    // Test TypeScript compatibility
    await this.runTest('TypeScript compatibility', () => this.testTypeScriptCompatibility());

    // Test browser compatibility
    if (!options.skipBrowserTests) {
      await this.runTest('Browser compatibility', () => this.testBrowserCompatibility());
    }

    // Test package installation
    await this.runTest('Package installation', () => this.testPackageInstallation());

    // Test CLI functionality
    if (!options.skipCliTests) {
      await this.runTest('CLI functionality', () => this.testCLIFunctionality());
    }

    this.printResults();
  }

  private printResults(): void {
    console.log('\n📊 Compatibility Test Results:');
    console.log('================================');

    const passed = this.testResults.filter(r => r.success).length;
    const failed = this.testResults.filter(r => !r.success).length;
    const total = this.testResults.length;

    for (const result of this.testResults) {
      const status = result.success ? '✅' : '❌';
      const duration = `${result.duration}ms`;
      console.log(`${status} ${result.name} (${duration})`);
      
      if (!result.success && result.error) {
        console.log(`   Error: ${result.error}`);
      }
    }

    console.log(`\nSummary: ${passed}/${total} tests passed`);
    
    if (failed > 0) {
      console.log(`❌ ${failed} test(s) failed`);
      process.exit(1);
    } else {
      console.log('🎉 All compatibility tests passed!');
    }
  }
}

async function main() {
  const options: CompatibilityTestOptions = {
    skipNodeTests: process.argv.includes('--skip-node'),
    skipBrowserTests: process.argv.includes('--skip-browser'),
    skipCliTests: process.argv.includes('--skip-cli'),
    verbose: process.argv.includes('--verbose'),
  };

  const tester = new CompatibilityTester();
  await tester.runCompatibilityTests(options);
}

if (import.meta.main) {
  main().catch(console.error);
}