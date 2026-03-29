# Individual Package Releases

This document explains how to create separate releases for individual packages in the laag monorepo.

## Overview

The laag monorepo supports both unified releases (all packages together) and individual package releases. This allows you to:

- Release bug fixes for specific packages without affecting others
- Maintain independent versioning for each package
- Release new features incrementally
- Handle different release cycles for different packages

## Available Packages

- **@laag/core** - Core utilities and base classes
- **@laag/openapi** - OpenAPI/Swagger document library  
- **@laag/raml** - RAML document library
- **@laag/cli** - Command-line interface

## Release Methods

### 1. Command Line (Recommended)

#### Using the Individual Package Release Script

```bash
# Release with version bump (will prompt for OTP)
bun run scripts/release-package.ts @laag/openapi --patch
bun run scripts/release-package.ts @laag/openapi --minor
bun run scripts/release-package.ts @laag/openapi --major

# Release with specific version
bun run scripts/release-package.ts @laag/openapi --version=2.1.0

# Release with prerelease version and beta tag
bun run scripts/release-package.ts @laag/openapi --prerelease --tag=beta

# Release with OTP provided directly
bun run scripts/release-package.ts @laag/openapi --patch --otp=123456

# Dry run (test without publishing)
bun run scripts/release-package.ts @laag/openapi --patch --dry-run
```

#### Using NPM Scripts (Shortcuts)

```bash
# OpenAPI package releases
bun run release:openapi:patch    # Patch version bump
bun run release:openapi:minor    # Minor version bump  
bun run release:openapi:major    # Major version bump
bun run release:openapi          # Current version

# Core package releases
bun run release:core:patch
bun run release:core:minor
bun run release:core:major
bun run release:core

# RAML package releases
bun run release:raml:patch
bun run release:raml:minor
bun run release:raml:major
bun run release:raml

# CLI package releases
bun run release:cli:patch
bun run release:cli:minor
bun run release:cli:major
bun run release:cli
```

### 2. GitHub Actions (Web Interface)

1. Go to the **Actions** tab in the GitHub repository
2. Select **"Release Individual Package"** workflow
3. Click **"Run workflow"**
4. Fill in the form:
   - **Package**: Select the package to release
   - **Version Type**: Choose patch, minor, major, or prerelease
   - **Custom Version**: (Optional) Specify exact version
   - **NPM Tag**: Choose latest, beta, or alpha
   - **Dry Run**: Check to test without publishing

### 3. Using the General Release Script

```bash
# Release specific packages (will prompt for OTP)
bun run scripts/release.ts --packages=@laag/openapi --version=2.1.0
bun run scripts/release.ts --packages=@laag/openapi,@laag/core --patch

# Release with OTP provided directly
bun run scripts/release.ts --packages=@laag/openapi --version=2.1.0 --otp=123456

# Multiple packages with different versions (not recommended)
bun run scripts/release.ts --packages=@laag/openapi --independent
```

## Release Process

Each individual package release follows this process:

1. **Validation**: Checks package.json structure, exports, and metadata
2. **Version Update**: Bumps version according to specified type
3. **Testing**: Runs package-specific tests
4. **Building**: Builds the package and its dependencies
5. **Publishing**: Publishes to NPM with specified tag
6. **Tagging**: Creates Git tag for the release
7. **GitHub Release**: Creates GitHub release with changelog

## Dependency Management

The release system handles dependencies automatically:

- **@laag/core** is built first (no dependencies)
- **@laag/openapi** depends on @laag/core (core is built first)
- **@laag/raml** depends on @laag/core (core is built first)
- **@laag/cli** depends on @laag/openapi (both core and openapi are built)

## Version Management

### Independent Versioning

Each package maintains its own version number:

```json
{
  "@laag/core": "2.0.1",
  "@laag/openapi": "2.1.0", 
  "@laag/raml": "1.0.0",
  "@laag/cli": "1.2.0"
}
```

### Workspace Dependencies

Packages use `workspace:*` for internal dependencies, which are automatically resolved during publishing:

```json
{
  "dependencies": {
    "@laag/core": "workspace:*"
  }
}
```

This becomes:

```json
{
  "dependencies": {
    "@laag/core": "^2.0.1"
  }
}
```

## Release Tags

### NPM Tags

- **latest** (default): Stable releases
- **beta**: Beta releases for testing
- **alpha**: Alpha releases for early testing

```bash
# Install specific tag
npm install @laag/openapi@beta
npm install @laag/openapi@alpha
```

### Git Tags

Git tags follow the format: `{package-name}@{version}`

Examples:
- `@laag/openapi@2.1.0`
- `@laag/core@2.0.1`
- `@laag/cli@1.2.0`

## Best Practices

### When to Use Individual Releases

