import { useCallback, useEffect, useState } from "react";
import classes from "./LogsTable.module.css";
import { getLogs } from "../../services/logService";

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getLogs();
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const loadedUsers = [];

      for (const key in data) {
        loadedUsers.push({
          id: key,
          user: data[key].date,
          action: data[key].action,
          date: data[key].date,
          account: data[key].account || "Unassigned",
        });
      }

      setLogs(loadedUsers);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchLogsHandler();
  }, [fetchLogsHandler]);

  return (
    <section className={classes.container}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {logs.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Date</th>
              <th>Account</th>
            </tr>
          </thead>
          <tbody>
            {logs &&
              logs.length > 0 &&
              logs.map((log) => {
                return (
                  <tr key={log.id}>
                    <td>{log.user}</td>
                    <td>{log.action}</td>
                    <td>{log.date}</td>
                    <td>{log.account}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default LogsTable;
