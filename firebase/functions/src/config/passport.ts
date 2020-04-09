import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user-model";

passport.use(
  new LocalStrategy(function (
    username: string,
    password: string,
    done: (msg?: string | Error, user?: User) => void
  ) {
    User.query()
      .where("username", username)
      .first()
      .then(function (user) {
        if (!user) {
          return done("Unknown user");
        }
        user.verifyPassword(password, function (err, passwordCorrect) {
          if (err) {
            return done(err);
          }
          if (!passwordCorrect) {
            return done("Invalid password");
          }
          return done(undefined, user);
        });
      })
      .catch(function (err) {
        done(err);
      });
  })
);

export default passport;
