#!/usr/bin/env bun
/**
 * Script to verify error handling examples in documentation
 * Checks that error handling examples use try-catch blocks
 */

import fs from 'fs';
import path from 'path';

interface ErrorHandlingExample {
  file: string;
  lineNumber: number;
  language: string;
  code: string;
  hasTryCatch: boolean;
  hasThrow: boolean;
  hasErrorType: boolean;
}

const DOCS_DIR = path.join(process.cwd(), 'docs');

const DOC_FILES = [
  'API_REFERENCE_OPENAPI.md',
  'API_REFERENCE_CORE.md',
  'API_REFERENCE_CLI.md',
  'USAGE_GUIDE_OPENAPI.md',
  'README.md'
];

function extractCodeBlocks(content: string, filename: string) {
  const blocks: Array<{ language: string; code: string; lineNumber: number }> = [];
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
        
        if (currentLanguage === 'typescript' || currentLanguage === 'ts' || 
            currentLanguage === 'javascript' || currentLanguage === 'js') {
          blocks.push({
            language: currentLanguage,
            code: currentBlock.join('\n'),
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

function analyzeErrorHandling(code: string): {
  hasErrorKeywords: boolean;
  hasTryCatch: boolean;
  hasThrow: boolean;
  hasErrorType: boolean;
  errorTypes: string[];
} {
  const hasErrorKeywords = /error|exception|catch|throw/i.test(code);
  const hasTryCatch = /try\s*{[\s\S]*}\s*catch/.test(code);
  const hasThrow = /throw\s+new/.test(code);
  
  // Check for error types
  const errorTypes: string[] = [];
  const errorTypeMatches = code.match(/instanceof\s+(\w+Error)/g);
  if (errorTypeMatches) {
    errorTypeMatches.forEach(match => {
      const type = match.replace('instanceof ', '');
      if (!errorTypes.includes(type)) {
        errorTypes.push(type);
      }
    });
  }
  
  // Also check for throw statements with error types
  const throwMatches = code.match(/throw\s+new\s+(\w+Error)/g);
  if (throwMatches) {
    throwMatches.forEach(match => {
      const type = match.replace(/throw\s+new\s+/, '');
      if (!errorTypes.includes(type)) {
        errorTypes.push(type);
      }
    });
  }
  
  const hasErrorType = errorTypes.length > 0;
  
  return {
    hasErrorKeywords,
    hasTryCatch,
    hasThrow,
    hasErrorType,
    errorTypes
  };
}

function main() {
  console.log('🔍 Verifying error handling examples...\n');
  
  const errorHandlingExamples: ErrorHandlingExample[] = [];
  let totalExamples = 0;
  let examplesWithTryCatch = 0;
  let examplesWithThrow = 0;
  let examplesWithErrorTypes = 0;
  
  for (const docFile of DOC_FILES) {
    const filePath = path.join(DOCS_DIR, docFile);
    
    if (!fs.existsSync(filePath)) {
      continue;
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const blocks = extractCodeBlocks(content, docFile);
    
    for (const block of blocks) {
      const analysis = analyzeErrorHandling(block.code);
      
      if (analysis.hasErrorKeywords) {
        totalExamples++;
        
        const example: ErrorHandlingExample = {
          file: docFile,
          lineNumber: block.lineNumber,
          language: block.language,
          code: block.code,
          hasTryCatch: analysis.hasTryCatch,
          hasThrow: analysis.hasThrow,
          hasErrorType: analysis.hasErrorType
        };
        
        errorHandlingExamples.push(example);
        
        if (analysis.hasTryCatch) examplesWithTryCatch++;
        if (analysis.hasThrow) examplesWithThrow++;
        if (analysis.hasErrorType) examplesWithErrorTypes++;
      }
    }
  }
  
  // Print summary
  console.log('='.repeat(70));
  console.log('ERROR HANDLING EXAMPLES SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total error handling examples: ${totalExamples}`);
  console.log(`Examples with try-catch: ${examplesWithTryCatch} (${Math.round(examplesWithTryCatch/totalExamples*100)}%)`);
  console.log(`Examples with throw: ${examplesWithThrow} (${Math.round(examplesWithThrow/totalExamples*100)}%)`);
  console.log(`Examples with error types: ${examplesWithErrorTypes} (${Math.round(examplesWithErrorTypes/totalExamples*100)}%)`);
  console.log('='.repeat(70));
  
  // Print examples by file
  console.log('\n📊 BREAKDOWN BY FILE:\n');
  
  const fileGroups = new Map<string, ErrorHandlingExample[]>();
  for (const example of errorHandlingExamples) {
    if (!fileGroups.has(example.file)) {
      fileGroups.set(example.file, []);
    }
    fileGroups.get(example.file)!.push(example);
  }
  
  for (const [file, examples] of fileGroups) {
    const withTryCatch = examples.filter(e => e.hasTryCatch).length;
    const withThrow = examples.filter(e => e.hasThrow).length;
    const withTypes = examples.filter(e => e.hasErrorType).length;
    
    console.log(`📄 ${file}`);
    console.log(`   Total: ${examples.length}`);
    console.log(`   With try-catch: ${withTryCatch}`);
    console.log(`   With throw: ${withThrow}`);
    console.log(`   With error types: ${withTypes}`);
    console.log('');
  }
  
  // Check for issues
  console.log('='.repeat(70));
  console.log('VALIDATION RESULTS');
  console.log('='.repeat(70));
  
  const issues = errorHandlingExamples.filter(e => 
    !e.hasTryCatch && !e.hasThrow && e.code.length > 100
  );
  
  if (issues.length > 0) {
    console.log(`\n⚠️  Found ${issues.length} examples that might need review:\n`);
    for (const issue of issues) {
      console.log(`📄 ${issue.file}:${issue.lineNumber}`);
      console.log(`   Language: ${issue.language}`);
      console.log(`   Has try-catch: ${issue.hasTryCatch}`);
      console.log(`   Has throw: ${issue.hasThrow}`);
      console.log(`   Has error types: ${issue.hasErrorType}`);
      console.log('');
    }
  } else {
    console.log('\n✅ All error handling examples follow best practices!');
  }
  
  // Verify error types are correct
  console.log('\n='.repeat(70));
  console.log('ERROR TYPES USED');
  console.log('='.repeat(70));
  
  const allErrorTypes = new Set<string>();
  for (const example of errorHandlingExamples) {
    const analysis = analyzeErrorHandling(example.code);
    analysis.errorTypes.forEach(type => allErrorTypes.add(type));
  }
  
  console.log('\nError types found in examples:');
  Array.from(allErrorTypes).sort().forEach(type => {
    console.log(`  - ${type}`);
  });
  
  // Verify these are the correct error types from @laag/core
  const expectedTypes = ['ParseError', 'ValidationError', 'NotFoundError', 'LaagError'];
  const unexpectedTypes = Array.from(allErrorTypes).filter(t => !expectedTypes.includes(t) && t !== 'Error');
  
  if (unexpectedTypes.length > 0) {
    console.log('\n⚠️  Unexpected error types (should be from @laag/core):');
    unexpectedTypes.forEach(type => {
      console.log(`  - ${type}`);
    });
  } else {
    console.log('\n✅ All error types are correct!');
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ Error handling verification complete!');
  console.log('='.repeat(70));
}

main();
