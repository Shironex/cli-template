import { Command } from 'commander';
import cliProgress from 'cli-progress';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';

interface ProgressOptions {
  type?: string;
}

export async function progressAction(options: ProgressOptions): Promise<void> {
  try {
    const type = options.type || 'simple';

    switch (type) {
      case 'simple':
        await showSimpleProgress();
        break;
      case 'custom':
        await showCustomProgress();
        break;
      case 'multi':
        await showMultiProgress();
        break;
      case 'all':
        await showSimpleProgress();
        console.log('\n');
        await showCustomProgress();
        console.log('\n');
        await showMultiProgress();
        break;
      default:
        logger.error(`Unknown type: ${type}. Use: simple, custom, multi, or all`);
        process.exit(1);
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Failed to show progress: ${error.message}`);
    } else {
      logger.error('An unknown error occurred');
    }
    process.exit(1);
  }
}

async function showSimpleProgress(): Promise<void> {
  logger.info('Simple Progress Bar');

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  bar.start(100, 0);

  for (let i = 0; i <= 100; i++) {
    await sleep(30);
    bar.update(i);
  }

  bar.stop();
  logger.success('Task completed!');
}

async function showCustomProgress(): Promise<void> {
  logger.info('Custom Styled Progress Bar');

  const bar = new cliProgress.SingleBar({
    format:
      chalk.cyan('{bar}') +
      ' | ' +
      chalk.yellow('{percentage}%') +
      ' | ' +
      chalk.green('{value}/{total}') +
      ' | ' +
      chalk.gray('ETA: {eta}s') +
      ' | ' +
      chalk.blue('{task}'),
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });

  const tasks = [
    'Fetching data...',
    'Processing files...',
    'Analyzing code...',
    'Building project...',
    'Running tests...',
  ];

  bar.start(100, 0, { task: tasks[0] });

  for (let i = 0; i <= 100; i++) {
    await sleep(40);
    const taskIndex = Math.floor((i / 100) * tasks.length);
    bar.update(i, { task: tasks[Math.min(taskIndex, tasks.length - 1)] });
  }

  bar.stop();
  logger.success('All tasks completed!');
}

async function showMultiProgress(): Promise<void> {
  logger.info('Multiple Progress Bars');

  const multibar = new cliProgress.MultiBar(
    {
      clearOnComplete: false,
      hideCursor: true,
      format: ' {bar} | {filename} | {percentage}%',
    },
    cliProgress.Presets.shades_grey
  );

  const files = [
    { name: 'index.ts', size: 100 },
    { name: 'utils.ts', size: 80 },
    { name: 'commands.ts', size: 120 },
  ];

  const bars = files.map(file => multibar.create(file.size, 0, { filename: file.name.padEnd(15) }));

  const speeds = [1.2, 0.8, 1.5];

  while (bars.some((bar, index) => bar.value < files[index].size)) {
    await sleep(50);

    bars.forEach((bar, index) => {
      if (bar.value < files[index].size) {
        bar.increment(speeds[index]);
      }
    });
  }

  multibar.stop();
  logger.success('All files processed!');
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const progressCommand = new Command('progress')
  .description('Demonstrate progress bars')
  .option('-t, --type <type>', 'Progress type (simple|custom|multi|all)', 'simple')
  .action(progressAction);
