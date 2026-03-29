#!/usr/bin/env bun
/**
 * Documentation Validation Script
 *
 * This script validates the completeness and correctness of the laag library documentation.
 * It checks for:
 * - File existence
 * - API completeness (all public methods documented)
 * - Code example syntax validation
 * - Documentation structure consistency
 * - TypeScript type coverage
 *
 * Usage: bun run scripts/validate-documentation.ts
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';

interface ValidationError {
  path: string;
  message: string;
  code: string;
  severity: 'error' | 'warning';
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

class DocumentationValidator {
  private errors: ValidationError[] = [];
  private warnings: ValidationError[] = [];
  private docsDir = 'docs';
  private packagesDir = 'packages';

  /**
   * Run all validation checks
   */
  async validate(): Promise<ValidationResult> {
    console.log('🔍 Starting documentation validation...\n');

    this.validateFileExistence();
    this.validateAPICompleteness();
    this.validateCodeExamples();
    this.validateDocumentStructure();
    this.validateTypeScriptTypes();

    const result: ValidationResult = {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
    };

    this.printResults(result);
    return result;
  }

  /**
   * Validate that all required documentation files exist
   */
  private validateFileExistence(): void {
    console.log('📁 Checking file existence...');

    const requiredFiles = [
      'docs/README.md',
      'docs/API_REFERENCE_OPENAPI.md',
      'docs/API_REFERENCE_RAML.md',
      'docs/API_REFERENCE_CORE.md',
      'docs/API_REFERENCE_CLI.md',
      'docs/USAGE_GUIDE_OPENAPI.md',
      'docs/USAGE_GUIDE_RAML.md',
      'docs/CLI_GUIDE.md',
    ];

    for (const file of requiredFiles) {
      if (!existsSync(file)) {
        this.errors.push({
          path: file,
          message: 'Required documentation file missing',
          code: 'MISSING_FILE',
          severity: 'error',
        });
      }
    }

    console.log(`  ✓ Checked ${requiredFiles.length} required files\n`);
  }

  /**
   * Validate that all public methods are documented
   */
  private validateAPICompleteness(): void {
    console.log('🔧 Checking API completeness...');

    // Check OpenAPI package
    this.validatePackageAPI('openapi', 'API_REFERENCE_OPENAPI.md');

    // Check Core package
    this.validatePackageAPI('core', 'API_REFERENCE_CORE.md');

    console.log('  ✓ API completeness check complete\n');
  }

  /**
   * Validate API documentation for a specific package
   */
  private validatePackageAPI(packageName: string, docFile: string): void {
    const srcPath = join(this.packagesDir, packageName, 'src');
    if (!existsSync(srcPath)) {
      return;
    }

    const publicMethods = this.extractPublicMethods(srcPath);
    const documentedMethods = this.extractDocumentedMethods(join(this.docsDir, docFile));

    // Check for undocumented methods
    for (const method of publicMethods) {
      if (!documentedMethods.has(method)) {
        this.warnings.push({
          path: `${docFile}`,
          message: `Public method '${method}' from ${packageName} package is not documented`,
          code: 'UNDOCUMENTED_METHOD',
          severity: 'warning',
        });
      }
    }
  }

  /**
   * Extract public methods from source files
   */
  private extractPublicMethods(srcPath: string): Set<string> {
    const methods = new Set<string>();

    const files = this.getTypeScriptFiles(srcPath);
    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      const sourceFile = ts.createSourceFile(
        file,
        content,
        ts.ScriptTarget.Latest,
        true
      );

      this.visitNode(sourceFile, methods);
    }

    return methods;
  }

  /**
   * Visit TypeScript AST nodes to find public methods
   */
  private visitNode(node: ts.Node, methods: Set<string>): void {
    if (ts.isClassDeclaration(node)) {
      node.members.forEach(member => {
        if (ts.isMethodDeclaration(member) || ts.isGetAccessor(member) || ts.isSetAccessor(member)) {
          const isPublic = !member.modifiers?.some(
            mod => mod.kind === ts.SyntaxKind.PrivateKeyword || mod.kind === ts.SyntaxKind.ProtectedKeyword
          );

          if (isPublic && member.name && ts.isIdentifier(member.name)) {
            methods.add(member.name.text);
          }
        }
      });
    }

    ts.forEachChild(node, child => this.visitNode(child, methods));
  }

  /**
   * Extract documented methods from markdown file
   */
  private extractDocumentedMethods(docPath: string): Set<string> {
    const methods = new Set<string>();

    if (!existsSync(docPath)) {
      return methods;
    }

    const content = readFileSync(docPath, 'utf-8');

    // Match method headings like ### methodName or #### methodName
    const methodRegex = /^#{3,4}\s+`?([a-zA-Z_$][a-zA-Z0-9_$]*)`?/gm;
    let match;

    while ((match = methodRegex.exec(content)) !== null) {
      methods.add(match[1]);
    }

    return methods;
  }

  /**
   * Get all TypeScript files in a directory recursively
   */
  private getTypeScriptFiles(dir: string): string[] {
    const files: string[] = [];

    if (!existsSync(dir)) {
      return files;
    }

    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...this.getTypeScriptFiles(fullPath));
      } else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts') && !entry.endsWith('.test.ts')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Validate code examples in documentation
   */
  private validateCodeExamples(): void {
    console.log('💻 Validating code examples...');

    const docFiles = this.getMarkdownFiles(this.docsDir);
    let totalExamples = 0;
    let validExamples = 0;

    for (const file of docFiles) {
      const content = readFileSync(file, 'utf-8');
      const examples = this.extractCodeBlocks(content);

      for (const example of examples) {
        totalExamples++;

        if (example.language === 'typescript' || example.language === 'ts') {
          if (this.validateTypeScriptCode(example.code, file)) {
            validExamples++;
          }
        } else if (example.language === 'javascript' || example.language === 'js') {
          if (this.validateJavaScriptCode(example.code, file)) {
            validExamples++;
          }
        } else {
          validExamples++; // Non-code blocks are considered valid
        }
      }
    }

    console.log(`  ✓ Validated ${totalExamples} code examples (${validExamples} valid)\n`);
  }

  /**
   * Extract code blocks from markdown content
   */
  private extractCodeBlocks(content: string): Array<{ language: string; code: string }> {
    const blocks: Array<{ language: string; code: string }> = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      blocks.push({
        language: match[1] || 'text',
        code: match[2],
      });
    }

    return blocks;
  }

  /**
   * Validate TypeScript code syntax
   */
  private validateTypeScriptCode(code: string, file: string): boolean {
    const result = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
        noEmit: true,
        skipLibCheck: true,
      },
      reportDiagnostics: true,
    });

    if (result.diagnostics && result.diagnostics.length > 0) {
      for (const diagnostic of result.diagnostics) {
        // Only report errors, not warnings
        if (diagnostic.category === ts.DiagnosticCategory.Error) {
          this.errors.push({
            path: file,
            message: `TypeScript syntax error in code example: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`,
            code: 'INVALID_TYPESCRIPT',
            severity: 'error',
          });
          return false;
        }
      }
    }

    // Check for imports
    if (!code.includes('import') && code.includes('from ')) {
      this.warnings.push({
        path: file,
        message: 'Code example may be missing import statements',
        code: 'MISSING_IMPORTS',
        severity: 'warning',
      });
    }

    return true;
  }

  /**
   * Validate JavaScript code syntax
   */
  private validateJavaScriptCode(code: string, file: string): boolean {
    try {
      // Use TypeScript parser to validate JavaScript
      const result = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.ESNext,
          allowJs: true,
          noEmit: true,
          skipLibCheck: true,
        },
        reportDiagnostics: true,
      });

      if (result.diagnostics && result.diagnostics.length > 0) {
        for (const diagnostic of result.diagnostics) {
          if (diagnostic.category === ts.DiagnosticCategory.Error) {
            this.errors.push({
              path: file,
              message: `JavaScript syntax error in code example: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`,
              code: 'INVALID_JAVASCRIPT',
              severity: 'error',
            });
            return false;
          }
        }
      }

      return true;
    } catch (error) {
      this.errors.push({
        path: file,
        message: `Failed to parse JavaScript code example: ${error}`,
        code: 'PARSE_ERROR',
        severity: 'error',
      });
      return false;
    }
  }

  /**
   * Validate document structure
   */
  private validateDocumentStructure(): void {
    console.log('📋 Validating document structure...');

    const docFiles = this.getMarkdownFiles(this.docsDir);

    for (const file of docFiles) {
      const content = readFileSync(file, 'utf-8');

      // Check for table of contents
      if (!content.includes('## Table of Contents') && !content.includes('## Contents')) {
        this.warnings.push({
          path: file,
          message: 'Document is missing a table of contents',
          code: 'MISSING_TOC',
          severity: 'warning',
        });
      }

      // Check heading hierarchy
      this.validateHeadingHierarchy(content, file);
    }

    console.log('  ✓ Document structure validation complete\n');
  }

  /**
   * Validate heading hierarchy in markdown
   */
  private validateHeadingHierarchy(content: string, file: string): void {
    const lines = content.split('\n');
    let previousLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^(#{1,6})\s+/);

      if (match) {
        const level = match[1].length;

        // Check if we're skipping levels (e.g., H1 to H3)
        if (level > previousLevel + 1 && previousLevel > 0) {
          this.warnings.push({
            path: file,
            message: `Heading hierarchy skip detected at line ${i + 1}: jumped from H${previousLevel} to H${level}`,
            code: 'HEADING_HIERARCHY_SKIP',
            severity: 'warning',
          });
        }

        previousLevel = level;
      }
    }
  }

  /**
   * Validate TypeScript type coverage
   */
  private validateTypeScriptTypes(): void {
    console.log('🔤 Validating TypeScript type coverage...');

    // Check that all exported types are documented
    const typesFile = join(this.packagesDir, 'openapi', 'src', 'types.ts');
    if (existsSync(typesFile)) {
      const exportedTypes = this.extractExportedTypes(typesFile);
      const documentedTypes = this.extractDocumentedTypes(join(this.docsDir, 'API_REFERENCE_OPENAPI.md'));

      for (const type of exportedTypes) {
        if (!documentedTypes.has(type)) {
          this.warnings.push({
            path: 'API_REFERENCE_OPENAPI.md',
            message: `Exported type '${type}' is not documented`,
            code: 'UNDOCUMENTED_TYPE',
            severity: 'warning',
          });
        }
      }
    }

    console.log('  ✓ TypeScript type coverage check complete\n');
  }

  /**
   * Extract exported types from TypeScript file
   */
  private extractExportedTypes(file: string): Set<string> {
    const types = new Set<string>();
    const content = readFileSync(file, 'utf-8');
    const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);

    const visit = (node: ts.Node) => {
      if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
        const hasExport = node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword);
        if (hasExport && node.name) {
          types.add(node.name.text);
        }
      }
      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
    return types;
  }

  /**
   * Extract documented types from markdown
   */
  private extractDocumentedTypes(docPath: string): Set<string> {
    const types = new Set<string>();

    if (!existsSync(docPath)) {
      return types;
    }

    const content = readFileSync(docPath, 'utf-8');

    // Match type/interface headings
    const typeRegex = /^#{3,4}\s+`?([A-Z][a-zA-Z0-9]*(?:Object|Type)?)`?/gm;
    let match;

    while ((match = typeRegex.exec(content)) !== null) {
      types.add(match[1]);
    }

    return types;
  }

  /**
   * Get all markdown files in a directory
   */
  private getMarkdownFiles(dir: string): string[] {
    const files: string[] = [];

    if (!existsSync(dir)) {
      return files;
    }

    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...this.getMarkdownFiles(fullPath));
      } else if (entry.endsWith('.md')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Print validation results
   */
  private printResults(result: ValidationResult): void {
    console.log('═'.repeat(60));
    console.log('📊 VALIDATION RESULTS');
    console.log('═'.repeat(60));

    if (result.errors.length === 0 && result.warnings.length === 0) {
      console.log('\n✅ All validation checks passed!\n');
      return;
    }

    if (result.errors.length > 0) {
      console.log(`\n❌ ERRORS (${result.errors.length}):\n`);
      for (const error of result.errors) {
        console.log(`  [${error.code}] ${error.path}`);
        console.log(`    ${error.message}\n`);
      }
    }

    if (result.warnings.length > 0) {
      console.log(`\n⚠️  WARNINGS (${result.warnings.length}):\n`);
      for (const warning of result.warnings) {
        console.log(`  [${warning.code}] ${warning.path}`);
        console.log(`    ${warning.message}\n`);
      }
    }

    console.log('═'.repeat(60));
    console.log(`\nStatus: ${result.valid ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`Errors: ${result.errors.length}`);
    console.log(`Warnings: ${result.warnings.length}\n`);
  }
}

// Run validation
const validator = new DocumentationValidator();
const result = await validator.validate();

// Exit with appropriate code
process.exit(result.valid ? 0 : 1);
