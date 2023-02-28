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
        <HeaderComponent />
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/welcome/:username" element={<WelcomeComponent />} />
          <Route path="/todos" element={<ListTodosComponent />} />
          <Route path="/logout" element={<LogoutComponent />} />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
        <FooterComponent />
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
    <div className="container">
      <h1>Things you want to do.</h1>
      <div>
        <table className="table">
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

function HeaderComponent() {
  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <a
              className="navbar-brand ms-2 fs-2 fw-bold text-black"
              href="https://www.youtube.com/"
            >
              Youtube
            </a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item fs-5">
                  <Link className="nav-link" to="/welcome/Şevket">
                    Home
                  </Link>
                </li>
                <li className="nav-item fs-5">
                  <Link className="nav-link" to="/todos">
                    Todos
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item fs-5">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item fs-5">
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
function FooterComponent() {
  return (
    <footer className="footer">
      <div className="container ">Your Footer</div>
    </footer>
  );
}

function LogoutComponent() {
  return (
    <div className="logoutComponent">
      <h1>You logged out.</h1>
      <div>Thanks for visiting our page.</div>
    </div>
  );
}

export default TodoApp;
