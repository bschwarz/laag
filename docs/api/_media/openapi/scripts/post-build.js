#!/usr/bin/env node

/**
 * Post-build script to fix CommonJS imports and create proper package.json files
 * for dual module support
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '..');

// Create package.json for CommonJS build
const cjsPackageJson = {
  type: 'commonjs',
};

const cjsDir = join(packageRoot, 'dist', 'cjs');
if (!existsSync(cjsDir)) {
  mkdirSync(cjsDir, { recursive: true });
}

writeFileSync(join(cjsDir, 'package.json'), JSON.stringify(cjsPackageJson, null, 2));

// Create package.json for ESM build
const esmPackageJson = {
  type: 'module',
};

const esmDir = join(packageRoot, 'dist', 'esm');
if (!existsSync(esmDir)) {
  mkdirSync(esmDir, { recursive: true });
}

writeFileSync(join(esmDir, 'package.json'), JSON.stringify(esmPackageJson, null, 2));

console.log('✅ Post-build script completed successfully');
console.log('   - Created CommonJS package.json');
console.log('   - Created ESM package.json');
