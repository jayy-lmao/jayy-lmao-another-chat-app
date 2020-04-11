import {createContext} from 'preact/compat'

let setAuth: any;

export const AuthContext = createContext({auth: '', setAuth });
