import { h } from "preact";
import { Route, Switch, Redirect } from "wouter/preact";
import LoginPage from "./pages/notLoggedIn/LoginPage";
import SignupPage from "./pages/notLoggedIn/SignupPage";
import { AuthContext } from "./context/authContext";
import { useContext } from "preact/compat";

function IsLoggedIn() {
  const { auth, setAuth } = useContext(AuthContext);
  console.log({auth})
  return (
    <div>
      <p>Hello there {auth.displayname}</p>
      <button
        onClick={() => {
          setAuth({ isLoggedIn: "", username: "", displayname: "" });
        }}
      >
        Sign out
      </button>
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

function RedirectHome() {
  return <Redirect to="/" />;
}

export default function Routes() {
  const { auth } = useContext(AuthContext);
  return auth.isLoggedIn ? (
    <Switch>
      <Route path="/" component={IsLoggedIn} />
      <Route path="/another" component={IsLoggedIn} />
      <Route path="/login" component={RedirectHome} />
      <Route path="/signup" component={RedirectHome} />
    </Switch>
  ) : (
    <Switch>
      {/* This first should be the landing page */}
      <Route path="/" component={IsNotLoggedIn} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}
