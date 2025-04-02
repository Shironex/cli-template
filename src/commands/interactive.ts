import { Command } from 'commander';
import inquirer from 'inquirer';
import { logger } from '../utils/logger.js';

export async function interactiveAction() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: 'Say hello', value: 'hello' },
          { name: 'Show version', value: 'version' },
          { name: 'Exit', value: 'exit' },
        ],
      },
    ]);

    switch (answers.action) {
      case 'hello':
        const nameAnswer = await inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            default: 'World',
          },
        ]);
        logger.info(`Hello ${nameAnswer.name}!`);
        break;
      case 'version':
        const { getPackageJsonVersion } = await import('../utils/package-helper.js');
        logger.info(`Current version: ${getPackageJsonVersion()}`);
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

export const interactiveCommand = new Command('interactive')
  .description('Start interactive mode')
  .action(interactiveAction);
