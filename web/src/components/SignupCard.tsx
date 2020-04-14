import { h } from "preact";
import { useContext } from "preact/compat";
import { useState } from "preact/compat";
import { AuthContext } from "../context/authContext";
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

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { data, error } = await login(username, password);
    if (error) {
      setErrorMessage(error);
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
        <button type="submit">Login</button>
        <span>{errorMessage}</span>
      </form>
    </div>
  );
}
