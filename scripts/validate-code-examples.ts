#!/usr/bin/env bun
/**
 * Script to validate all code examples in documentation files
 * 
 * This script:
 * 1. Extracts all TypeScript and JavaScript code blocks from documentation
 * 2. Validates TypeScript syntax and type correctness
 * 3. Validates JavaScript syntax
 * 4. Checks for required imports
 * 5. Verifies error handling patterns
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface CodeBlock {
  language: 'typescript' | 'javascript' | 'json' | 'yaml' | 'bash' | 'other';
  code: string;
  file: string;
  lineNumber: number;
  context?: string;
}

interface ValidationResult {
  file: string;
  totalBlocks: number;
  typescriptBlocks: number;
  javascriptBlocks: number;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  file: string;
  lineNumber: number;
  language: string;
  message: string;
  code?: string;
}

interface ValidationWarning {
  file: string;
  lineNumber: number;
  language: string;
  message: string;
}

const DOCS_DIR = path.join(process.cwd(), 'docs');
const TEMP_DIR = path.join(process.cwd(), '.temp-validation');

// Documentation files to validate
const DOC_FILES = [
  'API_REFERENCE_OPENAPI.md',
  'API_REFERENCE_CORE.md',
  'API_REFERENCE_CLI.md',
  'API_REFERENCE_RAML.md',
  'USAGE_GUIDE_OPENAPI.md',
  'USAGE_GUIDE_RAML.md',
  'CLI_GUIDE.md',
  'README.md'
];

/**
 * Extract code blocks from markdown content
 */
function extractCodeBlocks(content: string, filename: string): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  const lines = content.split('\n');
  let inCodeBlock = false;
  let currentBlock: string[] = [];
  let currentLanguage = '';
  let blockStartLine = 0;
  let previousLine = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        // Starting a code block
        inCodeBlock = true;
        currentLanguage = line.substring(3).trim().toLowerCase();
        blockStartLine = i + 1;
        currentBlock = [];
      } else {
        // Ending a code block
        inCodeBlock = false;
        
        // Determine language
        let language: CodeBlock['language'] = 'other';
        if (currentLanguage === 'typescript' || currentLanguage === 'ts') {
          language = 'typescript';
        } else if (currentLanguage === 'javascript' || currentLanguage === 'js') {
          language = 'javascript';
        } else if (currentLanguage === 'json') {
          language = 'json';
        } else if (currentLanguage === 'yaml' || currentLanguage === 'yml') {
          language = 'yaml';
        } else if (currentLanguage === 'bash' || currentLanguage === 'sh') {
          language = 'bash';
        }
        
        blocks.push({
          language,
          code: currentBlock.join('\n'),
          file: filename,
          lineNumber: blockStartLine,
          context: previousLine
        });
      }
    } else if (inCodeBlock) {
      currentBlock.push(line);
    } else {
      previousLine = line;
    }
  }
  
  return blocks;
}

/**
 * Check if TypeScript code has required imports
 */
function checkTypeScriptImports(code: string): { hasImports: boolean; missingImports: string[] } {
  const missingImports: string[] = [];
  let hasImports = false;
  
  // Check for import statements
  if (code.includes('import ')) {
    hasImports = true;
  }
  
  // Check for usage without imports
  if (code.includes('Openapi') && !code.includes("import { Openapi }") && !code.includes("import {Openapi}")) {
    if (!code.includes('class') || !code.includes('extends')) {
      missingImports.push('Openapi');
    }
  }
  
  if (code.includes('LaagBase') && !code.includes("import { LaagBase }") && !code.includes("import {LaagBase}")) {
    if (!code.includes('class') || !code.includes('extends')) {
      missingImports.push('LaagBase');
    }
  }
  
  return { hasImports, missingImports };
}

/**
 * Check if code has proper type annotations (for TypeScript)
 */
function checkTypeAnnotations(code: string): boolean {
  // Look for type annotations in variable declarations, parameters, or return types
  const hasTypeAnnotations = 
    /:\s*(string|number|boolean|any|unknown|void|never|object|Array|Record|Promise)/.test(code) ||
    /<[A-Z]/.test(code) || // Generic types
    /interface\s+\w+/.test(code) ||
    /type\s+\w+/.test(code);
  
  return hasTypeAnnotations;
}

/**
 * Check if error handling examples use try-catch
 */
function checkErrorHandling(code: string): boolean {
  // If code mentions error or exception, it should have try-catch
  const mentionsError = /error|exception|throw|catch/i.test(code);
  const hasTryCatch = /try\s*{[\s\S]*}\s*catch/.test(code);
  
  if (mentionsError && code.includes('throw')) {
    // If it's throwing an error, it doesn't need try-catch
    return true;
  }
  
  if (mentionsError && !hasTryCatch && !code.includes('throw')) {
    return false;
  }
  
  return true;
}

/**
 * Validate TypeScript code syntax
 */
function validateTypeScriptSyntax(code: string, filename: string, lineNumber: number): ValidationError[] {
  const errors: ValidationError[] = [];
  
  try {
    // Create temp file
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR, { recursive: true });
    }
    
    const tempFile = path.join(TEMP_DIR, `temp-${Date.now()}.ts`);
    fs.writeFileSync(tempFile, code);
    
    try {
      // Try to compile with TypeScript
      execSync(`npx tsc --noEmit --skipLibCheck ${tempFile}`, {
        stdio: 'pipe',
        encoding: 'utf-8'
      });
    } catch (error: any) {
      const output = error.stdout || error.stderr || '';
      if (output && !output.includes('Cannot find module')) {
        errors.push({
          file: filename,
          lineNumber,
          language: 'typescript',
          message: 'TypeScript compilation error',
          code: output.split('\n')[0]
        });
      }
    } finally {
      // Clean up temp file
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
    }
  } catch (error: any) {
    errors.push({
      file: filename,
      lineNumber,
      language: 'typescript',
      message: `Validation error: ${error.message}`
    });
  }
  
  return errors;
}

