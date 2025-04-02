# Contributing to CLI Template

Thank you for your interest in contributing to CLI Template! This document provides guidelines and instructions to help you contribute effectively to this project.

## Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/cli-template.git
   cd cli-template
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Link the CLI locally**

   ```bash
   pnpm link --global
   ```

4. **Run in development mode**
   ```bash
   cli-template interactive
   ```

## Project Structure

```
cli-template/
├── src/
│   ├── commands/     # CLI commands implementation
│   ├── utils/        # Utility functions
│   ├── types/        # TypeScript type definitions
│   └── index.ts      # Main entry point
├── tests/            # Test files
├── docs/             # Documentation
└── package.json      # Project configuration
```

## Coding Standards

- Follow the existing code style and formatting
- Use TypeScript for all new code
- Write clear, descriptive comments
- Include proper error handling
- Follow the best practices outlined in our [Best Practices](./best-practices) guide

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This means all commit messages should be structured as follows:

```
<type>[optional scope]: <description>
```

### Common Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.; no code change)
- **refactor**: Code refactoring (no feature change, no bug fix)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependencies updates, etc.

### Examples

```
feat(commands): add new build command
fix: resolve interactive mode error
docs: update installation instructions
```

### Using Commitizen

To make it easier to follow this format, you can use Commitizen:

```bash
pnpm commit
```

This will guide you through creating a properly formatted commit message.

## Pull Request Process

1. **Create a new branch** for your feature or bug fix

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them using the conventional commits format

3. **Run tests** to ensure your changes don't break existing functionality

   ```bash
   pnpm test
   ```

4. **Push your branch** to your fork

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** against the `main` branch of the original repository

### Pull Request Guidelines

When opening a pull request, please:

- Use a clear, descriptive title following the Conventional Commits format
- Reference any related issues using the GitHub issue number
- Fill out the pull request template completely
- Keep your PR focused on a single topic to streamline the review process
- Be responsive to feedback and questions

## Types of Contributions

### Bug Fixes

- Clearly describe the bug in the pull request description
- Include steps to reproduce the bug
- Explain how your solution fixes the issue

### New Features

- Discuss major new features in an issue before implementing
- Include tests for new functionality
- Update documentation to reflect new features

### Documentation

- Ensure documentation is clear, accurate, and comprehensive
- Check for spelling and grammar errors
- Follow the existing documentation style

## Testing

- Write tests for all new features and bug fixes
- Run the existing test suite before submitting a pull request
- Aim for high test coverage for critical code paths

```bash
pnpm test          # Run all tests
pnpm test:watch    # Run tests in watch mode
pnpm test:coverage # Check test coverage
```

## Code Review Process

- All submissions require review
- Maintainers will review your PR as soon as possible
- Address all feedback and requested changes
- Your PR must pass CI checks before it can be merged

## License

By contributing to CLI Template, you agree that your contributions will be licensed under the project's MIT License.

## Questions?

If you have any questions about contributing, feel free to open an issue or reach out to the maintainers.

Thank you for contributing to CLI Template!
