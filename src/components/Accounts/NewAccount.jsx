import AccountForm from "./AccountForm";
import classes from "./NewAccount.module.css";
/* import UserForm from "./UserForm"; */

const NewAccount = () => {
  return (
    <section className={classes.profile}>
      <h1>Add New Account</h1>
      <AccountForm />
      {/* <UserForm /> */}
    </section>
  );
};

export default NewAccount;
