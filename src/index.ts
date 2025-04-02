#!/usr/bin/env node

import { Command } from 'commander';
import { getPackageJsonVersion } from './utils/package-helper.js';
import { logger } from './utils/logger.js';
import { interactiveCommand } from './commands/interactive.js';

const program = new Command();

program
  .name('cli-template')
  .description('A template for creating CLI applications')
  .version(getPackageJsonVersion());

program
  .command('hello')
  .description('Say hello to someone')
  .argument('[name]', 'Name of the person to greet', 'World')
  .option('-c, --capitalize', 'Capitalize the greeting')
  .action((name, options) => {
    let greeting = `Hello ${name}!`;
    if (options.capitalize) {
      greeting = greeting.toUpperCase();
    }
    logger.info(greeting);
  });

program.addCommand(interactiveCommand);

program.parse(process.argv);
