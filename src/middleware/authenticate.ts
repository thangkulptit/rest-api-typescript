import * as express from 'express';
import * as passport from 'passport'
export class Authenticate {
    constructor() {
    }
    LocalStrategy = require('passport-local').Strategy
    public initialize(express: express.Application) {
        express.use(passport.initialize());
        express.use(passport.session());
        const that = this;

        passport.use(new this.LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        }, function (req, username, password, done) {
            process.nextTick(function () {
                that.authenticateLogic(req, username, password, done)
            })
        }))

        passport.serializeUser(function (dret: any, done) {
            var sed: any
            
            const authorize = !!dret.authorize;
            sed = {
                authorize:authorize
            }
            done(null, sed)
        })

        passport.deserializeUser(function (user, done) {
            done(null, user)
        })
    }

    private authenticateLogic(req, username, password, done) {
        const dret = {
            authorize:true
        };
        return done(null, dret);
    }
}