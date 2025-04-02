# Interactive Mode

The CLI Template includes built-in support for interactive mode using Inquirer.js. This guide will show you how to use and create interactive commands.

## Using Interactive Mode

To start the interactive mode, run:

```bash
cli-template interactive
```

This will present you with a menu of available actions:

- Say hello (with a name prompt)
- Show version
- Exit

## Creating Interactive Commands

Here's how to create your own interactive command:

1. Create a new command file in `src/commands/`:

```typescript
import { Command } from 'commander';
import inquirer from 'inquirer';
import { logger } from '@/utils/logger';

export async function myInteractiveAction() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: 'Option 1', value: 'option1' },
          { name: 'Option 2', value: 'option2' },
          { name: 'Exit', value: 'exit' },
        ],
      },
    ]);

    switch (answers.action) {
      case 'option1':
        // Handle option 1
        logger.info('Option 1 selected');
        break;
      case 'option2':
        // Handle option 2
        logger.info('Option 2 selected');
        break;
      case 'exit':
        logger.info('Goodbye!');
        break;
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`An error occurred: ${error.message}`);
    } else {
      logger.error(`An error occurred: ${error}`);
    }
    process.exit(1);
  }
}

export const myInteractiveCommand = new Command('my-interactive')
  .description('Start my interactive mode')
  .action(myInteractiveAction);
```

2. Add the command to your main program in `src/index.ts`:

```typescript
import { myInteractiveCommand } from './commands/my-interactive';

// ... existing code ...

program.addCommand(myInteractiveCommand);
```

## Testing Interactive Commands

Here's how to test your interactive command:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import inquirer from 'inquirer';
import { myInteractiveAction } from '@/commands/my-interactive';
import { logger } from '@/utils/logger';

// Mock dependencies
vi.mock('inquirer');
vi.mock('@/utils/logger');

// Mock process.exit
const mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as () => never);

describe('my interactive command', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockExit.mockClear();
  });

  it('should handle option1', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ action: 'option1' });

    await myInteractiveAction();

    expect(logger.info).toHaveBeenCalledWith('Option 1 selected');
  });

  it('should handle option2', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ action: 'option2' });

    await myInteractiveAction();

    expect(logger.info).toHaveBeenCalledWith('Option 2 selected');
  });

  it('should handle exit', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ action: 'exit' });

    await myInteractiveAction();

    expect(logger.info).toHaveBeenCalledWith('Goodbye!');
  });

  it('should handle errors gracefully', async () => {
    const testError = new Error('Test error');
    vi.mocked(inquirer.prompt).mockRejectedValueOnce(testError);

    await myInteractiveAction();

    expect(logger.error).toHaveBeenCalledWith('An error occurred: Test error');
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
```

## Best Practices

1. **Error Handling**: Always wrap your interactive logic in a try-catch block and handle errors appropriately.
2. **Exit Options**: Provide an exit option in your interactive menus.
3. **Clear Messages**: Use clear and descriptive messages for prompts and feedback.
4. **Type Safety**: Use TypeScript interfaces for your prompt answers.
5. **Testing**: Write comprehensive tests for all interactive flows.

## Next Steps

- [Basic Commands](./basic-commands) - Learn more about creating CLI commands
- [Testing](./testing) - Learn more about testing your CLI
- [Best Practices](./best-practices) - Tips for CLI development
