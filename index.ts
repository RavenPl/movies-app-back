import express, {json, Router} from 'express';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from "cookie-parser";

import {handleErrors} from "./utils/errors";
import {config} from "./config/config";
import {AuthRouter} from './routers/auth'
import {notFound} from "./middlewares/notFound";

const router = Router();
const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(cookieParser());

router.use('/auth', AuthRouter);
app.use('/movies', router);
app.use('*', notFound);

app.use(handleErrors);

app.listen(3001, 'localhost', () => {
    console.log('Listening on port 3001. http://localhost:3001');
});
