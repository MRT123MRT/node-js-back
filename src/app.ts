import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './middlewares';
import api from './api';
import bodyParser from 'body-parser';


require('dotenv').config();
console.log(process.env.DATABASE);
console.log(process.env.USER);
console.log(process.env.Password);
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());



app.use('/', api);

app.use(middlewares.notFound);
//app.use(middlewares.errorHandler);

export default app;