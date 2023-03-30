import {UserRecord} from "../records/user.record";

const testObj = {
    email: "correct@email.com",
    password: "correctPwd"
};

test('Expect to get email and password through validation', async () => {

    const newUser = new UserRecord(testObj);

    expect(newUser.email).toEqual("correct@email.com");
    expect(newUser.password).toEqual("correctPwd");
    expect(newUser.id).toBeUndefined();
    expect(newUser.currentTokenId).toBeNull();
})

test('Expect to get email validation error', () => {

    expect(() => new UserRecord({
        ...testObj,
        email: "wrongEmail.com"
    })).toThrow("Invalid email!");

    expect(() => new UserRecord({
        ...testObj,
        email: ""
    })).toThrow("Invalid email!");
})

test('Expect to get password validation error', () => {

    expect(() => new UserRecord({
        ...testObj,
        password: "bad"
    })).toThrow('Password should have at least 6 characters!');
})