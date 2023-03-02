import morgan from "morgan";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import loginRoutes from './routes/login.routes';
import registerRoutes from './routes/register.routes';
import forgotpasswordRoutes from './routes/forgotpassword.routes';
import resetpasswordRoutes from './routes/resetpassword.routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors());

app.use(loginRoutes);
app.use(registerRoutes);
app.use(forgotpasswordRoutes);
app.use(resetpasswordRoutes);

export default app;