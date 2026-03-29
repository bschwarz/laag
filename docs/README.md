# Laag Library Documentation

Welcome to the comprehensive documentation for the **laag** library ecosystem - a collection of JavaScript/TypeScript libraries for working with API specification formats.

## Overview

Laag provides a unified, developer-friendly interface for programmatically working with multiple API specification formats including OpenAPI, RAML, and Smithy. Whether you're building API documentation tools, creating automated testing frameworks, or developing API design workflows, laag offers the tools you need.

### Key Features

- **Multi-Format Support**: Work with OpenAPI, RAML, and Smithy specifications using a consistent API
- **TypeScript-First**: Full TypeScript support with comprehensive type definitions
- **Validation**: Built-in document validation according to specification standards
- **Code Generation**: Generate client code, cURL commands, and sample data
- **Extension Support**: Work with custom extension properties (x-\* properties)
- **CLI Tool**: Command-line interface for quick API analysis
- **Modular Architecture**: Use only the packages you need

## Quick Start

### Installation

Install the package you need for your API specification format:

```bash
# For OpenAPI/Swagger
npm install @laag/openapi

# For RAML (coming soon)
npm install @laag/raml

# For CLI tool
npm install -g @laag/cli

# For core functionality (usually installed as a dependency)
npm install @laag/core
```

### Basic Example

```typescript
import { Openapi } from '@laag/openapi';

// Create a new OpenAPI document
const api = new Openapi();
api.title = 'My API';
api.version = '1.0.0';

// Add a path
api.appendPath('/users', {
  get: {
    summary: 'Get all users',
    responses: {
      '200': { description: 'Success' },
    },
  },
});

// Validate and export
const validation = api.validate();
if (validation.valid) {
  console.log(api.getDefinition('prettyjson'));
}
```

### CLI Quick Start

```bash
# Analyze an OpenAPI document
laag api.yaml

# Output:
# Displaying API: My API v1.0.0
# Paths defined in this API:
# GET /users - Get all users
```

## Documentation Structure

### API References

Complete API documentation for each package with method signatures, parameters, and examples:

- **[@laag/openapi API Reference](./API_REFERENCE_OPENAPI.md)** - OpenAPI/Swagger package
- **[@laag/raml API Reference](./API_REFERENCE_RAML.md)** - RAML package (in development)
- **[@laag/core API Reference](./API_REFERENCE_CORE.md)** - Core shared functionality
- **[CLI API Reference](./API_REFERENCE_CLI.md)** - Command-line interface

### Usage Guides

Practical guides with real-world examples and common patterns:

- **[OpenAPI Usage Guide](./USAGE_GUIDE_OPENAPI.md)** - Working with OpenAPI documents
- **[RAML Usage Guide](./USAGE_GUIDE_RAML.md)** - Working with RAML documents (coming soon)
- **[CLI Usage Guide](./CLI_GUIDE.md)** - Command-line tool usage and workflows

### Additional Documentation

