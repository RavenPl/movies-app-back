import {UserRecord} from "../records/user.record";

import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";

const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

beforeAll(async () => {

    const newUser = new UserRecord({
        email: 'correct@emial.com',
        password: 'correctPwd'
    });
    await newUser.insert();

    const anotherNewUser = new UserRecord({
        email: 'anotherCorrect@emial.com',
        password: 'correctPwd'
    });
    await anotherNewUser.insert();
});

afterAll(async () => {
    await pool.execute("DELETE FROM `users` WHERE `email` = 'correct@emial.com'");
    await pool.execute("DELETE FROM `users` WHERE `email` = 'anotherCorrect@emial.com'");

    await pool.end()
});

test('Dont allow to put the same email into the DB', async () => {

    const newUser = new UserRecord({
        email: 'Correct@emial.com',
        password: 'correctPwd'
    });

    try {
        await newUser.insert();
    } catch (err) {
        expect(err instanceof ValidationError).toBeTruthy()
    }
});

test('Expect to find correct user or null if not', async () => {

    const user = await UserRecord.getOneByEmail('correct@emial.com');
    if (user) {
        expect(user).not.toBeNull();
        expect(user.email).toBe('correct@emial.com');
    }

    const anotherUser = await UserRecord.getOneByEmail('incorrect@emial.com');
    expect(anotherUser).toBeNull();
});

test('Expect id to be proper UUID', async () => {

    const user = await UserRecord.getOneByEmail('correct@emial.com');

    if (user && user.id) {
        expect(user.id.length).toBe(36);
        expect(user.id).toMatch(uuidRegex);
    }
});

test('Expect to get list of users', async () => {

    const users = await UserRecord.getAll();

    if (users) {
        expect(users[0].id).toMatch(uuidRegex);
        expect(users[1].id).toMatch(uuidRegex);
    }
});

test('Expect to get null when DB is empty', async () => {

    await pool.execute("DELETE FROM `users`");

    const users = await UserRecord.getAll();

    expect(users).toBeNull()
});

test('Expect to delete given user', async () => {

    const user = await UserRecord.getOneByEmail('correct@emial.com');

    if (user) {
        await user.delete();
    }

    expect(await UserRecord.getOneByEmail('correct@emial.com')).toBeNull();
});

test('Expect currentTokenId to be UUID', async () => {

    const user = await UserRecord.getOneByEmail('correct@emial.com');

    if (user) {
        // user.currentTokenId = uuid(); @TODO "add proper function instead of uuid()"
        await user.save();
    }

    const checkUpdatedUser = await UserRecord.getOneByEmail('correct@emial.com');

    if (checkUpdatedUser) {
        expect(checkUpdatedUser.currentTokenId).toMatch(uuidRegex);
    }
});