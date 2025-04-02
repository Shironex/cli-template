# CLI Template

A template for creating CLI applications with TypeScript, featuring:

- TypeScript support
- Commander.js for CLI argument parsing
- Vitest for testing
- ESLint and Prettier for code formatting
- Husky for git hooks
- Commitlint for commit message linting
- Semantic Release for versioning

## Installation

```bash
pnpm install
```

## Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test
pnpm test:watch
pnpm test:coverage

# Build
pnpm build

# Format code
pnpm format
```

## Usage

This template provides a basic CLI structure with a sample command:

```bash
# Say hello to the world
cli-template hello

# Say hello to a specific person
cli-template hello John

# Say hello in capital letters
cli-template hello --capitalize
```

## Available Commands

- `hello [name]` - Say hello to someone (defaults to "World")
  - Options:
    - `-c, --capitalize` - Capitalize the greeting

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
