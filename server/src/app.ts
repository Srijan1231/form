import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { healthRouter } from './routes/health';
import { assessmentRouter } from './routes/assessments';
import { routineRouter } from './routes/routines';
import { exerciseRouter } from './routes/exercises';
import { dailyCheckRouter } from './routes/dailyCheck';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);
app.use('/assessments', assessmentRouter);
app.use('/routines', routineRouter);
app.use('/exercises', exerciseRouter);
app.use('/daily-check', dailyCheckRouter);

app.use(errorHandler);

export { app };
