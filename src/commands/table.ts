import { Command } from 'commander';
import Table from 'cli-table3';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';

interface TableOptions {
  style?: string;
}

export async function tableAction(options: TableOptions): Promise<void> {
  try {
    const style = options.style || 'simple';

    switch (style) {
      case 'simple':
        showSimpleTable();
        break;
      case 'complex':
        showComplexTable();
        break;
      case 'custom':
        showCustomTable();
        break;
      case 'all':
        showSimpleTable();
        console.log('\n');
        showComplexTable();
        console.log('\n');
        showCustomTable();
        break;
      default:
        logger.error(`Unknown style: ${style}. Use: simple, complex, custom, or all`);
        process.exit(1);
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Failed to display table: ${error.message}`);
    } else {
      logger.error('An unknown error occurred');
    }
    process.exit(1);
  }
}

function showSimpleTable(): void {
  logger.info('Simple Table Example');

  const table = new Table({
    head: ['Name', 'Email', 'Role'],
    colWidths: [20, 30, 15],
  });

  table.push(
    ['John Doe', 'john@example.com', 'Developer'],
    ['Jane Smith', 'jane@example.com', 'Designer'],
    ['Bob Johnson', 'bob@example.com', 'Manager']
  );

  console.log(table.toString());
}

function showComplexTable(): void {
  logger.info('Complex Table with Stats');

  const table = new Table({
    head: [
      chalk.cyan('Package'),
      chalk.cyan('Version'),
      chalk.cyan('Downloads'),
      chalk.cyan('Status'),
    ],
  });

  table.push(
    ['commander', chalk.yellow('14.0.1'), chalk.green('50M+'), chalk.green('✓ Active')],
    ['chalk', chalk.yellow('5.6.2'), chalk.green('100M+'), chalk.green('✓ Active')],
    ['inquirer', chalk.yellow('12.10.0'), chalk.green('30M+'), chalk.green('✓ Active')],
    ['ora', chalk.yellow('9.0.0'), chalk.green('20M+'), chalk.green('✓ Active')]
  );

  console.log(table.toString());
}

function showCustomTable(): void {
  logger.info('Custom Styled Table');

  const table = new Table({
    head: [chalk.white.bold('Feature'), chalk.white.bold('Status'), chalk.white.bold('Priority')],
    colWidths: [30, 15, 15],
    style: {
      head: [],
      border: ['cyan'],
    },
  });

  table.push(
    [chalk.blue('Table Output'), chalk.green('✓ Done'), chalk.yellow('High')],
    [chalk.blue('Progress Bars'), chalk.green('✓ Done'), chalk.yellow('High')],
    [chalk.blue('Config Support'), chalk.gray('○ Pending'), chalk.red('Medium')],
    [chalk.blue('Auto Updates'), chalk.gray('○ Pending'), chalk.red('Low')]
  );

  console.log(table.toString());
}

export const tableCommand = new Command('table')
  .description('Display data in table format')
  .option('-s, --style <type>', 'Table style (simple|complex|custom|all)', 'simple')
  .action(tableAction);
