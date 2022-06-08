const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true },
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered!' })
          }
          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                return done(null, false, { message: 'Email or Password incorrect.' })
              }
              return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }
  ))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, async (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json
    const randomPassword = Math.random().toString(36).slice(-8)
    let id = 0

    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        User.find()
          .sort({ id: -1 })
          .limit(1)
          .then(user => { id = user[0].id + 1 })
          .then(() => bcrypt.genSalt(10))
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({ id, name, email, password: hash }))
          .then(user => done(null, user))
      })
      .catch(err => done(err, false))
  }))

  passport.serializeUser((user, done) => done(null, user))

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
