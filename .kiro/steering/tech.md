# Technology Stack

## Build System & Package Management
- **Monorepo**: Managed with Bun workspaces for multi-package development
- **Package Manager**: Bun (evidenced by `bun.lockb` files and test scripts)
- **Module System**: ESM modules with CommonJS compatibility

## Core Technologies
- **Runtime**: Node.js
- **Language**: JavaScript (ES5/CommonJS style)
- **Testing**: Bun test framework with standard test patterns
- **Dependencies**: Minimal external dependencies (js-yaml for YAML parsing)

## Project Structure
- Lerna-managed monorepo with packages in `packages/` directory
- Each package has its own `package.json`, tests, examples, and lib directory
- Source code compiled/built into `lib/` directories
- Tests located in `__tests__/` directories

## Common Commands

### Testing
```bash
# Run tests for individual packages
cd packages/openapi && bun test

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
- Class-based architecture with static utility methods
- Extension methods for API specification extensions (x-* properties)
- Helper methods for nested object key existence checking
- Consistent naming: `laag-{format}.js` for main library files