#!/usr/bin/env bun
/**
 * Simplified script to validate code examples in documentation
 * Focuses on quick checks without full TypeScript compilation
 */

import fs from 'fs';
import path from 'path';

interface CodeBlock {
  language: 'typescript' | 'javascript' | 'other';
  code: string;
  file: string;
  lineNumber: number;
}

interface ValidationResult {
  file: string;
  totalBlocks: number;
  typescriptBlocks: number;
  javascriptBlocks: number;
  issues: Issue[];
}

interface Issue {
  file: string;
  lineNumber: number;
  language: string;
  type: 'error' | 'warning';
  message: string;
}

const DOCS_DIR = path.join(process.cwd(), 'docs');

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

function extractCodeBlocks(content: string, filename: string): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  const lines = content.split('\n');
  let inCodeBlock = false;
  let currentBlock: string[] = [];
  let currentLanguage = '';
  let blockStartLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        currentLanguage = line.substring(3).trim().toLowerCase();
        blockStartLine = i + 1;
        currentBlock = [];
      } else {
        inCodeBlock = false;
        
        let language: CodeBlock['language'] = 'other';
        if (currentLanguage === 'typescript' || currentLanguage === 'ts') {
          language = 'typescript';
        } else if (currentLanguage === 'javascript' || currentLanguage === 'js') {
          language = 'javascript';
        }
        
        if (language !== 'other') {
          blocks.push({
            language,
            code: currentBlock.join('\n'),
            file: filename,
            lineNumber: blockStartLine
          });
        }
      }
    } else if (inCodeBlock) {
      currentBlock.push(line);
    }
  }
  
  return blocks;
}

function checkImports(code: string): string[] {
  const missing: string[] = [];
  
  // Skip if it's just output or comments
  if (code.trim().startsWith('//') || code.trim().startsWith('/*') || code.trim().startsWith('Output:')) {
    return missing;
  }
  
  // Skip very short examples
  if (code.length < 50) {
    return missing;
  }
  
  // Skip if it's defining a class or interface
  if (code.includes('class ') || code.includes('interface ')) {
    return missing;
  }
  
  // Check for Openapi usage without import
  if ((code.includes('new Openapi') || code.includes('Openapi(')) && 
      !code.includes('import') && 
      !code.includes('require')) {
    missing.push('Openapi');
  }
  
  // Check for LaagBase usage without import
  if ((code.includes('LaagBase') || code.includes('extends LaagBase')) && 
      !code.includes('import') && 
      !code.includes('require') &&
      !code.includes('class LaagBase')) {
    missing.push('LaagBase');
  }
  
  return missing;
}

function checkTypeAnnotations(code: string): boolean {
  // Skip if it's just output or very short
  if (code.length < 50 || code.trim().startsWith('Output:') || code.trim().startsWith('//')) {
    return true;
  }
  
  // Skip if it's defining types/interfaces
  if (code.includes('interface ') || code.includes('type ')) {
    return true;
  }
  
  // Look for type annotations
  const hasTypes = 
    /:\s*(string|number|boolean|any|unknown|void|never|object|Array|Record|Promise|OpenAPIDocument|InfoObject|PathItemObject|OperationObject|ServerObject|ValidationResult|BaseDocument|ExtensionObject)/.test(code) ||
    /<[A-Z]/.test(code);
  
  return hasTypes;
}

function checkErrorHandling(code: string): boolean {
  // If code has error handling keywords, check for try-catch
  const hasErrorKeywords = /catch|throw new|error\./i.test(code);
  const hasTryCatch = /try\s*{[\s\S]*}\s*catch/.test(code);
  
  // If it's throwing an error, that's fine
  if (code.includes('throw new')) {
    return true;
  }
  
  // If it mentions catching errors but doesn't have try-catch, that's an issue
  if (hasErrorKeywords && !hasTryCatch && code.includes('error')) {
    return false;
  }
  
  return true;
}

