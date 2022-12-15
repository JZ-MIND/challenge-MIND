import classes from "./NewUser.module.css";
import UserForm from "./UserForm";

const NewUser = () => {
  return (
    <section className={classes.profile}>
      <h1>Add New User</h1>
      <UserForm />
    </section>
  );
};

export default NewUser;
