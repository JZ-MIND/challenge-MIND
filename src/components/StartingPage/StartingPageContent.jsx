import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <section className={classes.starting}>
      <h1>Welcome Users application!</h1>
      {!isLoggedIn && (
        <div>
          <h2>Go {<Link to="/auth">Login</Link>} to auth</h2>
        </div>
      )}
    </section>
  );
};

export default StartingPageContent;
