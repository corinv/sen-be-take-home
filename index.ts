import "source-map-support/register";
import "dotenv/config";
import express from "express";
import expressPinoLogger from "express-pino-logger";
import swaggerUI from "swagger-ui-express";

import logger from "./logger";
import swaggerTemplate from "./swagger";
import * as errors from "./middleware/errors";
import { router } from "./deps.js";
import { ErrorRequestHandler } from "express-serve-static-core";

const app = express();

const { PORT } = process.env;

app.use(express.json({ limit: 3145728 }));
app.use(express.urlencoded({ extended: false }));
app.use(expressPinoLogger({ logger }));
app.use(errors.errorFunction as ErrorRequestHandler);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerTemplate));
app.use(router);

if (!process.env.PORT) {
  logger.error(
    "Cannot startup webserver. Please set the PORT in the .env file"
  );
}

app.listen(PORT, () => {
  logger.info(`Local URL: http://localhost:${PORT}`);
});

export default app;
