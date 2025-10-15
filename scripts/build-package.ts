#!/usr/bin/env bun

/**
 * Build script for individual packages
 * This script handles TypeScript compilation for both ESM and CommonJS outputs
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

const packageDir = process.cwd();
const distDir = join(packageDir, 'dist');

// Clean dist directory
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true });
}
mkdirSync(distDir, { recursive: true });

console.log(`Building package in ${packageDir}...`);

try {
  // Build ESM
  console.log('Building ESM...');
  execSync('tsc --project tsconfig.json --module ESNext --outDir dist/esm', {
    stdio: 'inherit',
    cwd: packageDir,
  });

  // Build CommonJS
  console.log('Building CommonJS...');
  execSync('tsc --project tsconfig.json --module CommonJS --outDir dist/cjs', {
    stdio: 'inherit',
    cwd: packageDir,
  });

  // Generate type declarations
  console.log('Generating type declarations...');
  execSync('tsc --project tsconfig.json --declaration --emitDeclarationOnly --outDir dist/types', {
    stdio: 'inherit',
    cwd: packageDir,
  });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}