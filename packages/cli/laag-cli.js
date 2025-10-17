#!/usr/bin/env node

import { Openapi } from '@laag/openapi';
import fs from 'fs';
import yaml from 'js-yaml';

var args = process.argv.slice(2);

// Handle help flag
if (args.includes('--help') || args.includes('-h') || args.length === 0) {
  console.log('Usage: laag <path-to-openapi-file>');
  console.log('');
  console.log('Options:');
  console.log('  --help, -h    Show this help message');
  console.log('  --version, -v Show version information');
  console.log('');
  console.log('Examples:');
  console.log('  laag api.yaml');
  console.log('  laag openapi.json');
  process.exit(0);
}

// Handle version flag
if (args.includes('--version') || args.includes('-v')) {
  console.log('laag CLI version 2.0.0');
  process.exit(0);
}

if (args.length != 1) {
  console.log('Error: Please provide exactly one OpenAPI file path.');
  console.log('Usage: laag <path-to-openapi-file>');
  console.log('Use --help for more information.');
  process.exit(1);
}

let fname = args[0];

// Check if file exists
if (!fs.existsSync(fname)) {
  console.error(`Error: File '${fname}' not found.`);
  process.exit(1);
}

// let outputfile = 'output.json'
let jsonObj = yaml.load(fs.readFileSync(fname, 'utf8'));
// this code if you want to save
// fs.writeFileSync(outputfile, JSON.stringify(obj, null, 2));

// let data = fs.readFileSync(jsonObj, 'utf8');

// const newStr = str.replace(/^#/, "");
const doc = new Openapi(jsonObj);

console.log(`Displaying API: ${doc.info.title} v${doc.info.version}`);
console.log('Paths defined in this API:');

// Get all operations and display them
const operations = doc.getOperationIds();
if (operations.length > 0) {
  for (const op of operations) {
    const summary = doc.getOperationDescription(op.path, op.method) || op.id;
    console.log(`${op.method.toUpperCase()} ${op.path} - ${summary}`);
  }
} else {
  // Fallback: just show paths
  const paths = doc.getPathNames();
  for (const path of paths) {
    console.log(`  ${path}`);
  }
}
