import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import EditUsersPage from "./pages/EditUserPage";
import HomePage from "./pages/HomePage";
import NewAccountPage from "./pages/NewAccountPage";
import NewUsersPage from "./pages/NewUserPage";
import UserLogsPage from "./pages/UserLogsPage";
import UsersPage from "./pages/UsersPage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/logs">
          {authCtx.isLoggedIn && <UserLogsPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/users">
          {authCtx.isLoggedIn && <UsersPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/newUser">
          {authCtx.isLoggedIn && <NewUsersPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/editUser">
          {authCtx.isLoggedIn && <EditUsersPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/newAccount">
          {authCtx.isLoggedIn && <NewAccountPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
