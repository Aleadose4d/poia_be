import winston from "winston";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;

<<<<<<< HEAD
// To be used as logger.info(message) or logger.error(error)
=======
<<<<<<< HEAD
// To be used as logger.info(message) or logger.error(error)
=======
// To be used as logger.info(message) or logger.error(error)

>>>>>>> f440f48a3ba2ee988c193c7738084f498ac617a8
>>>>>>> 8664761b40bd62b36dcef7017fd10c7aca2ed595
