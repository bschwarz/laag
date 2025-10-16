#!/usr/bin/env bun

/**
 * Final integration test suite
 * Tests complete workflows, module formats, and performance
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

interface IntegrationTestOptions {
  skipPerformance?: boolean;
  skipWorkflow?: boolean;
  skipModuleFormats?: boolean;
  verbose?: boolean;
}

interface TestResult {
  name: string;
  success: boolean;
  error?: string;
  duration: number;
  metrics?: Record<string, any>;
}

interface PerformanceMetrics {
  loadTime: number;
  memoryUsage: number;
  bundleSize: number;
  operationTime: number;
}

class IntegrationTester {
  private workspaceRoot: string;
  private testResults: TestResult[] = [];
  private testDir: string;

  constructor(workspaceRoot: string = process.cwd()) {
    this.workspaceRoot = workspaceRoot;
    this.testDir = join(workspaceRoot, 'test-integration');
  }

  private log(message: string, verbose = false): void {
    if (!verbose || process.argv.includes('--verbose')) {
      console.log(message);
    }
  }

  private async runTest(name: string, testFn: () => Promise<any>): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      const metrics = await testFn();
      const duration = Date.now() - startTime;
      const result: TestResult = { name, success: true, duration, metrics };
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

  private setupTestEnvironment(): void {
    if (existsSync(this.testDir)) {
      rmSync(this.testDir, { recursive: true });
    }
    mkdirSync(this.testDir, { recursive: true });
  }

  private cleanupTestEnvironment(): void {
    if (existsSync(this.testDir)) {
      rmSync(this.testDir, { recursive: true });
    }
  }

  private async testCompleteWorkflow(): Promise<any> {
    // Test complete workflow from package installation to usage
    const projectDir = join(this.testDir, 'workflow-test');
    mkdirSync(projectDir, { recursive: true });

    // Create a test project
    const packageJson = {
      name: 'integration-test-project',
      version: '1.0.0',
      type: 'module',
      dependencies: {},
      scripts: {
        test: 'node test.js'
      }
    };

    writeFileSync(join(projectDir, 'package.json'), JSON.stringify(packageJson, null, 2));

    // Create test files for different scenarios
    const testFiles = {
      // ESM test
      'test-esm.mjs': `
import { Openapi } from '${join(this.workspaceRoot, 'packages/openapi/dist/esm/index.js')}';
import { LaagBase } from '${join(this.workspaceRoot, 'packages/core/dist/esm/index.js')}';

console.log('Testing ESM imports...');

const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/test': {
      get: {
        summary: 'Test endpoint',
        responses: { '200': { description: 'Success' } }
      }
    }
  }
});

console.log('API Title:', api.info.title);
console.log('API Version:', api.info.version);
console.log('Paths:', api.getPathNames());

if (api.info.title !== 'Test API') {
  throw new Error('API title mismatch');
}

if (api.getPathNames().length !== 1) {
  throw new Error('Path count mismatch');
}

console.log('✅ ESM workflow test passed');
`,

      // CommonJS test
      'test-cjs.cjs': `
const { Openapi } = require('${join(this.workspaceRoot, 'packages/openapi/dist/cjs/index.js')}');
const { LaagBase } = require('${join(this.workspaceRoot, 'packages/core/dist/cjs/index.js')}');

console.log('Testing CommonJS imports...');

const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'Test API CJS', version: '1.0.0' },
  paths: {
    '/test': {
      get: {
        summary: 'Test endpoint',
        responses: { '200': { description: 'Success' } }
      }
    }
  }
});

console.log('API Title:', api.info.title);
console.log('API Version:', api.info.version);
console.log('Paths:', api.getPathNames());

if (api.info.title !== 'Test API CJS') {
  throw new Error('API title mismatch');
}

console.log('✅ CommonJS workflow test passed');
`,

      // TypeScript test
      'test-ts.ts': `
import { Openapi } from '${join(this.workspaceRoot, 'packages/openapi/dist/esm/index.js')}';
import { LaagBase } from '${join(this.workspaceRoot, 'packages/core/dist/esm/index.js')}';

console.log('Testing TypeScript compilation...');

const api: Openapi = new Openapi({
  openapi: '3.0.2',
  info: { title: 'Test API TS', version: '1.0.0' },
  paths: {}
});

const base: LaagBase = api;
const title: string = api.info.title;

console.log('✅ TypeScript workflow test passed');
`
    };

    // Write test files
    for (const [filename, content] of Object.entries(testFiles)) {
      writeFileSync(join(projectDir, filename), content);
    }

    // Test ESM
    execSync('node test-esm.mjs', { cwd: projectDir, stdio: 'pipe' });

    // Test CommonJS
    execSync('node test-cjs.cjs', { cwd: projectDir, stdio: 'pipe' });

    // Test TypeScript compilation (skip for now as it's covered in compatibility tests)
    // const tsConfig = {
    //   compilerOptions: {
    //     target: 'ES2020',
    //     module: 'ESNext',
    //     moduleResolution: 'bundler',
    //     skipLibCheck: true,
    //     noEmit: true
    //   }
    // };
    // writeFileSync(join(projectDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));
    // execSync('npx tsc --project tsconfig.json test-ts.ts', { cwd: projectDir, stdio: 'pipe' });

    return { workflowTests: 2 };
  }

  private async testModuleFormats(): Promise<any> {
    // Test all module formats work correctly
    const formats = ['esm', 'cjs', 'browser'];
    const packages = ['core', 'openapi', 'raml'];
    const results: Record<string, any> = {};

    for (const pkg of packages) {
      const packagePath = join(this.workspaceRoot, 'packages', pkg);
      if (!existsSync(packagePath)) continue;

      results[pkg] = {};

      for (const format of formats) {
        const formatPath = join(packagePath, 'dist', format, 'index.js');
        
        if (!existsSync(formatPath)) {
          if (format === 'browser' && pkg === 'core') {
            // Core package doesn't have browser bundle, which is expected
            continue;
          }
          throw new Error(`Missing ${format} build for ${pkg}`);
        }

        // Check file size
        const stats = require('fs').statSync(formatPath);
        results[pkg][format] = {
          size: stats.size,
          exists: true
        };

        // Basic validation that it's a valid module
        const content = readFileSync(formatPath, 'utf-8');
        if (content.length === 0) {
          throw new Error(`Empty ${format} build for ${pkg}`);
        }

        // Check for expected module patterns
        if (format === 'esm' && !content.includes('export')) {
          throw new Error(`ESM build for ${pkg} doesn't contain exports`);
        }

        if (format === 'cjs' && !content.includes('exports') && !content.includes('module.exports')) {
          throw new Error(`CommonJS build for ${pkg} doesn't contain exports`);
        }
      }
    }

    return results;
  }

  private async testPerformance(): Promise<PerformanceMetrics> {
    // Test performance metrics
    const testScript = `
const startTime = process.hrtime.bigint();
const startMemory = process.memoryUsage();

// Test module loading time
const { Openapi } = require('${join(this.workspaceRoot, 'packages/openapi/dist/cjs/index.js')}');
const loadTime = Number(process.hrtime.bigint() - startTime) / 1000000; // Convert to ms

// Test operation performance
const operationStart = process.hrtime.bigint();

const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'Performance Test API', version: '1.0.0' },
  paths: {}
});

// Add multiple paths to test performance
for (let i = 0; i < 100; i++) {
  api.paths[\`/path\${i}\`] = {
    get: {
      summary: \`Test endpoint \${i}\`,
      responses: { '200': { description: 'Success' } }
    }
  };
}

const pathNames = api.getPathNames();
const operationTime = Number(process.hrtime.bigint() - operationStart) / 1000000;

const endMemory = process.memoryUsage();
const memoryUsage = endMemory.heapUsed - startMemory.heapUsed;

console.log(JSON.stringify({
  loadTime,
  operationTime,
  memoryUsage,
  pathCount: pathNames.length
}));
`;

    writeFileSync(join(this.testDir, 'perf-test.cjs'), testScript);
    
    const output = execSync('node perf-test.cjs', { 
      cwd: this.testDir, 
      encoding: 'utf-8' 
    });

    const metrics = JSON.parse(output.trim());

    // Get bundle sizes
    const openapiBundlePath = join(this.workspaceRoot, 'packages/openapi/dist/browser/index.js');
    const bundleSize = existsSync(openapiBundlePath) 
      ? require('fs').statSync(openapiBundlePath).size 
      : 0;

    return {
      loadTime: metrics.loadTime,
      operationTime: metrics.operationTime,
      memoryUsage: metrics.memoryUsage,
      bundleSize
    };
  }

  private async testRealWorldUsage(): Promise<any> {
    // Test with real OpenAPI documents
    const testCases = [
      {
        name: 'Petstore Example',
        spec: {
          openapi: '3.0.2',
          info: {
            title: 'Swagger Petstore',
            version: '1.0.0',
            description: 'A sample API that uses a petstore as an example'
          },
          paths: {
            '/pets': {
              get: {
                summary: 'List all pets',
                operationId: 'listPets',
                responses: {
                  '200': {
                    description: 'A paged array of pets'
                  }
                }
              },
              post: {
                summary: 'Create a pet',
                operationId: 'createPets',
                responses: {
                  '201': {
                    description: 'Null response'
                  }
                }
              }
            },
            '/pets/{petId}': {
              get: {
                summary: 'Info for a specific pet',
                operationId: 'showPetById',
                parameters: [
                  {
                    name: 'petId',
                    in: 'path',
                    required: true,
                    schema: {
                      type: 'string'
                    }
                  }
                ],
                responses: {
                  '200': {
                    description: 'Expected response to a valid request'
                  }
                }
              }
            }
          }
        }
      }
    ];

    const results: any[] = [];

    for (const testCase of testCases) {
      const testScript = `
const { Openapi } = require('${join(this.workspaceRoot, 'packages/openapi/dist/cjs/index.js')}');

const spec = ${JSON.stringify(testCase.spec)};
const api = new Openapi(spec);

// Test basic operations
const title = api.info.title;
const version = api.info.version;
const paths = api.getPathNames();

// Test that we can access all paths
const pathDetails = paths.map(path => ({
  path,
  methods: Object.keys(api.paths[path] || {})
}));

console.log(JSON.stringify({
  title,
  version,
  pathCount: paths.length,
  pathDetails,
  success: true
}));
`;

      writeFileSync(join(this.testDir, 'real-world-test.cjs'), testScript);
      
      const output = execSync('node real-world-test.cjs', { 
        cwd: this.testDir, 
        encoding: 'utf-8' 
      });

      const result = JSON.parse(output.trim());
      results.push({
        testCase: testCase.name,
        ...result
      });
    }

    return { realWorldTests: results };
  }

  async runIntegrationTests(options: IntegrationTestOptions = {}): Promise<void> {
    this.log('🚀 Starting final integration tests...\n');

    this.setupTestEnvironment();

    try {
      // Ensure packages are built
      await this.runTest('Build packages', async () => {
        execSync('bun run build', { 
          cwd: this.workspaceRoot,
          stdio: 'pipe'
        });
      });

      // Test complete workflow
      if (!options.skipWorkflow) {
        await this.runTest('Complete workflow test', () => this.testCompleteWorkflow());
      }

      // Test module formats
      if (!options.skipModuleFormats) {
        await this.runTest('Module formats validation', () => this.testModuleFormats());
      }

      // Test real-world usage
      await this.runTest('Real-world usage test', () => this.testRealWorldUsage());

      // Test performance
      if (!options.skipPerformance) {
        await this.runTest('Performance benchmarks', () => this.testPerformance());
      }

    } finally {
      this.cleanupTestEnvironment();
    }

    this.printResults();
  }

  private printResults(): void {
    console.log('\n📊 Integration Test Results:');
    console.log('============================');

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

      if (result.metrics) {
        if (result.name.includes('Performance')) {
          const metrics = result.metrics as PerformanceMetrics;
          console.log(`   Load Time: ${metrics.loadTime.toFixed(2)}ms`);
          console.log(`   Operation Time: ${metrics.operationTime.toFixed(2)}ms`);
          console.log(`   Memory Usage: ${(metrics.memoryUsage / 1024).toFixed(2)}KB`);
          console.log(`   Bundle Size: ${(metrics.bundleSize / 1024).toFixed(2)}KB`);
        }
      }
    }

    console.log(`\nSummary: ${passed}/${total} tests passed`);
    
    if (failed > 0) {
      console.log(`❌ ${failed} test(s) failed`);
      process.exit(1);
    } else {
      console.log('🎉 All integration tests passed!');
      
      // Print performance summary
      const perfResult = this.testResults.find(r => r.name.includes('Performance'));
      if (perfResult && perfResult.metrics) {
        const metrics = perfResult.metrics as PerformanceMetrics;
        console.log('\n📈 Performance Summary:');
        console.log(`   Module load time: ${metrics.loadTime.toFixed(2)}ms`);
        console.log(`   Operation performance: ${metrics.operationTime.toFixed(2)}ms for 100 operations`);
        console.log(`   Memory efficiency: ${(metrics.memoryUsage / 1024).toFixed(2)}KB heap usage`);
        console.log(`   Bundle size: ${(metrics.bundleSize / 1024).toFixed(2)}KB (minified)`);
      }
    }
  }
}

async function main() {
  const options: IntegrationTestOptions = {
    skipPerformance: process.argv.includes('--skip-performance'),
    skipWorkflow: process.argv.includes('--skip-workflow'),
    skipModuleFormats: process.argv.includes('--skip-module-formats'),
    verbose: process.argv.includes('--verbose'),
  };

  const tester = new IntegrationTester();
  await tester.runIntegrationTests(options);
}

if (import.meta.main) {
  main().catch(console.error);
}