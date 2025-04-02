import { describe, it, expect, vi, beforeEach } from 'vitest';
import inquirer from 'inquirer';
import { interactiveAction } from '@/commands/interactive';
import { logger } from '@/utils/logger';
import { getPackageJsonVersion } from '@/utils/package-helper';

// Mock dependencies
vi.mock('inquirer');
vi.mock('@/utils/logger');
vi.mock('@/utils/package-helper');

// Mock process.exit
const mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as () => never);

describe('interactive command', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    mockExit.mockClear();
  });

  it('should handle hello action with custom name', async () => {
    // Mock inquirer prompts
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ action: 'hello' });
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ name: 'John' });

    // Execute the command
    await interactiveAction();

    // Verify logger was called with correct message
    expect(logger.info).toHaveBeenCalledWith('Hello John!');
  });

  it('should handle hello action with default name', async () => {
    // Mock inquirer prompts
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ action: 'hello' });
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ name: 'World' });

    // Execute the command
    await interactiveAction();

    // Verify logger was called with correct message
    expect(logger.info).toHaveBeenCalledWith('Hello World!');
  });

  it('should handle version action', async () => {
    const mockVersion = '1.0.0';
    vi.mocked(getPackageJsonVersion).mockReturnValue(mockVersion);
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ action: 'version' });

    // Execute the command
    await interactiveAction();

    // Verify logger was called with correct version
    expect(logger.info).toHaveBeenCalledWith(`Current version: ${mockVersion}`);
  });

  it('should handle exit action', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ action: 'exit' });

    // Execute the command
    await interactiveAction();

    // Verify logger was called with goodbye message
    expect(logger.info).toHaveBeenCalledWith('Goodbye!');
  });

  it('should handle errors gracefully', async () => {
    // Mock inquirer to throw an error
    const testError = new Error('Test error');
    vi.mocked(inquirer.prompt).mockRejectedValueOnce(testError);

    // Execute the command
    await interactiveAction();

    // Verify error was logged
    expect(logger.error).toHaveBeenCalledWith('An error occurred: Test error');
    // Verify process.exit was called with code 1
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
