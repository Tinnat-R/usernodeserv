const uniqid = require('uniqid');
const createUser = require('./db-actions/create-user');
const {
    getUserByAccountId,
    getUserByEmail
} = require('./db-actions/get-user');
const {
    USERSERV,
    FACEBOOK,
    COMPLETED,
    FAILED,
    USER_NOT_FOUND
} = require('./lib/constants');

module.exports = {
    createFacebookUser: async (req) => {
        console.log(USERSERV, `request received to create facebook user: ${JSON.stringify(req)}`);
        const user = {
            account_id: uniqid().toUpperCase(),
            name: req.name,
            email: req.email,
            phone_number: req.phone_number,
            account_type: req.account_type,
            authentication_party: FACEBOOK,
            created_at: new Date().getTime()
        };
        const response = await createUser(user);
        return response;
    },
    getUserByAccountId: async (accountId) => {
        console.log(USERSERV, `fetching user with account id ${accountId}`);
        const response = await getUserByAccountId(accountId);
        if (response) {
            return {
                status: COMPLETED,
                data: response
            };
        }
        return {
            status: FAILED,
            message: USER_NOT_FOUND
        };
    },
    getUserByEmail: async (email) => {
        console.log(USERSERV, `fetching user with email ${email}`);
        const response = await getUserByEmail(email);
        if (response) {
            return {
                status: COMPLETED,
                data: response
            };
        }
        return {
            status: FAILED,
            message: USER_NOT_FOUND
        };
    }
};