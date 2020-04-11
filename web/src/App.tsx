import { h } from "preact";
import { Route, Switch } from "wouter/preact";
import { AuthContext } from "./context/authContext";
import { useContext } from "preact/compat";
import LoginPage from "./pages/notLoggedIn/LoginPage";
import AuthProvider from "./AuthProvider";

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
  const isLoggedIn = false;
  return (
    <div className="app">
      <AuthProvider>
        {!isLoggedIn ? (
          <Switch>
            {/* This first should be the landing page */}
            <Route path="/" component={IsLoggedIn} />
            <Route path="/signup" component={IsLoggedIn} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" component={IsNotLoggedIn} />
            <Route path="/another" component={IsNotLoggedIn} />
          </Switch>
        )}
      </AuthProvider>
    </div>
  );
}

export default App;
