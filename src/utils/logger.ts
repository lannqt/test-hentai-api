import winston from "winston";
import chalk from "chalk";

declare module "winston" {
  interface Logger {
    success(message: string, ...meta: any[]): Logger;
  }
}

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  let color = chalk.white;
  switch (level) {
    case "error":
      color = chalk.red;
      break;
    case "warn":
      color = chalk.yellow;
      break;
    case "info":
      color = chalk.cyan;
      break;
    case "http":
      color = chalk.green;
      break;
    case "debug":
      color = chalk.magenta;
      break;
    case "success":
      color = chalk.greenBright;
      break;
  }
  return `${chalk.gray(timestamp)} ${color(level.toUpperCase())} ${message}`;
});

export const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    success: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "HH:mm:ss" }),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});
