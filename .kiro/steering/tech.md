# Technology Stack

## Build System & Package Management
- **Monorepo**: Managed with Bun workspaces for multi-package development
- **Package Manager**: Bun (evidenced by `bun.lockb` files and test scripts)
- **Module System**: ESM modules with CommonJS compatibility

## Core Technologies
- **Runtime**: Node.js 18+, Bun
- **Language**: TypeScript (compiled to JavaScript)
- **Testing**: Bun test framework with standard test patterns
- **Dependencies**: Minimal external dependencies (js-yaml for YAML parsing)

## Project Structure
- Bun workspace monorepo with packages in `packages/` directory
- Each package has its own `package.json`, tests, examples, and dist directory
- TypeScript source code in `src/` directories
- Built artifacts in `dist/` directories (esm, cjs, browser, types)
- Tests located in `__tests__/` directories

## Common Commands

### Testing
```bash
# Run tests for all packages
bun test

# Run tests for specific package
bun test packages/openapi
bun test packages/smithy

# Run tests with coverage
bun test --coverage

# Tests use Bun test framework with imports like:
# import { describe, expect, test, beforeAll } from 'bun:test'
```

### Package Management
```bash
# Install dependencies (uses Bun)
bun install

# Bun workspace commands for monorepo management
bun run workspace:version --patch    # Version all packages
bun run workspace:list              # List all packages
bun run workspace:test              # Test all packages
bun run workspace:build             # Build all packages
```

## Code Patterns
- Class-based architecture with TypeScript
- Static utility methods for common operations
- Extension methods for API specification extensions (x-* properties)
- Helper methods for nested object key existence checking
- Consistent naming: `{format}.ts` for main class files (e.g., openapi.ts, smithy.ts)
- Type-safe interfaces and type definitions
- Validation methods returning structured ValidationResult objects
- Code generation methods for TypeScript, JavaScript, and Python