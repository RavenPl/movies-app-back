import express, {json} from 'express';
import cors from 'cors';

import {handleErrors} from "./utils/errors";
import {config} from "./config/config";

const app = express();

app.get('/', (req, res) => {

    res.json({msg: 'ok'})
})

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(handleErrors);

app.listen(3001, 'localhost', () => {
    console.log('Listening on port 3001. http://localhost:3001');
})