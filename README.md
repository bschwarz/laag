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

# Install dependencies
bun install

# Build all packages
bun run build

# Run tests
bun test

# Run quality checks
bun run quality
```

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
