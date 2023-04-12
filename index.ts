import express, {json, Router} from 'express';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from "cookie-parser";

import {handleErrors} from "./utils/errors";
import {notFound} from "./middlewares/notFound";
import {config} from "./config/config";
import {AuthRouter} from './routers/auth'
import {UserRouter} from "./routers/user";
import {BookmarksRouter} from "./routers/bookmarks";

const router = Router();
const app = express();

app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
}));

app.use(json());
app.use(cookieParser());

app.use('/movies', router);
router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/user/bookmarks', BookmarksRouter);

app.use('*', notFound);

app.use(handleErrors);

app.listen(3001, 'localhost', () => {
    console.log('Listening on port 3001. http://localhost:3001');
});
