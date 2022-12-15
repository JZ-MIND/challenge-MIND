import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Mind Teams Challenge</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/logs">Logs</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/newUser">New User</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/users">Users</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/newAccount">New Account</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
