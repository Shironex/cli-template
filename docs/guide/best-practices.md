# Best Practices

This guide outlines best practices for developing CLI applications using our template. Follow these guidelines to create robust, user-friendly, and maintainable CLI tools.

## Project Structure

### Directory Organization

```
cli-template/
├── src/
│   ├── commands/        # Command implementations
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── index.ts        # Main entry point
├── tests/              # Test files
├── docs/              # Documentation
└── package.json       # Project configuration
```

### File Naming

- Use kebab-case for file names: `my-command.ts`
- Use PascalCase for type definitions: `CommandOptions.ts`
- Use camelCase for utility functions: `formatOutput.ts`

## Code Style

### TypeScript Usage

1. **Type Definitions**

   ```typescript
   // Define interfaces for command options
   interface BuildOptions {
     env: string;
     output: string;
     minify?: boolean;
   }

   // Use type annotations for function parameters
   export const buildCommand = new Command('build')
     .option('-e, --env <environment>', 'build environment')
     .action(async (options: BuildOptions) => {
       // Command implementation
     });
   ```

2. **Type Safety**

   ```typescript
   // Use type guards for runtime checks
   function isValidPort(port: unknown): port is number {
     return typeof port === 'number' && port > 0 && port < 65536;
   }

   // Use type assertions sparingly and only when necessary
   const value = someValue as string;
   ```

### Error Handling

1. **Consistent Error Format**

   ```typescript
   class CLIError extends Error {
     constructor(
       message: string,
       public code: number = 1
     ) {
       super(message);
       this.name = 'CLIError';
     }
   }

   // Usage
   throw new CLIError('Invalid configuration', 2);
   ```

2. **Error Recovery**
   ```typescript
   try {
     await riskyOperation();
   } catch (error) {
     if (error instanceof CLIError) {
       logger.error(`CLI Error: ${error.message}`);
     } else {
       logger.error('An unexpected error occurred:', error);
     }
     process.exit(error instanceof CLIError ? error.code : 1);
   }
   ```

## Command Design

### Command Structure

1. **Clear Descriptions**

   ```typescript
   export const command = new Command('build')
     .description('Build the project for production')
     .addHelpText(
       'after',
       `
       Examples:
         $ cli-template build
         $ cli-template build --env production
     `
     );
   ```

2. **Logical Grouping**

   ```typescript
   const program = new Command();

   // Group related commands
   const buildGroup = new Command('build').description('Build commands');

   buildGroup
     .command('dev')
     .description('Build for development')
     .action(async () => {
       // Implementation
     });

   buildGroup
     .command('prod')
     .description('Build for production')
     .action(async () => {
       // Implementation
     });
   ```

### User Experience

1. **Progress Feedback**

   ```typescript
   import { ora } from 'ora';

   const spinner = ora('Processing...').start();
   try {
     await longRunningTask();
     spinner.succeed('Completed successfully');
   } catch (error) {
     spinner.fail('Failed to complete');
     throw error;
   }
   ```

2. **Colorful Output**

   ```typescript
   import chalk from 'chalk';

   logger.info(chalk.blue('Starting process...'));
   logger.success(chalk.green('Operation completed'));
   logger.error(chalk.red('Error occurred'));
   ```

3. **Interactive Prompts**

   ```typescript
   import inquirer from 'inquirer';

   const { action } = await inquirer.prompt([
     {
       type: 'list',
       name: 'action',
       message: 'What would you like to do?',
       choices: ['build', 'test', 'deploy'],
     },
   ]);
   ```

## Testing

1. **Test Organization**

   ```typescript
   // Group related tests
   describe('build command', () => {
     it('should build in development mode', async () => {
       // Test implementation
     });

     it('should build in production mode', async () => {
       // Test implementation
     });
   });
   ```

2. **Mocking**

   ```typescript
   import { vi } from 'vitest';

   // Mock external dependencies
   vi.mock('@/utils/logger', () => ({
     logger: {
       info: vi.fn(),
       error: vi.fn(),
     },
   }));

   // Mock file system
   vi.mock('fs/promises', () => ({
     readFile: vi.fn(),
     writeFile: vi.fn(),
   }));
   ```

## Documentation

1. **Code Comments**

   ```typescript
   /**
    * Builds the project for the specified environment
    * @param options - Build configuration options
    * @throws {CLIError} If build fails
    */
   async function build(options: BuildOptions): Promise<void> {
     // Implementation
   }
   ```

2. **README Updates**
   - Keep installation instructions up to date
   - Document all available commands
   - Include usage examples
   - List dependencies and requirements

## Performance

1. **Async Operations**

   ```typescript
   // Use Promise.all for parallel operations
   await Promise.all([task1(), task2(), task3()]);

   // Use async/await for sequential operations
   const result1 = await task1();
   const result2 = await task2(result1);
   ```

2. **Resource Cleanup**
   ```typescript
   // Use try/finally for cleanup
   const tempFile = await createTempFile();
   try {
     await processFile(tempFile);
   } finally {
     await cleanupTempFile(tempFile);
   }
   ```

## Security

1. **Input Validation**

   ```typescript
   function validateInput(input: string): boolean {
     // Implement proper validation
     return /^[a-zA-Z0-9-]+$/.test(input);
   }
   ```

2. **Sensitive Data**
   ```typescript
   // Use environment variables for sensitive data
   const apiKey = process.env.API_KEY;
   if (!apiKey) {
     throw new CLIError('API key not found');
   }
   ```

## Deployment

1. **Version Management**

   ```typescript
   // Use semantic versioning
   program.version('1.0.0', '-v, --version');
   ```

2. **Build Process**
   ```json
   {
     "scripts": {
       "build": "tsc",
       "test": "vitest",
       "lint": "eslint . --ext .ts",
       "format": "prettier --write \"src/**/*.ts\""
     }
   }
   ```

## Next Steps

- [Basic Commands](./basic-commands) - Learn how to create CLI commands
- [Interactive Mode](./interactive-mode) - Add interactive features
- [Testing](./testing) - Set up your test suite
