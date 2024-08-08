class Logger {
  private loggerFunc = console;

  public log(message: string): void {
    this.loggerFunc.log(`[LOG]: ${message}`);
  }

  public info(message: string): void {
    this.loggerFunc.info(`[INFO]: ${message}`);
  }

  public warn(message: string): void {
    this.loggerFunc.warn(`[WARN]: ${message}`);
  }

  public error(message: string): void {
    this.loggerFunc.error(`[ERROR]: ${message}`);
  }
}
const logger = new Logger();

export default logger;
