import express, {json} from 'express';
import 'express-async-errors';
import cors from 'cors';

import {handleErrors} from "./utils/errors";
import {config} from "./config/config";
import {AuthRouter} from './routers/auth'

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());

app.use('/auth', AuthRouter);

app.use(handleErrors);

app.listen(3001, 'localhost', () => {
    console.log('Listening on port 3001. http://localhost:3001');
});
