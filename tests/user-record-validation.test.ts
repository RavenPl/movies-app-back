import {UserRecord} from "../records/user.record";

const testObj = {
    email: "correct@email.com",
    password: "correctPwd"
};

test('Expect to pass email and password validation', () => {

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
        email: "loremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsumloremIpsum@loremIpsumloremIpsum.comloremIpsumssssserqwergdfgfd"
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
    })).toThrow('Password should have at least 8 characters but no more than 100!');

    expect(() => new UserRecord({
        ...testObj,
        password: "Password should have at least 8 characters but no more than 100!Password should have at least 8 characters b!"
    })).toThrow('Password should have at least 8 characters but no more than 100!');
})