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
          { name: 'Display table examples', value: 'table' },
          { name: 'Show progress bar demo', value: 'progress' },
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
      case 'table': {
        const tableStyleAnswer = await inquirer.prompt([
          {
            type: 'list',
            name: 'style',
            message: 'Which table style would you like to see?',
            choices: [
              { name: 'Simple table', value: 'simple' },
              { name: 'Complex table with colors', value: 'complex' },
              { name: 'Custom styled table', value: 'custom' },
              { name: 'All examples', value: 'all' },
            ],
          },
        ]);
        const { tableAction } = await import('./table.js');
        await tableAction({ style: tableStyleAnswer.style });
        break;
      }
      case 'progress': {
        const progressTypeAnswer = await inquirer.prompt([
          {
            type: 'list',
            name: 'type',
            message: 'Which progress bar type would you like to see?',
            choices: [
              { name: 'Simple progress bar', value: 'simple' },
              { name: 'Custom styled progress bar', value: 'custom' },
              { name: 'Multiple progress bars', value: 'multi' },
              { name: 'All examples', value: 'all' },
            ],
          },
        ]);
        const { progressAction } = await import('./progress.js');
        await progressAction({ type: progressTypeAnswer.type });
        break;
      }
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
