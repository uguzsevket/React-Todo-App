import { useState } from "react";
import "./TodoApp.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
function TodoApp() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/welcome/:username" element={<WelcomeComponent />} />

          <Route path="/todos" element={<ListTodosComponent />} />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function LoginComponent() {
  const [username, setUsername] = useState("Şevket");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(3);
  const navigate = useNavigate();
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function checkUser() {
    if (username === "şevko" && password === "admin") {
      setAuth(1);
      // to make this `sign opt - virgüle bas.
      navigate(`/welcome/${username}`);
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
      <h1>Login Page </h1>
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
  const { username } = useParams();
  return (
    <div className="WelcomeComponent">
      <h1>**Welcome {username} **</h1>
      <div>
        Manage your todos -<Link to="/todos"> Go todos</Link>{" "}
      </div>
    </div>
  );
}

function ErrorComponent() {
  return (
    <div className="errorComponent">
      <h1>Page Not Found</h1>
      <div>Upsss... This page not found !!!.</div>
    </div>
  );
}

function ListTodosComponent() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );
  const todos = [
    {
      id: 1,
      description: "Learning React",
      done: false,
      targetDate: targetDate,
    },
    { id: 2, description: "Read book", done: false, targetDate: targetDate },
    {
      id: 3,
      description: "Check mailbox",
      done: false,
      targetDate: targetDate,
    },
  ];
  return (
    <div className="ListTodosComponent">
      <h1>Things you want to do.</h1>
      <div>
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Description</td>
              <td>Is done</td>
              <td>Target Date</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoApp;
