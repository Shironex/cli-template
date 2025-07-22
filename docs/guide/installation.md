# Installation

This guide will help you set up the CLI Template for your project.

## Prerequisites

Before you begin, make sure you have:

- Node.js (version 20 or higher)
- pnpm (version 9.12.3 or higher)
- Git

## Getting Started

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

   This will allow you to use your CLI directly from the command line:

   ```bash
   cli-template interactive
   ```

   Instead of:

   ```bash
   pnpm dev
   ```

5. Start development:

   ```bash
   # If linked globally:
   cli-template interactive

   # If not linked:
   pnpm dev
   ```

## Development Commands

The template includes several useful development commands:

- `pnpm dev` - Start development mode with interactive command
- `pnpm build` - Build the CLI for production
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Generate test coverage report
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm docs:dev` - Start documentation development server
- `pnpm link --global` - Link the CLI globally for development
- `pnpm unlink --global` - Unlink the CLI from global installation

## Project Structure

```
my-cli/
├── src/
│   ├── commands/     # CLI commands
│   ├── utils/        # Utility functions
│   │── lib/          # Main logic folder
│   └── index.ts      # Main entry point
├── tests/            # Test files
├── docs/             # Documentation
├── package.json      # Project configuration
├── tsconfig.json     # TypeScript configuration
├── vitest.config.ts  # Vitest configuration
└── tsup.config.ts    # Build configuration
```

## Next Steps

- [Basic Commands](./basic-commands) - Learn how to create and use commands
- [Interactive Mode](./interactive-mode) - Add interactive prompts to your CLI
- [Testing](./testing) - Write and run tests for your commands
- [Best Practices](./best-practices) - Tips for CLI development
