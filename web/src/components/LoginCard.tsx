import { h } from "preact";
import { useContext, useState  } from "preact/compat";
import { AuthContext } from "../context/authContext";
import { Link } from "wouter/preact";
import Loader from "./loader";
import "../scss/card.scss";

const AUTH_API = "https://afternoon-spire-21005.herokuapp.com";

interface SyntheticEvent {
  preventDefault(): void;
}

interface LoginResponse {
  error?: string;
  data?: { token: string; username: string; displayname: string };
}

async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${AUTH_API}/login`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (response.status === 401) {
    return { error: "Login details incorrect" };
  }

  try {
    const result = await response.json();
    return { data: result };
  } catch (error) {
    return { error };
  }
}

export default function LoginCard() {
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const { data, error } = await login(username, password);
    setIsLoading(false);
    if (error) {
      setErrorMessage(error);
      return;
    }
    const token = data?.token;
    const resUsername = data?.username;
    const displayname = data?.displayname;
    setAuth({ token, isLoggedIn: true, username: resUsername, displayname });
  };

  return (
    <div className="card">
      <h1 className="card-title">Login</h1>
      <form className="card-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}
        />
        <button className="card-form-button" disabled={isLoading} type="submit">
          Login
        </button>
      </form>
      {isLoading && (
        <div className="card--loading">
          <Loader />
        </div>
      )}
      <p className="card-details">
        Dont have an account? Click <Link to="/signup">here</Link>
      </p>
      <p>{errorMessage}</p>
    </div>
  );
}
