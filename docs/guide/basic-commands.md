# Basic Commands

This guide will show you how to create and use basic commands in your CLI application using Commander.js.

## Command Structure

A basic command in the CLI template follows this structure:

```typescript
import { Command } from 'commander';
import { logger } from '@/utils/logger';

export const myCommand = new Command('my-command')
  .description('Description of what the command does')
  .argument('<name>', 'description of the argument')
  .option('-f, --flag', 'description of the flag')
  .action(async (name, options) => {
    try {
      // Command logic here
      logger.info(`Hello, ${name}!`);
    } catch (error) {
      logger.error('An error occurred:', error);
      process.exit(1);
    }
  });
```

## Command Registration

Commands are registered in your main CLI file:

```typescript
import { Command } from 'commander';
import { myCommand } from '@/commands/my-command';

const program = new Command();

program.name('cli-template').description('CLI template description').version('1.0.0');

program.addCommand(myCommand);
program.parse();
```

## Command Types

### Simple Command

A command that just performs an action:

```typescript
import { Command } from 'commander';
import { logger } from '@/utils/logger';

export const helloCommand = new Command('hello')
  .description('Say hello to someone')
  .argument('<name>', 'name to greet')
  .action(async name => {
    logger.info(`Hello, ${name}!`);
  });
```

### Command with Options

A command that accepts various options:

```typescript
import { Command } from 'commander';
import { logger } from '@/utils/logger';

export const configCommand = new Command('config')
  .description('Configure application settings')
  .option('-e, --env <environment>', 'environment to configure')
  .option('-p, --port <number>', 'port number')
  .action(async options => {
    logger.info(`Configuring for environment: ${options.env}`);
    logger.info(`Using port: ${options.port}`);
  });
```

### Command with Multiple Arguments

A command that accepts multiple arguments:

```typescript
import { Command } from 'commander';
import { logger } from '@/utils/logger';

export const copyCommand = new Command('copy')
  .description('Copy files from source to destination')
  .argument('<source>', 'source file or directory')
  .argument('<destination>', 'destination path')
  .option('-r, --recursive', 'copy recursively')
  .action(async (source, destination, options) => {
    logger.info(`Copying from ${source} to ${destination}`);
    if (options.recursive) {
      logger.info('Copying recursively');
    }
  });
```

## Command Features

### Required Arguments

Use angle brackets `<>` for required arguments:

```typescript
.argument('<name>', 'required argument')
```

### Optional Arguments

Use square brackets `[]` for optional arguments:

```typescript
.argument('[name]', 'optional argument')
```

### Variadic Arguments

Use `...` for variadic arguments:

```typescript
.argument('<files...>', 'one or more files')
```

### Command Options

Define options with short and long forms:

```typescript
.option('-f, --force', 'force the operation')
.option('-p, --port <number>', 'port number')
.option('-e, --env [environment]', 'environment', 'development')
```

### Command Hooks

Use hooks to run code before or after command execution:

```typescript
const command = new Command('my-command')
  .hook('preAction', () => {
    logger.info('Before command execution');
  })
  .hook('postAction', () => {
    logger.info('After command execution');
  });
```

## Error Handling

Always include proper error handling in your commands:

```typescript
import { Command } from 'commander';
import { logger } from '@/utils/logger';

export const safeCommand = new Command('safe')
  .description('A command with proper error handling')
  .action(async () => {
    try {
      // Command logic here
      await someAsyncOperation();
      logger.info('Operation successful');
    } catch (error) {
      logger.error('An error occurred:', error);
      process.exit(1);
    }
  });
```

## Command Help

Commander.js automatically generates help text for your commands:

```bash
# Show help for all commands
cli-template --help

# Show help for a specific command
cli-template my-command --help
```

## Best Practices

1. **Clear Descriptions**: Always provide clear, concise descriptions for commands and their arguments.
2. **Consistent Naming**: Use consistent naming conventions for commands and options.
3. **Error Handling**: Always include proper error handling and logging.
4. **Type Safety**: Use TypeScript types for command arguments and options.
5. **Async Support**: Use async/await for asynchronous operations.
6. **Helpful Messages**: Provide helpful error messages and usage examples.

## Next Steps

- [Interactive Mode](./interactive-mode) - Add interactive prompts to your commands
- [Testing](./testing) - Learn how to test your commands
- [Best Practices](./best-practices) - More tips for CLI development
