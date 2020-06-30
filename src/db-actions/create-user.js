const mongoClient = require('../mongo');
const {
    getUserByEmail,
    getUserByAccountId
} = require('./get-user');
const {
    USERSERV,
    COLLECTION,
    COMPLETED,
    FAILED,
    USER_ALREADY_EXISTS,
    DATABASE_ERROR
} = require('../lib/constants');

const createUser = async (user) => {
    console.log(USERSERV, `creating user: ${JSON.stringify(user)}`);
    let existingUser = await getUserByAccountId(user.account_id);
    if (existingUser) {
        console.log(USERSERV, `user already exists: ${JSON.stringify(existingUser)}`);
        return {
            status: FAILED,
            message: USER_ALREADY_EXISTS,
            account_id: user.account_id
        };
    }
    existingUser = await getUserByEmail(user.email);
    if (existingUser) {
        console.log(USERSERV, `user already exists: ${JSON.stringify(existingUser)}`);
        return {
            status: FAILED,
            message: USER_ALREADY_EXISTS,
            account_id: user.account_id
        };
    }
    const response = await new Promise(resolve => mongoClient.connection((db) => {
        db
            .collection(COLLECTION.USER)
            .insertOne(user)
            .then(() => {
                console.log(USERSERV, `user created`);
                resolve({
                    status: COMPLETED,
                    account_id: user.account_id
                });
            })
            .catch((error) => {
                console.log(USERSERV, `error creating user: ${JSON.stringify(error)}`);
                resolve({
                    status: FAILED,
                    message: DATABASE_ERROR
                });
            });
    }));
    return response;
};

module.exports = createUser;