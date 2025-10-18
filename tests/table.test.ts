import { describe, it, expect, vi, beforeEach } from 'vitest';
import { tableAction } from '@/commands/table';
import { logger } from '@/utils/logger';

vi.mock('@/utils/logger');
vi.mock('cli-table3', () => ({
  default: vi.fn().mockImplementation(() => ({
    push: vi.fn(),
    toString: vi.fn().mockReturnValue('table'),
  })),
}));

const mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as () => never);
const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('table command', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display simple table by default', async () => {
    await tableAction({});
    expect(logger.info).toHaveBeenCalledWith('Simple Table Example');
  });

  it('should handle all styles', async () => {
    await tableAction({ style: 'all' });
    expect(logger.info).toHaveBeenCalledWith('Simple Table Example');
    expect(logger.info).toHaveBeenCalledWith('Complex Table with Stats');
    expect(logger.info).toHaveBeenCalledWith('Custom Styled Table');
  });

  it('should handle unknown style', async () => {
    await tableAction({ style: 'invalid' });
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
