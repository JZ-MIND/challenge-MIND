import LogsTable from "./LogsTable";
import classes from "./UsersLogs.module.css";

const UsersLogs = () => {
  return (
    <section className={classes.logs}>
      <h1>Logs</h1>
      <LogsTable />
    </section>
  );
};

export default UsersLogs;
