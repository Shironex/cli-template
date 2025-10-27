import { describe, it, expect, vi, beforeEach } from 'vitest';
import { progressAction } from '@/commands/progress';
import { logger } from '@/utils/logger';

vi.mock('@/utils/logger');
vi.mock('cli-progress', () => ({
  default: {
    SingleBar: vi.fn(function SingleBarMock(this: unknown) {
      return {
        start: vi.fn(),
        update: vi.fn(),
        stop: vi.fn(),
      };
    }),
    MultiBar: vi.fn(function MultiBarMock(this: unknown) {
      return {
        create: vi.fn(() => ({
          value: 100,
          increment: vi.fn(),
          getProgress: vi.fn().mockReturnValue(100),
        })),
        stop: vi.fn(),
      };
    }),
    Presets: { shades_classic: {}, shades_grey: {} },
  },
}));

const mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as () => never);

describe('progress command', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show simple progress by default', async () => {
    await progressAction({});
    expect(logger.info).toHaveBeenCalledWith('Simple Progress Bar');
  });

  it('should handle unknown type', async () => {
    await progressAction({ type: 'invalid' });
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
