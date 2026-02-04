# Contributing to laag

Thank you for your interest in contributing to laag! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites

- Node.js 18.0.0 or higher
- Bun 1.0.0 or higher (recommended) or npm/yarn
- Git

### Getting Started

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/laag.git
   cd laag
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Build the packages**

   ```bash
   bun run build
   ```

4. **Run tests**

   ```bash
   bun test
   ```

5. **Run quality checks**
   ```bash
   bun run quality
   ```

## Project Structure

```
laag/
├── packages/
│   ├── core/          # Core utilities and base classes
│   ├── openapi/       # OpenAPI/Swagger support
│   ├── raml/          # RAML support (in development)
│   └── cli/           # Command-line interface
├── examples/          # Usage examples
├── scripts/           # Build and development scripts
└── docs/             # Documentation
```

## Development Workflow

### Making Changes

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style and patterns
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**

   ```bash
   # Run all tests
   bun test

   # Run quality checks
   bun run quality

   # Test compatibility
   bun run test:compatibility

   # Test integration
   bun run test:integration
   ```

4. **Build and validate**

   ```bash
   # Clean build
   bun run build:clean

   # Validate publishing setup
   bun run validate:publishing
   ```

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Code is automatically formatted with Prettier
- **Naming**: Use descriptive names and follow existing conventions
- **Comments**: Add JSDoc comments for public APIs

### Testing

- **Unit Tests**: Write unit tests for all new functionality
- **Integration Tests**: Add integration tests for complex features
- **Type Tests**: Ensure TypeScript types are correct
- **Examples**: Update examples when adding new features

### Documentation

- **README**: Update package READMEs for new features
- **JSDoc**: Add comprehensive JSDoc comments
- **Examples**: Provide working examples for new functionality
- **CHANGELOG**: Add entries to CHANGELOG.md

## Package Guidelines

### Core Package (`@laag/core`)

- Contains shared utilities and base classes
- Should have minimal dependencies
- Must be compatible with all other packages

### OpenAPI Package (`@laag/openapi`)

- Implements OpenAPI 3.0+ specification
- Should maintain backward compatibility when possible
- Must include comprehensive type definitions

### CLI Package (`@laag/cli`)

- Provides command-line interface
- Should be user-friendly with good error messages
- Must work across different platforms

## Submitting Changes

### Pull Request Process

1. **Ensure your branch is up to date**

   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Create a pull request**
   - Use a descriptive title
   - Include a detailed description of changes
   - Reference any related issues
   - Add screenshots for UI changes

3. **Address review feedback**
   - Respond to comments promptly
   - Make requested changes
   - Update tests and documentation as needed

### Pull Request Checklist

- [ ] Tests pass (`bun test`)
- [ ] Quality checks pass (`bun run quality`)
- [ ] Build succeeds (`bun run build`)
- [ ] Documentation updated
- [ ] CHANGELOG.md updated (if applicable)
- [ ] Examples updated (if applicable)

## Release Process

Releases are managed by maintainers using the automated release system:

```bash
# Patch release (bug fixes)
bun run release:patch

# Minor release (new features)
bun run release:minor

# Major release (breaking changes)
bun run release:major
```

## Getting Help

- **Issues**: Create an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our Discord server (link in README)

## Code of Conduct

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## License

By contributing to laag, you agree that your contributions will be licensed under the MIT License.
