#!/usr/bin/env bun

/**
 * Validation script for package publishing setup
 * Checks all packages for proper configuration before publishing
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

interface ValidationResult {
  package: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
}

class PublishingValidator {
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

  private validatePackageJson(pkg: any): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields
    const requiredFields = [
      'name', 'version', 'description', 'license', 'author',
      'main', 'module', 'types', 'exports', 'files'
    ];

    for (const field of requiredFields) {
      if (!pkg[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    // Validate exports
    if (pkg.exports && pkg.exports['.']) {
      const exports = pkg.exports['.'];
      
      // Check for nested structure (import/require with types and default)
      const hasImport = exports.import && (exports.import.default || exports.import);
      const hasRequire = exports.require && (exports.require.default || exports.require);
      const hasTypes = exports.types || 
                      (exports.import && exports.import.types) || 
                      (exports.require && exports.require.types);
      
      if (!hasImport) {
        errors.push('Exports configuration missing import field');
      }
      if (!hasRequire) {
        errors.push('Exports configuration missing require field');
      }
      if (!hasTypes) {
        errors.push('Exports configuration missing types field');
      }
    } else {
      errors.push('Missing proper exports configuration');
    }

    // Validate files array
    if (pkg.files && Array.isArray(pkg.files)) {
      const requiredFiles = ['dist/', 'README.md'];
      for (const file of requiredFiles) {
        if (!pkg.files.includes(file)) {
          warnings.push(`Missing recommended file in files array: ${file}`);
        }
      }
    }

    // Validate publishConfig
    if (!pkg.publishConfig || pkg.publishConfig.access !== 'public') {
      errors.push('Missing or incorrect publishConfig.access (should be "public")');
    }

    // Validate repository
    if (!pkg.repository || !pkg.repository.url) {
      warnings.push('Missing repository information');
    }

    // Validate homepage
    if (!pkg.homepage) {
      warnings.push('Missing homepage URL');
    }

    // Validate keywords
    if (!pkg.keywords || !Array.isArray(pkg.keywords) || pkg.keywords.length === 0) {
      warnings.push('Missing or empty keywords array');
    }

    // Validate engines
    if (!pkg.engines || !pkg.engines.node) {
      warnings.push('Missing Node.js engine specification');
    }

    // Validate sideEffects
    if (pkg.sideEffects === undefined) {
      warnings.push('Missing sideEffects field (should be false for pure modules)');
    }

    return { errors, warnings };
  }

  private validateBuildOutputs(pkg: any): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    const distPath = join(pkg.path, 'dist');
    
    if (!existsSync(distPath)) {
      errors.push('dist/ directory does not exist - run build first');
      return { errors, warnings };
    }

    // Check for required build outputs
    const requiredOutputs = [
      'dist/esm/index.js',
      'dist/cjs/index.js',
      'dist/types/index.d.ts'
    ];

    for (const output of requiredOutputs) {
      const outputPath = join(pkg.path, output);
      if (!existsSync(outputPath)) {
        errors.push(`Missing build output: ${output}`);
      }
    }

    // Check file sizes
    try {
      const esmPath = join(pkg.path, 'dist/esm/index.js');
      const cjsPath = join(pkg.path, 'dist/cjs/index.js');
      
      if (existsSync(esmPath)) {
        const esmSize = statSync(esmPath).size;
        if (esmSize === 0) {
          errors.push('ESM build output is empty');
        } else if (esmSize > 1024 * 1024) { // 1MB
          warnings.push(`ESM build output is large (${Math.round(esmSize / 1024)}KB)`);
        }
      }

      if (existsSync(cjsPath)) {
        const cjsSize = statSync(cjsPath).size;
        if (cjsSize === 0) {
          errors.push('CommonJS build output is empty');
        }
      }
    } catch (error) {
      warnings.push(`Could not check build output sizes: ${error}`);
    }

    return { errors, warnings };
  }

  private validateDependencies(pkg: any): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check workspace dependencies
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    
    for (const [name, version] of Object.entries(deps)) {
      if (typeof version === 'string' && version.startsWith('workspace:')) {
        if (!this.packages.has(name)) {
          errors.push(`Workspace dependency ${name} not found in workspace`);
        }
      }
    }

    // Check for peer dependencies
    if (pkg.name !== '@laag/core' && pkg.dependencies && pkg.dependencies['@laag/core']) {
      if (!pkg.peerDependencies || !pkg.peerDependencies['@laag/core']) {
        warnings.push('@laag/core should be a peer dependency, not a regular dependency');
      }
    }

    return { errors, warnings };
  }

  private validatePackageSize(pkg: any): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Simulate npm pack to check package size
      const packOutput = execSync('npm pack --dry-run --json', {
        cwd: pkg.path,
        encoding: 'utf-8',
        stdio: 'pipe'
      });

      const packData = JSON.parse(packOutput);
      const packageSize = packData[0]?.size || 0;
      const fileSizeMB = packageSize / (1024 * 1024);

      if (fileSizeMB > 10) {
        warnings.push(`Package size is large: ${fileSizeMB.toFixed(2)}MB`);
      }

      if (packData[0]?.files) {
        const fileCount = packData[0].files.length;
        if (fileCount > 100) {
          warnings.push(`Package contains many files: ${fileCount}`);
        }
      }
    } catch (error) {
      warnings.push(`Could not check package size: ${error}`);
    }

    return { errors, warnings };
  }

  validatePackage(packageName: string): ValidationResult {
    const pkg = this.packages.get(packageName);
    if (!pkg) {
      return {
        package: packageName,
        valid: false,
        errors: ['Package not found'],
        warnings: []
      };
    }

    const allErrors: string[] = [];
    const allWarnings: string[] = [];

    // Validate package.json
    const { errors: jsonErrors, warnings: jsonWarnings } = this.validatePackageJson(pkg);
    allErrors.push(...jsonErrors);
    allWarnings.push(...jsonWarnings);

    // Validate build outputs
    const { errors: buildErrors, warnings: buildWarnings } = this.validateBuildOutputs(pkg);
    allErrors.push(...buildErrors);
    allWarnings.push(...buildWarnings);

    // Validate dependencies
    const { errors: depErrors, warnings: depWarnings } = this.validateDependencies(pkg);
    allErrors.push(...depErrors);
    allWarnings.push(...depWarnings);

    // Validate package size
    const { errors: sizeErrors, warnings: sizeWarnings } = this.validatePackageSize(pkg);
    allErrors.push(...sizeErrors);
    allWarnings.push(...sizeWarnings);

    return {
      package: packageName,
      valid: allErrors.length === 0,
      errors: allErrors,
      warnings: allWarnings
    };
  }

  validateAll(): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    for (const packageName of this.packages.keys()) {
      results.push(this.validatePackage(packageName));
    }

    return results;
  }

  printResults(results: ValidationResult[]): void {
    console.log('📦 Package Publishing Validation Results\n');

    let allValid = true;
    let totalErrors = 0;
    let totalWarnings = 0;

    for (const result of results) {
      const status = result.valid ? '✅' : '❌';
      console.log(`${status} ${result.package}`);

      if (result.errors.length > 0) {
        allValid = false;
        totalErrors += result.errors.length;
        console.log('  Errors:');
        for (const error of result.errors) {
          console.log(`    • ${error}`);
        }
      }

      if (result.warnings.length > 0) {
        totalWarnings += result.warnings.length;
        console.log('  Warnings:');
        for (const warning of result.warnings) {
          console.log(`    • ${warning}`);
        }
      }

      console.log();
    }

    console.log(`Summary: ${totalErrors} errors, ${totalWarnings} warnings`);
    
    if (allValid) {
      console.log('🎉 All packages are ready for publishing!');
    } else {
      console.log('❌ Some packages have issues that need to be fixed before publishing.');
      process.exit(1);
    }
  }
}

async function main() {
  const validator = new PublishingValidator();
  const results = validator.validateAll();
  validator.printResults(results);
}

if (import.meta.main) {
  main().catch(console.error);
}