/**
 * Validate JavaScript code syntax
 */
function validateJavaScriptSyntax(code: string, filename: string, lineNumber: number): ValidationError[] {
  const errors: ValidationError[] = [];
  
  try {
    // Try to parse with Node.js
    new Function(code);
  } catch (error: any) {
    errors.push({
      file: filename,
      lineNumber,
      language: 'javascript',
      message: `Syntax error: ${error.message}`
    });
  }
  
  return errors;
}

/**
 * Validate a single documentation file
 */
function validateDocFile(filename: string): ValidationResult {
  const result: ValidationResult = {
    file: filename,
    totalBlocks: 0,
    typescriptBlocks: 0,
    javascriptBlocks: 0,
    errors: [],
    warnings: []
  };
  
  const filePath = path.join(DOCS_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    result.errors.push({
      file: filename,
      lineNumber: 0,
      language: 'n/a',
      message: 'File not found'
    });
    return result;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const blocks = extractCodeBlocks(content, filename);
  
  result.totalBlocks = blocks.length;
  
  for (const block of blocks) {
    if (block.language === 'typescript') {
      result.typescriptBlocks++;
      
      // Check for imports
      const { hasImports, missingImports } = checkTypeScriptImports(block.code);
      if (missingImports.length > 0 && block.code.length > 50) {
        result.warnings.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'typescript',
          message: `Possibly missing imports: ${missingImports.join(', ')}`
        });
      }
      
      // Check for type annotations
      if (!checkTypeAnnotations(block.code) && block.code.length > 50) {
        result.warnings.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'typescript',
          message: 'No type annotations found'
        });
      }
      
      // Check error handling
      if (!checkErrorHandling(block.code)) {
        result.warnings.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'typescript',
          message: 'Error handling without try-catch'
        });
      }
      
      // Validate syntax (only for substantial code blocks)
      if (block.code.length > 100 && !block.code.includes('...')) {
        const syntaxErrors = validateTypeScriptSyntax(block.code, filename, block.lineNumber);
        result.errors.push(...syntaxErrors);
      }
    } else if (block.language === 'javascript') {
      result.javascriptBlocks++;
      
      // Check for imports
      const { hasImports, missingImports } = checkTypeScriptImports(block.code);
      if (missingImports.length > 0 && block.code.length > 50) {
        result.warnings.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'javascript',
          message: `Possibly missing imports: ${missingImports.join(', ')}`
        });
      }
      
      // Check error handling
      if (!checkErrorHandling(block.code)) {
        result.warnings.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'javascript',
          message: 'Error handling without try-catch'
        });
      }
      
      // Validate syntax (only for substantial code blocks)
      if (block.code.length > 100 && !block.code.includes('...')) {
        const syntaxErrors = validateJavaScriptSyntax(block.code, filename, block.lineNumber);
        result.errors.push(...syntaxErrors);
      }
    }
  }
  
  return result;
}

/**
 * Main validation function
 */
function main() {
  console.log('🔍 Validating code examples in documentation...\n');
  
  const results: ValidationResult[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  
  for (const docFile of DOC_FILES) {
    console.log(`📄 Validating ${docFile}...`);
    const result = validateDocFile(docFile);
    results.push(result);
    
    console.log(`   Total blocks: ${result.totalBlocks}`);
    console.log(`   TypeScript: ${result.typescriptBlocks}`);
    console.log(`   JavaScript: ${result.javascriptBlocks}`);
    console.log(`   Errors: ${result.errors.length}`);
    console.log(`   Warnings: ${result.warnings.length}`);
    console.log('');
    
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  }
  
  // Print detailed errors
  if (totalErrors > 0) {
    console.log('\n❌ ERRORS FOUND:\n');
    for (const result of results) {
      if (result.errors.length > 0) {
        console.log(`📄 ${result.file}:`);
        for (const error of result.errors) {
          console.log(`   Line ${error.lineNumber}: [${error.language}] ${error.message}`);
          if (error.code) {
            console.log(`      ${error.code}`);
          }
        }
        console.log('');
      }
    }
  }
  
  // Print detailed warnings
  if (totalWarnings > 0) {
    console.log('\n⚠️  WARNINGS:\n');
    for (const result of results) {
      if (result.warnings.length > 0) {
        console.log(`📄 ${result.file}:`);
        for (const warning of result.warnings) {
          console.log(`   Line ${warning.lineNumber}: [${warning.language}] ${warning.message}`);
        }
        console.log('');
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total files validated: ${results.length}`);
  console.log(`Total code blocks: ${results.reduce((sum, r) => sum + r.totalBlocks, 0)}`);
  console.log(`TypeScript blocks: ${results.reduce((sum, r) => sum + r.typescriptBlocks, 0)}`);
  console.log(`JavaScript blocks: ${results.reduce((sum, r) => sum + r.javascriptBlocks, 0)}`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Total warnings: ${totalWarnings}`);
  console.log('='.repeat(60));
  
  // Clean up temp directory
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
  
  if (totalErrors > 0) {
    console.log('\n❌ Validation failed with errors');
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log('\n⚠️  Validation completed with warnings');
    process.exit(0);
  } else {
    console.log('\n✅ All code examples are valid!');
    process.exit(0);
  }
}

// Run the validation
main();
