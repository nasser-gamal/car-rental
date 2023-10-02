import * as express from 'express';
import 'express-async-errors';
import appRoutes from './routes/index';
import { connectDB } from './config/database';
import globalError from './middlewares/errorHandler.middleware';

const app = express();
const port = 3000;

// express middleware
app.use(express.json());

// app routes
app.use('/api', appRoutes);

// globalError Middleware
app.use(globalError);

// connect to Database
connectDB();

app.listen(port);
