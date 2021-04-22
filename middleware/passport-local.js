
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('../helpers/passwordHash');
const models = require('../models');

passport.use(new LocalStrategy({
    usernameFiled: 'username',
    passwordFiled: 'password',
    passReqToCallback: true
},
    async function (req, username, password, done) {
        const user = await models.User.findOne({
            where: {
                username,
                password: passwordHash(password)
            }
        });

        if (!user) {
            return done(null, false, { message: '일치하는 아이디 패스워드가 없습니다.' });
        } else {
            return done(null, user.dataValues);
        }
    }
));

passport.serializeUser(function (user, done) {
    console.log('serializeUser 작동');
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('deserializeUser 작동');
    done(null, user);
});

module.exports = passport;