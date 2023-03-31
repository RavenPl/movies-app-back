import express, {json} from 'express';
import cors from 'cors';

import {handleErrors} from "./utils/errors";
import {config} from "./config/config";
import './utils/db';
import {UserRecord} from "./records/user.record";

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
});

(async () => {
    const obj = {
        email: "AA@bB.com ",
        password: "123456"
    };

    const newUser = await new UserRecord(obj);
    await newUser.insert();

})()