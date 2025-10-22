# laag

A modern TypeScript library collection for working with API specification formats including OpenAPI/Swagger, RAML, and more.

## Packages

- **[@laag/core](packages/core/)** - Core utilities and base classes for all laag packages
- **[@laag/openapi](packages/openapi/)** - Comprehensive OpenAPI/Swagger document parsing and manipulation
- **[@laag/raml](packages/raml/)** - RAML document support (coming soon)
- **[@laag/cli](packages/cli/)** - Command-line interface for analyzing API specifications

## Quick Start

### Installation

```bash
# Install individual packages
npm install @laag/openapi @laag/core

# Or install the CLI globally
npm install -g @laag/cli
```

### Basic Usage

```typescript
import { Openapi } from '@laag/openapi';

// Load an OpenAPI document
const api = new Openapi({
  openapi: '3.0.2',
  info: { title: 'My API', version: '1.0.0' },
  paths: {
    '/users': {
      get: {
        summary: 'Get users',
        responses: { '200': { description: 'Success' } },
      },
    },
  },
});

// Access API information
console.log(api.info.title); // "My API"
console.log(api.getPathNames()); // ["/users"]

// Generate samples and code
const requestSample = api.generateJsonSample('/users', 'post', 'request');
const pythonCode = api.getPythonCode('/users', 'post');
const jsCode = api.getJavaScriptCode('/users', 'post');
```

### CLI Usage

```bash
# Analyze an OpenAPI file
laag api.yaml

# Get help
laag --help
```

## Features

- **🔧 Modern TypeScript**: Full type safety with comprehensive TypeScript definitions
- **📦 Multiple Formats**: Support for ESM, CommonJS, and browser bundles
- **🚀 High Performance**: Optimized for speed and memory efficiency
- **🔍 Validation**: Built-in validation according to OpenAPI 3.0+ specifications
- **🛠️ Developer Friendly**: Extensive documentation and examples
- **🌐 Cross-Platform**: Works in Node.js, browsers, and edge environments
- **🎯 Sample Generation**: Generate JSON samples, curl commands, and code in Python, JavaScript, and TypeScript

## Documentation

- [Core Package](packages/core/README.md) - Base functionality and utilities
- [OpenAPI Package](packages/openapi/README.md) - OpenAPI/Swagger support
- [CLI Package](packages/cli/README.md) - Command-line interface
- [Examples](examples/) - Usage examples and tutorials

## Development

```bash
# Clone the repository
git clone https://github.com/bschwarz/laag.git
cd laag

# Install dependencies for all workspace packages
bun install

# Build all packages
bun run workspace:build

# Run tests across all packages
bun run workspace:test

# List all workspace packages
bun run workspace:list

# Version management
bun run workspace:version --patch

# Run quality checks
bun run quality
```

## Releases

### Unified Releases (All Packages)

```bash
# Release all packages together (will prompt for NPM OTP)
bun run release:patch    # Bug fixes
bun run release:minor    # New features
bun run release:major    # Breaking changes
bun run release:beta     # Beta release

# Provide OTP directly
bun run scripts/release.ts --version=1.2.3 --otp=123456
```

### Individual Package Releases

```bash
# Release specific packages independently (will prompt for NPM OTP)
bun run release:openapi:patch    # OpenAPI package patch
bun run release:core:minor       # Core package minor
bun run release:cli:major        # CLI package major

# Or use the release script directly
bun run scripts/release-package.ts @laag/openapi --patch
bun run scripts/release-package.ts @laag/openapi --version=2.1.0

# Provide OTP directly to avoid prompts
bun run scripts/release.ts --packages=@laag/openapi --patch --otp=123456
```

**Note**: All releases require NPM 2FA. The script will prompt for your OTP code unless provided via `--otp` flag.

See [Individual Releases Guide](docs/INDIVIDUAL_RELEASES.md) for detailed instructions.

## Status

**Version 2.0** - Complete TypeScript rewrite with modern tooling and comprehensive test coverage.

### What's New in 2.0

- Complete TypeScript rewrite for better type safety
- Modern ESM/CommonJS dual module support
- Browser-compatible bundles with tree-shaking
- Comprehensive error handling with typed errors
- Bun-based build system for faster development
- Automated release management and publishing
- Cross-platform compatibility testing

## License

MIT - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) and feel free to submit issues and pull requests.
