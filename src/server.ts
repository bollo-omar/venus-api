import 'dotenv/config';
import 'module-alias/register'
import express, { Application } from 'express';
import userRouter from '@/features/users/controllers/user.routes';
import { PORT } from '@/shared/utils/constants';
import cors from 'cors';
import helmet from 'helmet';
import morganMiddleware from '@/shared/middlewares/logs/morgan.middleware';
import compression from 'compression';
import { notFoundErrorHandler, globalErrorHandler } from '@/shared/middlewares/error-handling/http-error-handler';

const app: Application = express();


app.use(helmet());
app.use(cors());
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use('/api/auth/', userRouter);

app.use(notFoundErrorHandler)
app.use(globalErrorHandler)

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})