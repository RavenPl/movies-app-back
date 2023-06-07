import express, {json, Router} from 'express';
import 'express-async-errors';
import rateLimit from "express-rate-limit";
import cors from 'cors';
import cookieParser from "cookie-parser";
import helmet from 'helmet';

import {config} from "./config/config";
import {AuthRouter} from './routers/auth'
import {UserRouter} from "./routers/user";
import {BookmarksRouter} from "./routers/bookmarks";
import {notFound} from "./middlewares/notFound";
import {handleErrors} from "./utils/errors";
import {configDotenv} from "dotenv";

configDotenv();
const router = Router();
const app = express();

app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
}));

app.use(json());
app.use(helmet());
app.use(cookieParser());

app.use('/movies', router);
router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/user/bookmarks', BookmarksRouter);
app.use('*', notFound);

app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}));
app.use(handleErrors);

app.listen(3001, 'localhost', () => {
    console.log('Listening on port 3001. http://localhost:3001');
});
