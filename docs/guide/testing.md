# Testing

The CLI Template uses Vitest for testing. This guide will show you how to write and run tests for your CLI commands.

## Running Tests

The template includes several test commands:

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Generate test coverage report
pnpm test:coverage
```

## Writing Tests

### Basic Test Structure

Here's a basic example of how to write a test:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { myCommand } from '@/commands/my-command';
import { logger } from '@/utils/logger';

// Mock dependencies
vi.mock('@/utils/logger');

describe('my command', () => {
  it('should do something', () => {
    // Arrange
    const args = ['arg1', 'arg2'];
    const options = { flag: true };

    // Act
    myCommand.action(args, options);

    // Assert
    expect(logger.info).toHaveBeenCalledWith('Expected output');
  });
});
```

### Testing Commands with Arguments

When testing commands that accept arguments and options:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { Command } from 'commander';
import { myCommand } from '@/commands/my-command';

describe('my command', () => {
  it('should handle arguments correctly', () => {
    const program = new Command();
    program.addCommand(myCommand);

    // Test with arguments
    program.parse(['node', 'cli', 'my-command', 'arg1', 'arg2', '--flag']);

    // Assert the command was executed with correct arguments
    expect(myCommand.action).toHaveBeenCalledWith(['arg1', 'arg2'], { flag: true });
  });
});
```

### Testing Interactive Commands

For interactive commands using Inquirer:

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

  it('should handle user input', async () => {
    // Mock inquirer prompt
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      action: 'someAction',
      value: 'testValue',
    });

    // Execute the command
    await myInteractiveAction();

    // Verify the output
    expect(logger.info).toHaveBeenCalledWith('Expected output');
  });

  it('should handle errors', async () => {
    // Mock inquirer to throw an error
    vi.mocked(inquirer.prompt).mockRejectedValueOnce(new Error('Test error'));

    // Execute the command
    await myInteractiveAction();

    // Verify error handling
    expect(logger.error).toHaveBeenCalledWith('An error occurred: Test error');
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
```

### Testing Async Operations

For commands that perform async operations:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { asyncCommand } from '@/commands/async-command';

describe('async command', () => {
  it('should handle async operations', async () => {
    // Mock async operation
    vi.mock('@/utils/api', () => ({
      fetchData: vi.fn().mockResolvedValue({ data: 'test' }),
    }));

    // Execute the command
    await asyncCommand.action();

    // Verify the result
    expect(logger.info).toHaveBeenCalledWith('Operation completed');
  });
});
```

## Test Coverage

The template includes test coverage reporting. Run:

```bash
pnpm test:coverage
```

This will generate:

- A text report in the console
- A JSON report in `coverage/coverage-final.json`
- An HTML report in `coverage/index.html`

## Best Practices

1. **Mock External Dependencies**: Always mock external dependencies like file system, network requests, and user input.
2. **Test Error Cases**: Include tests for error conditions and edge cases.
3. **Use beforeEach**: Reset mocks and test state before each test.
4. **Test Command Structure**: Test both the command registration and its action.
5. **Async Testing**: Use async/await for testing asynchronous operations.
6. **Coverage Goals**: Aim for high test coverage, especially for critical paths.

## Next Steps

- [Basic Commands](./basic-commands) - Learn how to create CLI commands
- [Interactive Mode](./interactive-mode) - Add interactive prompts to your CLI
- [Best Practices](./best-practices) - Tips for CLI development
