# API Reference

This guide provides detailed documentation for the utility functions and types available in the CLI template.

## Utility Functions

### Logger

The template includes a built-in logger utility:

```typescript
import { logger } from '@/utils/logger';

// Log levels
logger.info('Information message');
logger.success('Success message');
logger.warn('Warning message');
logger.error('Error message');
logger.debug('Debug message');

// With formatting
logger.info('Hello %s!', 'World');

// With objects
logger.info('User data:', { id: 1, name: 'John' });
```

### Package Helper

Utilities for working with package.json:

```typescript
import { getPackageJsonVersion } from '@/utils/package-helper';

// Get package version
const version = getPackageJsonVersion();
```

## Type Definitions

### Command Options

```typescript
interface CommandOptions {
  env?: string;
  debug?: boolean;
  verbose?: boolean;
  output?: string;
}
```

### Interactive Options

```typescript
interface InteractiveOptions {
  name?: string;
  action?: string;
  value?: string;
  confirm?: boolean;
}
```

### Error Types

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

class ValidationError extends CLIError {
  constructor(message: string) {
    super(message, 2);
    this.name = 'ValidationError';
  }
}

class ConfigurationError extends CLIError {
  constructor(message: string) {
    super(message, 3);
    this.name = 'ConfigurationError';
  }
}
```

## Common Patterns

### Command Creation

```typescript
import { Command } from 'commander';
import { logger } from '@/utils/logger';

export const createCommand = (name: string, description: string) => {
  return new Command(name).description(description).action(async (options: CommandOptions) => {
    try {
      // Command implementation
      logger.info(`Executing ${name} command`);
    } catch (error) {
      logger.error(`Error in ${name} command:`, error);
      process.exit(1);
    }
  });
};
```

### Interactive Prompt

```typescript
import inquirer from 'inquirer';
import { logger } from '@/utils/logger';

export const createInteractivePrompt = async (options: InteractiveOptions) => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter your name:',
        default: options.name,
      },
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['build', 'test', 'deploy'],
        default: options.action,
      },
    ]);
    return answers;
  } catch (error) {
    logger.error('Error in interactive prompt:', error);
    throw error;
  }
};
```

## Next Steps

- [Basic Commands](./basic-commands) - Learn how to create CLI commands
- [Interactive Mode](./interactive-mode) - Add interactive prompts
- [Testing](./testing) - Set up your test suite
- [Best Practices](./best-practices) - Tips for CLI development
