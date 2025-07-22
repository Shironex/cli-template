# CLI Template

A modern template for building command-line applications with TypeScript, Commander.js, and best practices.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/Shironex/cli-template/actions/workflows/test.yml/badge.svg)](https://github.com/Shironex/cli-template/actions/workflows/test.yml)
[![CodeQL](https://github.com/Shironex/cli-template/actions/workflows/codeql.yml/badge.svg)](https://github.com/Shironex/cli-template/actions/workflows/codeql.yml)
[![Release](https://github.com/Shironex/cli-template/actions/workflows/release.yml/badge.svg)](https://github.com/Shironex/cli-template/actions/workflows/release.yml)

## Features

- 🚀 **Modern Stack**: Built with TypeScript, Commander.js, and modern development tools
- 📦 **Ready to Use**: Pre-configured with essential dependencies and development tools
- 🧪 **Testing Setup**: Includes Vitest for unit testing and test coverage reporting
- 📝 **Code Quality**: ESLint, Prettier, and TypeScript for code quality and consistency
- 🔄 **CI/CD Ready**: GitHub Actions workflow for automated testing and releases
- 📚 **Documentation**: VitePress documentation with guides and examples
- 🔧 **Interactive Mode**: Built-in support for interactive CLI commands
- 🛡️ **Type Safety**: Full TypeScript support with strict type checking

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/Shironex/cli-template.git my-cli
   cd my-cli
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Update package.json:
   - Change the `name` field to your CLI name
   - Update the `description` field
   - Update the `author` field
   - Update the `bin` field if you want to change the command name

4. Link the CLI globally (optional but recommended for development):

   ```bash
   pnpm link --global
   ```

5. Start development:

   ```bash
   # If linked globally:
   cli-template interactive

   # If not linked:
   pnpm dev
   ```

## Development Commands

```bash
# Start development mode
pnpm dev

# Build the CLI
pnpm build

# Run tests
pnpm test
pnpm test:watch    # Run tests in watch mode
pnpm test:coverage # Generate test coverage report

# Code quality
pnpm lint          # Run ESLint
pnpm format        # Format code with Prettier

# Documentation
pnpm docs:dev      # Start documentation development server

# Development
pnpm link --global    # Link CLI globally
pnpm unlink --global  # Unlink CLI from global installation
```

## Project Structure

```
cli-template/
├── src/
│   ├── commands/     # CLI commands
│   ├── utils/        # Utility functions
│   ├── types/        # TypeScript type definitions
│   └── index.ts      # Main entry point
├── tests/            # Test files
├── docs/             # Documentation
├── package.json      # Project configuration
├── tsconfig.json     # TypeScript configuration
├── vitest.config.ts  # Vitest configuration
└── tsup.config.ts    # Build configuration
```

## Documentation

Visit our [documentation](https://shironex.github.io/cli-template/) for detailed guides:

- [Getting Started](https://shironex.github.io/cli-template/guide/)
- [Installation](https://shironex.github.io/cli-template/guide/installation)
- [Basic Commands](https://shironex.github.io/cli-template/guide/basic-commands)
- [Interactive Mode](https://shironex.github.io/cli-template/guide/interactive-mode)
- [Testing](https://shironex.github.io/cli-template/guide/testing)
- [API Reference](https://shironex.github.io/cli-template/guide/api)
- [Best Practices](https://shironex.github.io/cli-template/guide/best-practices)

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://shironex.github.io/cli-template/guide/contributing) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Commander.js](https://github.com/tj/commander.js) - The complete solution for node.js command-line interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Vitest](https://vitest.dev/) - A Vite-native unit test framework
- [VitePress](https://vitepress.dev/) - Vite & Vue Powered Static Site Generator

## Support

If you encounter any issues or have questions, please:

1. Check our [documentation](https://shironex.github.io/cli-template/)
2. Look for similar issues in our [GitHub Issues](https://github.com/Shironex/cli-template/issues)
3. Open a new issue if needed

## Roadmap

- [ ] Add more example commands
- [ ] Add performance benchmarking
- [ ] Add more interactive mode features
- [ ] Add plugin system
- [ ] Add more test utilities

## Credits

Created and maintained by [Shironex](https://github.com/Shironex)
