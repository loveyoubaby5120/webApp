import passport from 'passport';
import passportLocal from 'passport-local';
import Users from './lib/users';

const LocalStrategy = passportLocal.Strategy;
const users = new Users();

passport.use(new LocalStrategy(
  function(username, password, done) {
    users.login(username, password, done);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

export default passport;
