import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import passport from "./config/passport";
import { check, validationResult } from "express-validator";
import { User } from "./models/user-model";
const config = functions.config();

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

if (!config.envs.encryption_key) {
  throw Error("Need an envs.encryption_key");
}

main.use(`/api/v1`, app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(passport.initialize());
main.use(passport.session());

// SignUp

app.post(
  "/signup",
  [
    check("displayname", "Name is not valid").notEmpty(),
    check("username", "Username is not valid").notEmpty(),
    check("password", "Password must be at least 4 characters long").isLength({
      min: 4,
    }),
    check("confirmPassword", "Passwords do not match").custom(
      (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        } else {
          return value;
        }
      }
    ),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }

    // INSERT USER
    try {
      await User.query()
        .allowInsert("[displayname, username, password]")
        .insert({
          displayname: req.body.displayname,
          username: req.body.username,
          password: req.body.password,
        });
    } catch (err) {
      console.error(err);
      handleResponse(res, 400, { error: err });
      return;
    }

    // LOG USER IN

    passport.authenticate("local", (err: Error, user: User, _info: any) => {
      if (err) {
        console.error(err);
        handleResponse(res, 400, { error: err });
        return;
      }
      if (user) {
        handleResponse(res, 200, user.getUser());
      }
    })(req, res, next);
    return;
  }
);

function handleResponse(
  res: Response,
  code: number,
  statusMsg: { error: Error } | { id: number; username: string }
) {
  res.status(code).json(statusMsg);
}
export const authServer = functions.https.onRequest(main);
