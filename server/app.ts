import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as errorHandler from '../src/api/errorHandler';
import api from '../src/api';
import bodyParser from 'body-parser';
var cookieParser = require('cookie-parser')

console.log(process.env.DATABASE);
console.log(process.env.USER);
console.log(process.env.Password);
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((res, req, next) => {

    //forvard token from cookies to auth header if not present

    console.log(res.headers.authorization);
    console.log(res.cookies);

    if (res?.cookies?.token && !res?.headers?.authorization) {
        res.headers.authorization = `Bearer ${res?.cookies?.token}`;
    }

    console.log(res.headers.authorization);
    console.log(res.cookies);

    next();
});



app.use('/', api);

app.use(errorHandler.notFound);


export default app;