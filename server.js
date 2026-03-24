import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVariable } from './utils/getEnvVariable.js';
import { contactsRouter } from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { authRouter } from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(getEnvVariable('PORT'));

const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());

    app.use(
        pino({
            transport: { target: 'pino-pretty' },
        }),
    );

    app.use('/uploads', express.static(UPLOAD_DIR));

    app.use('/api/auth', authRouter);
    app.use('/api/contacts', contactsRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server started on ${PORT} port`);
    });
};

export { setupServer };
