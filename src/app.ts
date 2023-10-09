import * as express from 'express';
import 'express-async-errors';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/database';
import appRoutes from './routes/index';
import globalError from './middlewares/errorHandler.middleware';
import config from './config/config';

const app = express();
const port = config.server.port || 3000;

// express middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

// app routes
app.use('/api', appRoutes);

// globalError Middleware
app.use(globalError);

// connect to Database
connectDB();

app.listen(port);
