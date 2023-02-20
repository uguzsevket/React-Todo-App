import { useState } from "react";
import "./TodoApp.css";

function TodoApp() {
  return (
    <div>
      Todo App
      <LoginComponent />
      {/*<WelcomeComponent />*/}
    </div>
  );
}

function LoginComponent() {
  const [username, setUsername] = useState("Şevket");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(3);
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function checkUser() {
    if (username === "şevko" && password === "admin") {
      setAuth(1);
    } else {
      setAuth(2);
    }
  }
  function AuthMessage() {
    if (auth === 1) {
      return <div>Login Succesfully</div>;
    } else if (auth === 2) {
      return <div>Wrong password</div>;
    } else {
      setAuth(3);
    }
  }
  return (
    <div className="Login">
      Login Component
      <AuthMessage />
      <div className="LoginForm">
        <div>
          <label> User Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label> Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="button" name="login" onClick={checkUser}>
            Login{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

function WelcomeComponent() {
  return <div>Welcome Component</div>;
}

export default TodoApp;
