import { h } from "preact";
import { Route, Switch } from "wouter/preact";
import { AuthContext } from "./context/authContext";
import { useState, useContext, useMemo } from "preact/compat";

function IsLoggedIn() {
  const { auth } = useContext(AuthContext);
  return (
    <div>
      Is Logged In <span>{auth}</span>
    </div>
  );
}

function IsNotLoggedIn() {
  const { auth } = useContext(AuthContext);
  return (
    <div>
      Is Not Logged In <span>{auth}</span>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState("asdafsd");
  const providerValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  const isLoggedIn = false;
  return (
    <div className="app">
      <AuthContext.Provider value={providerValue}>
        {isLoggedIn ? (
          <Switch>
            {/* This first should be the landing page */}
            <Route path="/" component={IsLoggedIn} />
            <Route path="/signup" component={IsLoggedIn} />
            <Route path="/login" component={IsLoggedIn} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" component={IsNotLoggedIn} />
            <Route path="/another" component={IsNotLoggedIn} />
          </Switch>
        )}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
