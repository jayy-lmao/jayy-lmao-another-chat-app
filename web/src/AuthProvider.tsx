import { h } from "preact";
import { JSX } from "preact/compat";
import { AuthContext } from "./context/authContext";
import { useState, useMemo } from "preact/compat";

interface Children {
  children: JSX.Element[] | JSX.Element;
}

export default function Auth({ children }: Children) {
  const [auth, setAuth] = useState({ isLoggedIn: false, token: "" });
  useMemo(() => {
    if (auth.token.length > 0) {
      localStorage.setItem("token", auth.token);
    }
    const token = localStorage.getItem("token");
    if (token && token.length > 0) {
      setAuth({ token, isLoggedIn: true });
    }
  }, [auth.token]);
  const providerValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