function checkBasicSyntax(code: string): string[] {
  const errors: string[] = [];
  
  // Skip output examples
  if (code.trim().startsWith('Output:') || code.trim().startsWith('//')) {
    return errors;
  }
  
  // Check for unmatched braces
  const openBraces = (code.match(/{/g) || []).length;
  const closeBraces = (code.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push(`Unmatched braces: ${openBraces} open, ${closeBraces} close`);
  }
  
  // Check for unmatched parentheses
  const openParens = (code.match(/\(/g) || []).length;
  const closeParens = (code.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    errors.push(`Unmatched parentheses: ${openParens} open, ${closeParens} close`);
  }
  
  // Check for unmatched brackets
  const openBrackets = (code.match(/\[/g) || []).length;
  const closeBrackets = (code.match(/\]/g) || []).length;
  if (openBrackets !== closeBrackets) {
    errors.push(`Unmatched brackets: ${openBrackets} open, ${closeBrackets} close`);
  }
  
  return errors;
}

function validateDocFile(filename: string): ValidationResult {
  const result: ValidationResult = {
    file: filename,
    totalBlocks: 0,
    typescriptBlocks: 0,
    javascriptBlocks: 0,
    issues: []
  };
  
  const filePath = path.join(DOCS_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    result.issues.push({
      file: filename,
      lineNumber: 0,
      language: 'n/a',
      type: 'error',
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
      
      // Check imports (Requirement 3.2)
      const missingImports = checkImports(block.code);
      if (missingImports.length > 0) {
        result.issues.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'typescript',
          type: 'warning',
          message: `Missing imports: ${missingImports.join(', ')}`
        });
      }
      
      // Check type annotations (Requirement 3.3)
      if (!checkTypeAnnotations(block.code)) {
        result.issues.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'typescript',
          type: 'warning',
          message: 'Missing type annotations'
        });
      }
      
      // Check error handling (Requirement 3.6)
      if (!checkErrorHandling(block.code)) {
        result.issues.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'typescript',
          type: 'warning',
          message: 'Error handling without try-catch'
        });
      }
      
      // Check basic syntax (Requirement 3.1)
      const syntaxErrors = checkBasicSyntax(block.code);
      for (const error of syntaxErrors) {
        result.issues.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'typescript',
          type: 'error',
          message: error
        });
      }
    } else if (block.language === 'javascript') {
      result.javascriptBlocks++;
      
      // Check imports (Requirement 3.2)
      const missingImports = checkImports(block.code);
      if (missingImports.length > 0) {
        result.issues.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'javascript',
          type: 'warning',
          message: `Missing imports: ${missingImports.join(', ')}`
        });
      }
      
      // Check error handling (Requirement 3.6)
      if (!checkErrorHandling(block.code)) {
        result.issues.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'javascript',
          type: 'warning',
          message: 'Error handling without try-catch'
        });
      }
      
      // Check basic syntax (Requirement 3.1)
      const syntaxErrors = checkBasicSyntax(block.code);
      for (const error of syntaxErrors) {
        result.issues.push({
          file: filename,
          lineNumber: block.lineNumber,
          language: 'javascript',
          type: 'error',
          message: error
        });
      }
    }
  }
  
  return result;
}

function main() {
  console.log('🔍 Validating code examples in documentation...\n');
  
  const results: ValidationResult[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  
  for (const docFile of DOC_FILES) {
    console.log(`📄 ${docFile}`);
    const result = validateDocFile(docFile);
    results.push(result);
    
    const errors = result.issues.filter(i => i.type === 'error').length;
    const warnings = result.issues.filter(i => i.type === 'warning').length;
    
    console.log(`   Code blocks: ${result.totalBlocks} (TS: ${result.typescriptBlocks}, JS: ${result.javascriptBlocks})`);
    console.log(`   Issues: ${errors} errors, ${warnings} warnings`);
    
    totalErrors += errors;
    totalWarnings += warnings;
  }
  
  // Print detailed issues
  console.log('\n' + '='.repeat(70));
  
  if (totalErrors > 0) {
    console.log('\n❌ ERRORS:\n');
    for (const result of results) {
      const errors = result.issues.filter(i => i.type === 'error');
      if (errors.length > 0) {
        console.log(`📄 ${result.file}:`);
        for (const error of errors) {
          console.log(`   Line ${error.lineNumber}: [${error.language}] ${error.message}`);
        }
      }
    }
  }
  
  if (totalWarnings > 0) {
    console.log('\n⚠️  WARNINGS:\n');
    for (const result of results) {
      const warnings = result.issues.filter(i => i.type === 'warning');
      if (warnings.length > 0) {
        console.log(`📄 ${result.file}:`);
        for (const warning of warnings) {
          console.log(`   Line ${warning.lineNumber}: [${warning.language}] ${warning.message}`);
        }
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('SUMMARY');
  console.log('='.repeat(70));
  console.log(`Files validated: ${results.length}`);
  console.log(`Total code blocks: ${results.reduce((sum, r) => sum + r.totalBlocks, 0)}`);
  console.log(`TypeScript blocks: ${results.reduce((sum, r) => sum + r.typescriptBlocks, 0)}`);
  console.log(`JavaScript blocks: ${results.reduce((sum, r) => sum + r.javascriptBlocks, 0)}`);
  console.log(`Errors: ${totalErrors}`);
  console.log(`Warnings: ${totalWarnings}`);
  console.log('='.repeat(70));
  
  if (totalErrors === 0 && totalWarnings === 0) {
    console.log('\n✅ All code examples passed validation!');
  } else if (totalErrors === 0) {
    console.log('\n✅ No errors found (warnings can be reviewed)');
  } else {
    console.log('\n❌ Validation failed - please fix errors');
  }
  
  process.exit(totalErrors > 0 ? 1 : 0);
}

main();
