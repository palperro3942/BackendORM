import morgan from "morgan";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(cors());

export default app;