- **[Troubleshooting Guide](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[TypeScript Features](./TYPESCRIPT_FEATURES.md)** - TypeScript-specific functionality
- **[Sample Generation](./SAMPLE_GENERATION.md)** - Generating sample data and code

## Package Status

### @laag/openapi

**Status**: ✅ Stable (v2.0.0+)

Full-featured OpenAPI 3.0 implementation with comprehensive support for:

- Document creation, reading, and modification
- Path and operation management
- Component and schema handling
- Validation and error handling
- Sample and code generation
- Extension properties

**Installation**: `npm install @laag/openapi`

**Documentation**: [API Reference](./API_REFERENCE_OPENAPI.md) | [Usage Guide](./USAGE_GUIDE_OPENAPI.md)

### @laag/raml

**Status**: ⚠️ In Development (Placeholder)

RAML package is currently a placeholder that re-exports core functionality. Full RAML 1.0 implementation is planned for future releases.

**Installation**: `npm install @laag/raml`

**Documentation**: [API Reference](./API_REFERENCE_RAML.md) | [Usage Guide](./USAGE_GUIDE_RAML.md)

### @laag/core

**Status**: ✅ Stable (v2.0.0+)

Core package providing shared functionality across all laag packages:

- LaagBase abstract class
- Error handling system
- Type definitions
- Utility methods

**Installation**: `npm install @laag/core` (usually installed as a dependency)

**Documentation**: [API Reference](./API_REFERENCE_CORE.md)

### @laag/cli

**Status**: ✅ Stable (v2.0.0+)

Command-line interface for analyzing OpenAPI documents:

- Quick API inspection
- Endpoint discovery
- CI/CD integration
- Batch processing

**Installation**: `npm install -g @laag/cli`

**Documentation**: [API Reference](./API_REFERENCE_CLI.md) | [Usage Guide](./CLI_GUIDE.md)

### @laag/smithy

**Status**: 📋 Planned

Smithy support is planned for future releases.

## Getting Help

### Documentation

- Browse the [API References](#api-references) for complete method documentation
- Check the [Usage Guides](#usage-guides) for practical examples
- Review the [Troubleshooting Guide](./TROUBLESHOOTING.md) for common issues

### Community

- **GitHub Issues**: [Report bugs or request features](https://github.com/bschwarz/laag/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/bschwarz/laag/discussions)
- **Stack Overflow**: Tag questions with `laag` or `openapi`

### Examples

Check the `examples/` directory in the repository for complete working examples:

- Basic usage examples
- TypeScript examples
- Browser integration
- Advanced patterns

## Common Use Cases

### API Documentation Tools

```typescript
import { Openapi } from '@laag/openapi';
import fs from 'fs';

// Load and analyze an API
const api = new Openapi(fs.readFileSync('api.yaml', 'utf8'));

// Generate documentation
console.log(`# ${api.title} v${api.version}`);
console.log(`\n${api.description}\n`);

api.getPathNames().forEach(path => {
  console.log(`## ${path}`);
  // ... generate documentation for each path
});
```

### API Validation

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi(document);
const validation = api.validate();

if (!validation.valid) {
  console.error('Validation errors:');
  validation.errors.forEach(error => {
    console.error(`  ${error.path}: ${error.message}`);
  });
  process.exit(1);
}
```

### Code Generation

```typescript
import { Openapi } from '@laag/openapi';

const api = new Openapi(document);

// Generate cURL commands
const curlCommands = api.getCurlCommands('/users', 'post');
console.log(curlCommands);

// Generate TypeScript code
const tsCode = api.getTypeScriptCode('/users', 'post');
console.log(tsCode);
```

### CLI Workflows

```bash
# Validate API in CI/CD
laag api.yaml || exit 1

# Generate endpoint list
laag api.yaml | tail -n +3 > endpoints.txt

# Compare API versions
diff <(laag api-v1.yaml) <(laag api-v2.yaml)
```

## Architecture

### Package Structure

```
laag/
├── packages/
│   ├── core/          # Shared functionality
│   ├── openapi/       # OpenAPI implementation
│   ├── raml/          # RAML implementation (in development)
│   ├── smithy/        # Smithy implementation (planned)
│   └── cli/           # Command-line interface
├── docs/              # Documentation
└── examples/          # Usage examples
```

### Design Principles

1. **Unified Interface**: Consistent API across different specification formats
2. **Type Safety**: Full TypeScript support with comprehensive type definitions
3. **Extensibility**: Easy to extend with custom functionality
4. **Developer Experience**: Clear error messages and helpful documentation
5. **Performance**: Efficient parsing and manipulation of large documents
6. **Modularity**: Use only the packages you need

## Contributing to Documentation

We welcome contributions to improve the documentation! Here's how you can help:

### Reporting Issues

If you find errors, unclear explanations, or missing information:

1. Check if the issue already exists in [GitHub Issues](https://github.com/bschwarz/laag/issues)
2. Create a new issue with:
   - Clear description of the problem
   - Location in the documentation (file and section)
   - Suggested improvement (if applicable)

### Suggesting Improvements

Have ideas for better examples or additional topics?

1. Open a [GitHub Discussion](https://github.com/bschwarz/laag/discussions)
2. Describe your suggestion and why it would be helpful
3. Provide examples if applicable

### Contributing Changes

To contribute documentation changes:

1. **Fork the repository**

   ```bash
   git clone https://github.com/bschwarz/laag.git
   cd laag
   ```

2. **Create a branch**

   ```bash
   git checkout -b docs/improve-openapi-guide
   ```

3. **Make your changes**
   - Edit files in the `docs/` directory
   - Follow the existing style and format
   - Add code examples where helpful
   - Ensure all code examples are tested and working

4. **Test your changes**
   - Verify all code examples run correctly
   - Check markdown formatting
   - Ensure links work correctly

5. **Submit a pull request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Wait for review and feedback

### Documentation Style Guide

When contributing documentation:

**Formatting**:

- Use clear, concise language
- Write in present tense
- Use active voice
- Break long sections into subsections
- Use code blocks for all code examples
- Include both TypeScript and JavaScript examples where applicable

**Code Examples**:

- Ensure all examples are complete and runnable
- Include necessary imports
- Add comments for non-obvious code
- Show both input and expected output
- Use realistic variable names and values

**Structure**:

- Start with simple examples, progress to complex
- Include a "See Also" section for related topics
- Add cross-references to related documentation
- Use consistent heading hierarchy

**Technical Accuracy**:

- Test all code examples
- Verify API signatures match the implementation
- Keep examples up to date with the latest version
- Note any version-specific behavior

### Documentation Checklist

Before submitting documentation changes:

- [ ] All code examples are tested and working
- [ ] TypeScript examples include proper type annotations
- [ ] All necessary imports are included
- [ ] Markdown formatting is correct
- [ ] Links to other documentation are valid
- [ ] Examples progress from simple to complex
- [ ] Error handling is demonstrated where appropriate
- [ ] Cross-references to related topics are included
- [ ] Spelling and grammar are correct
- [ ] Changes follow the existing style

## Version Compatibility

### Node.js

- **Minimum**: Node.js 18.0.0
- **Recommended**: Node.js 20.x or later
- **LTS Support**: All current LTS versions are supported

### TypeScript

- **Minimum**: TypeScript 4.5.0
- **Recommended**: TypeScript 5.x
- **Type Definitions**: Included in all packages

### Browsers

The packages work in modern browsers when bundled:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

See the [browser examples](../examples/browser/) for integration details.

## Migration Guides

### Upgrading from v1.x to v2.x

See [MIGRATION.md](../MIGRATION.md) for detailed migration instructions.

### Moving from Other Libraries

If you're migrating from other OpenAPI libraries:

- **swagger-parser**: See migration examples in the OpenAPI usage guide
- **openapi3-ts**: Similar TypeScript types, but different API surface
- **swagger-js**: Different focus (client generation vs. document manipulation)

## Roadmap

### Current Focus

- Completing RAML implementation
- Enhancing validation capabilities
- Improving error messages
- Adding more code generation options

### Future Plans

- Smithy support
- GraphQL schema generation
- AsyncAPI support
- Enhanced CLI features
- Visual documentation generation

See the [GitHub project board](https://github.com/bschwarz/laag/projects) for detailed roadmap and progress.

## License

The laag library is released under the MIT License. See [LICENSE](../LICENSE) for details.

## Acknowledgments

Built with:

- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager
- [js-yaml](https://github.com/nodeca/js-yaml) - YAML parser

Inspired by the OpenAPI, RAML, and Smithy communities.

## Stay Updated

- **Watch the repository**: Get notified of new releases
- **Star on GitHub**: Show your support
- **Follow releases**: Subscribe to release notifications
- **Join discussions**: Participate in the community

---

**Ready to get started?** Choose your package:

- [OpenAPI Usage Guide](./USAGE_GUIDE_OPENAPI.md) - Start working with OpenAPI
- [CLI Usage Guide](./CLI_GUIDE.md) - Use the command-line tool
- [API References](#api-references) - Explore the complete API

**Need help?** Check the [Troubleshooting Guide](./TROUBLESHOOTING.md) or [open an issue](https://github.com/bschwarz/laag/issues).
