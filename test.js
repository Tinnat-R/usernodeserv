const userserv = require('./index');

userserv
    .createFacebookUser({
        name: 'TEST TEST',
        email: 'test@test.com',
        phone_number: '9999999999',
        account_type: 'PERSONAL'
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));


userserv
    .getUserByAccountId("SKTWI136JKC1ZQG7Y")
    .then(response => console.log(response))
    .catch(error => console.log(error));


    userserv
    .getUserByEmail("hemanthprasathmurali@gmail.com")
    .then(response => console.log(response))
    .catch(error => console.log(error));