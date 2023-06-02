import 'source-map-support/register';
import 'dotenv/config';
import express from 'express';
import expressPinoLogger from 'express-pino-logger';
import swaggerUI from 'swagger-ui-express';

import router from './routes';
import logger from './logger';
import swaggerTemplate from './swagger';
import * as errors from './middleware/errors';
const app = express();

const PORT = process.env.PORT;

app.use(express.json({ limit: 3145728 }));
app.use(express.urlencoded({ extended: false }));
app.use(expressPinoLogger({ logger }));
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerTemplate));
app.use(router);
app.use(errors.errorFunction);

if (!process.env.PORT) {
    logger.error('Cannot startup webserver. Please set the PORT in the .env file');
}
 
app.listen(PORT, () => {
    logger.info(`Local URL: http://localhost:${PORT}`);
});

export default app;
