import { h } from "preact";
import { Route, Switch, Redirect } from "wouter/preact";
import LoginPage from "./pages/notLoggedIn/LoginPage";
import SignupPage from "./pages/notLoggedIn/SignupPage";
import FriendsPage from "./pages/loggedIn/FriendsPage";
import ChatListPage from "./pages/loggedIn/ChatListPage";
import ChatPage from "./pages/loggedIn/ChatPage";
import { AuthContext } from "./context/authContext";
import { useContext } from "preact/compat";
import { CustomSubscriptionClient } from "./utils/custom-subscription";

import { GraphQLClient, ClientContext } from "graphql-hooks";

function IsLoggedIn() {
  const { auth, setAuth } = useContext(AuthContext);
  console.log({ auth });
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
  console.log("create a client");
  const client = new GraphQLClient({
    url: "https://jayy-lmao-another-chat-app.herokuapp.com/v1/graphql",
    subscriptionClient: new CustomSubscriptionClient(
      "ws://jayy-lmao-another-chat-app.herokuapp.com/v1/graphql",
      {
        reconnect: true,
        timeout: 30000,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      }
    ),
  });
  client.setHeader("Authorization", `Bearer ${auth.token}`);
  return auth.isLoggedIn ? (
    <ClientContext.Provider value={client}>
      <Switch>
        <Route path="/" component={IsLoggedIn} />
        <Route path="/another" component={IsLoggedIn} />
        <Route path="/login" component={RedirectHome} />
        <Route path="/signup" component={RedirectHome} />
        <Route path="/friends" component={FriendsPage} />
        <Route path="/chats" component={ChatListPage} />
        <Route path="/chats/:chatId">
          {(params) => <ChatPage chatId={params.chatId} />}
        </Route>
      </Switch>
    </ClientContext.Provider>
  ) : (
    <Switch>
      {/* This first should be the landing page */}
      <Route path="/" component={IsNotLoggedIn} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}
