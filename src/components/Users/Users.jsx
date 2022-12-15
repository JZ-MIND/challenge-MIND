import UsersTable from "./UsersTable";
import classes from "./Users.module.css";

const UsersPage = () => {
  return (
    <section className={classes.starting}>
      <h1>Existing Users:</h1>
      <UsersTable />
    </section>
  );
};

export default UsersPage;
