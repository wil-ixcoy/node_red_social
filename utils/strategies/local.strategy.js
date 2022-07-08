const { Strategy } = require('passport-local');

const auth = require('../../components/auth/auth.controller');

const localStrategy = new Strategy(
    {
        //nombres que sel el da para enviar en el json
        usernameField: 'email',
        passwordField: 'password',
    },

    async (email, password, done) => {
        try {
            const user = await auth.login(email, password);
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
);

module.exports = localStrategy;