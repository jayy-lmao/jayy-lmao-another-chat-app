import { createContext } from "preact/compat";

let setAuth: any;

export interface Auth {
  token?: string;
  username?: string;
  displayname?: string;
  isLoggedIn: boolean;
}

let auth: Auth = {
  isLoggedIn: false,
};

export const AuthContext = createContext({ auth, setAuth });
