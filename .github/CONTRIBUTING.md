# Contributing to laag

Thank you for your interest in contributing to laag! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites
- [Bun](https://bun.sh/) (latest version)
- [Node.js](https://nodejs.org/) (18.0.0 or higher)
- [Git](https://git-scm.com/)

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/laag.git
   cd laag
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

4. Run the build to ensure everything works:
   ```bash
   bun run build
   ```

5. Run tests:
   ```bash
   bun test
   ```

## Development Workflow

### Project Structure
```
laag/
├── packages/           # Individual packages
│   ├── core/          # Core utilities and base classes
│   ├── openapi/       # OpenAPI/Swagger support
│   ├── raml/          # RAML support
│   └── smithy/        # Smithy support (planned)
├── scripts/           # Build and utility scripts
└── .github/           # GitHub workflows and templates
```

### Available Scripts

- `bun run build` - Build all packages
- `bun run build:core` - Build only the core package
- `bun run build:openapi` - Build only the OpenAPI package
- `bun run dev` - Start development mode with watch
- `bun test` - Run all tests
- `bun run lint` - Run ESLint
- `bun run format` - Format code with Prettier
- `bun run quality` - Run all quality checks
- `bun run type-check` - Run TypeScript type checking

### Making Changes

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards
3. Add or update tests as needed
4. Run quality checks:
   ```bash
   bun run quality
   bun test
   ```

5. Commit your changes with a descriptive message:
   ```bash
   git commit -m "feat(openapi): add new validation method"
   ```

6. Push to your fork and create a pull request

### Commit Message Format

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes

**Scopes:**
- `core`: Changes to @laag/core
- `openapi`: Changes to @laag/openapi
- `raml`: Changes to @laag/raml
- `smithy`: Changes to @laag/smithy

## Code Standards

### TypeScript Guidelines
- Use strict TypeScript configuration
- Provide explicit return types for public methods
- Use meaningful variable and function names
- Document complex logic with comments
- Prefer composition over inheritance
- Use readonly arrays and objects where appropriate

### Testing Guidelines
- Write tests for all new functionality
- Maintain or improve test coverage
- Use descriptive test names
- Group related tests with `describe` blocks
- Test both success and error cases
- Mock external dependencies

### Documentation Guidelines
- Update README files when adding new features
- Add JSDoc comments for public APIs
- Include code examples in documentation
- Keep documentation up to date with code changes

## Package-Specific Guidelines

### @laag/core
- Contains shared utilities and base classes
- Must maintain backward compatibility
- Changes here affect all other packages

### @laag/openapi
- Follows OpenAPI 3.0+ specification
- Must support both reading and writing operations
- Should handle validation and error reporting

### @laag/raml
- Follows RAML 1.0 specification
- Should maintain API compatibility with OpenAPI package where possible

## Pull Request Process

1. Ensure your PR has a clear title and description
2. Link any related issues
3. Ensure all CI checks pass
4. Request review from maintainers
5. Address any feedback promptly
6. Squash commits if requested

## Release Process

Releases are handled by maintainers using semantic versioning:
- **Patch** (x.x.1): Bug fixes
- **Minor** (x.1.x): New features (backward compatible)
- **Major** (1.x.x): Breaking changes

## Getting Help

- Check existing [issues](https://github.com/bschwarz/laag/issues)
- Create a new issue for bugs or feature requests
- Join discussions in existing issues
- Review the documentation and examples

## Code of Conduct

Please be respectful and constructive in all interactions. We're all here to make laag better!

## License

By contributing to laag, you agree that your contributions will be licensed under the MIT License.