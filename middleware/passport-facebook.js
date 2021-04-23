const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const models = require('../models');

const dotenv = require('dotenv');
dotenv.config();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APPID,
    clientSecret: process.env.FACEBOOK_SECRETCODE,
    callbackURL: `${process.env.SITE_DOMAIN}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email']
},
    async function (accessToken, refreshToken, profile, done) {
        // console.log(accessToken);
        // console.log(profile);
        // console.log(profile.displayName);
        // console.log(profile.emails[0].value);
        // console.log(profile._raw);
        // console.log(profile._json);

        try {

            const username = `fb_${profile.id}`;
            const exist = await models.User.count({
                where : {
                    username : username
                }
            });

            if (!exist){
                user = await models.User.create({
                    username,
                    displayname: profile.displayName,
                    password: 'facebook'
                });
            } else {
                user = await models.User.findOne({
                    where : {
                        username
                    }
                });
            }

            return done(null, user);

        } catch (e) {

        }
    }
));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

module.exports = passport;