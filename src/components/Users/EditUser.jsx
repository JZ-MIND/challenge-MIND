/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./NewUser.module.css";
import { useHistory, useLocation } from "react-router-dom";
import UserForm from "./UserForm";
import { useEffect } from "react";

const EditUser = () => {
  const history = useHistory();
  const location = useLocation();
  const myparam = location.state?.params;

  useEffect(() => {
    if (!myparam) {
      history.push("/users");
      return;
    }
  }, []);
  return (
    <section className={classes.profile}>
      <h1>Edit User</h1>
      <UserForm id={myparam.id} name={myparam.name} email={myparam.email} />
    </section>
  );
};

export default EditUser;
