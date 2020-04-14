import { h } from "preact";
import { useContext } from "preact/compat";
import { useState } from "preact/compat";
import { AuthContext } from "../context/authContext";
import { Link } from "wouter/preact";
import Loader from "./loader";
import "../scss/card.scss";

const AUTH_API = "https://afternoon-spire-21005.herokuapp.com";

interface SyntheticEvent {
  preventDefault(): void;
}

interface SignupResponse {
  error?: string;
  data?: { token: string; username: string; displayname: string };
}

async function signup(
  username: string,
  password: string,
  confirmPassword: string
): Promise<SignupResponse> {
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }
  const response = await fetch(`${AUTH_API}/signup`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (response.status === 400) {
    return { error: "That account already exists" };
  }

  try {
    const result = await response.json();
    return { data: result };
  } catch (error) {
    return { error };
  }
}

export default function SignupCard() {
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await signup(username, password, confirmPassword);
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
      <h1 className="card-title">Signup</h1>
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
        <input
          type="password"
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          value={confirmPassword}
        />
        <button className="card-form-button" disabled={isLoading} type="submit">
          Signup
        </button>
      </form>
      {isLoading && (
        <div className="card--loading">
          <Loader />
        </div>
      )}
      <p className="card-details">
        Already have an account? Click <Link to="/login">here</Link>
      </p>
      <p>{errorMessage}</p>
    </div>
  );
}
