import { h } from "preact";
import { JSX } from "preact/compat";
import { AuthContext } from "./context/authContext";
import { useState, useMemo } from "preact/compat";

interface Children {
  children: JSX.Element[] | JSX.Element;
}

const initialAuthState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || "",
  displayname: localStorage.getItem("displayname") || "",
  username: localStorage.getItem("username") || "",
};

export default function Auth({ children }: Children) {
  const [auth, setAuth] = useState(initialAuthState);

  useMemo(() => {
    if (auth.token){
      localStorage.setItem("token", auth.token);
      localStorage.setItem("username", auth.username);
      localStorage.setItem("displayname", auth.displayname);
    } else {
      localStorage.clear();
    }
  }, [auth.token]);
  const providerValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
