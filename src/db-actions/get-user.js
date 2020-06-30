const mongoClient = require('../mongo');
const {
    USERSERV,
    COLLECTION
} = require('../lib/constants');

const getUserByAccountId = async (id) => {
    console.log(USERSERV, `get user by account id: ${id}`);
    const response = await new Promise(resolve => mongoClient.connection(db => {
        db
            .collection(COLLECTION.USER)
            .find({
                account_id: id
            })
            .toArray()
            .then(result => {
                if (Array.isArray(result) && result.length === 1) {
                    return resolve(result[0]);
                }
                return resolve(null);
            })
            .catch((error) => {
                console.log(USERSERV, `error getting user info: ${JSON.stringify(error)}`);
                return resolve(null);
            });
    }));
    return response;
};

const getUserByEmail = async (email) => {
    console.log(USERSERV, `get user by email: ${email}`);
    const response = await new Promise(resolve => mongoClient.connection(db => {
        db
            .collection(COLLECTION.USER)
            .find({
                email: email
            })
            .toArray()
            .then(result => {
                if (Array.isArray(result) && result.length === 1) {
                    return resolve(result[0]);
                }
                return resolve(null);
            })
            .catch((error) => {
                console.log(USERSERV, `error getting user info: ${JSON.stringify(error)}`);
                return resolve(null);
            });
    }));
    return response;
};

module.exports = {
    getUserByAccountId,
    getUserByEmail
};