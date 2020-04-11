import { h } from "preact";
import { useState } from "preact/compat";

const AUTH_API = "https://afternoon-spire-21005.herokuapp.com";

interface SyntheticEvent {
  preventDefault(): void;
}

interface LoginResponse {
  error?: string;
  data?: string;
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
    console.log({ result });
    return { data: result };
  } catch (error) {
    return { error };
  }
}

export default function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    console.log("Handlesubmit");
    e.preventDefault();
    const { data, error } = await login(username, password);
    console.log({ data, error });
  };

  return (
    <div className="card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
}