✅ **Good for:**
- Bug fixes in specific packages
- New features that don't affect other packages
- Different release cycles for different packages
- Emergency patches

❌ **Avoid for:**
- Breaking changes that affect multiple packages
- Major API changes across the ecosystem
- Initial releases (use unified release)

### Version Bumping Guidelines

- **Patch** (x.y.Z): Bug fixes, documentation updates
- **Minor** (x.Y.z): New features, backward compatible
- **Major** (X.y.z): Breaking changes, API changes
- **Prerelease** (x.y.z-alpha.N): Development versions

### Release Checklist

Before releasing an individual package:

1. ✅ Ensure all tests pass
2. ✅ Update documentation if needed
3. ✅ Check dependencies are up to date
4. ✅ Verify no breaking changes (unless major release)
5. ✅ Test in isolation if possible
6. ✅ Consider impact on dependent packages

## Examples

### Scenario 1: Bug Fix in OpenAPI Package

```bash
# Fix bug in @laag/openapi
# Test the fix
bun test packages/openapi

# Release patch version
bun run release:openapi:patch

# Result: @laag/openapi@2.0.1 published
```

### Scenario 2: New Feature in CLI

```bash
# Add new feature to @laag/cli
# Test the feature
bun test packages/cli

# Release minor version
bun run release:cli:minor

# Result: @laag/cli@1.3.0 published
```

### Scenario 3: Beta Release for Testing

```bash
# Create beta version for testing
bun run scripts/release-package.ts @laag/openapi --prerelease --tag=beta

# Users can install with:
# npm install @laag/openapi@beta
```

### Scenario 4: Emergency Patch

```bash
# Critical bug fix needed immediately
bun run scripts/release-package.ts @laag/openapi --patch --skip-tests

# Result: Quick patch release without full test suite
```

## Troubleshooting

### Common Issues

1. **Dependency Build Failures**
   ```bash
   # Build dependencies manually first
   bun run build:core
   bun run build:openapi
   ```

2. **Version Conflicts**
   ```bash
   # Check current versions
   bun run scripts/release-package.ts @laag/openapi --info
   ```

3. **NPM Authentication**
   ```bash
   # Ensure NPM token is set
   npm whoami
   ```

4. **Git Tag Conflicts**
   ```bash
   # Check existing tags
   git tag -l "@laag/openapi@*"
   ```

### Getting Help

- Check the [main release documentation](RELEASES.md)
- Review package-specific READMEs
- Open an issue for release-related problems
- Use `--dry-run` to test releases safely

## NPM 2FA and OTP Requirements

All releases require NPM 2FA (Two-Factor Authentication). The release script will automatically prompt for your OTP (One-Time Password) code.

### Interactive OTP Prompt

When running any release command, you'll see:

```
🔐 NPM requires 2FA authentication for publishing.
Please check your authenticator app for the OTP code.
Enter your NPM OTP (6-digit code): ______
```

### Providing OTP Directly

You can provide the OTP code directly to avoid the prompt:

```bash
# Provide OTP directly
bun run scripts/release.ts --packages=@laag/openapi --otp=123456

# Or with individual package script
bun run scripts/release-package.ts @laag/openapi --patch --otp=123456
```

### CI/Automated Environments

For CI environments where interactive prompts aren't possible:

```bash
# Skip OTP prompting (requires NPM_TOKEN with automation token)
bun run scripts/release.ts --packages=@laag/openapi --skip-otp

# Or set OTP via environment variable
OTP_CODE=123456 bun run scripts/release.ts --packages=@laag/openapi --otp=$OTP_CODE
```

### OTP Error Handling

If your OTP expires or is incorrect, the script will:

1. Detect the OTP error
2. Prompt for a new OTP code
3. Automatically retry the publish
4. Continue with remaining packages

### Setting Up NPM 2FA

If you haven't set up 2FA yet:

```bash
# Enable 2FA for your NPM account
npm profile enable-2fa auth-and-writes

# Use an authenticator app like:
# - Google Authenticator
# - Authy
# - 1Password
# - Microsoft Authenticator
```

## Security Considerations

- **NPM 2FA is required** for all publishing operations
- NPM tokens should be stored securely
- Use automation tokens for CI environments
- Verify package contents before publishing
- Monitor for unauthorized releases
- Use provenance for supply chain security
- Keep your authenticator app secure and backed up

## Monitoring Releases

### NPM Registry

```bash
# Check published versions
npm view @laag/openapi versions --json
npm info @laag/openapi
```

### GitHub Releases

- Monitor the [Releases page](https://github.com/bschwarz/laag/releases)
- Set up notifications for new releases
- Review release notes and changelogs

### Download Statistics

```bash
# Check download stats
npm info @laag/openapi
```