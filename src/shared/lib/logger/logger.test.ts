import { describe, it, expect, vi, beforeEach, afterEach, MockInstance } from 'vitest';

import logger from './logger';

describe('Logger', () => {
  let consoleSpy: {
    log: MockInstance<[message?: string, ...optionalParams: string[]], void>;
    info: MockInstance<[message?: string, ...optionalParams: string[]], void>;
    warn: MockInstance<[message?: string, ...optionalParams: string[]], void>;
    error: MockInstance<[message?: string, ...optionalParams: string[]], void>;
  };
  beforeEach(() => {
    consoleSpy = {
      log: vi.spyOn(console, 'log').mockImplementation(() => {}),
      info: vi.spyOn(console, 'info').mockImplementation(() => {}),
      warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log a message with [LOG] prefix', () => {
    logger.log('Test message');
    expect(consoleSpy.log).toHaveBeenCalledWith('[LOG]: Test message');
  });

  it('should log an info message with [INFO] prefix', () => {
    logger.info('Info message');
    expect(consoleSpy.info).toHaveBeenCalledWith('[INFO]: Info message');
  });

  it('should log a warning message with [WARN] prefix', () => {
    logger.warn('Warning message');
    expect(consoleSpy.warn).toHaveBeenCalledWith('[WARN]: Warning message');
  });

  it('should log an error message with [ERROR] prefix', () => {
    logger.error('Error message');
    expect(consoleSpy.error).toHaveBeenCalledWith('[ERROR]: Error message');
  });
});
