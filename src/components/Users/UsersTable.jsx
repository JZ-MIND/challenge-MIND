import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import classes from "./UsersTable.module.css";
import { getUsers, removeUser } from "../../services/usersService";
import { createLog } from "../../services/logService";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const fetchUsersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getUsers();
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      if (response.ok) {
        await createLog("USERS READED");
      }

      const data = await response.json();

      const loadedUsers = [];

      for (const key in data) {
        loadedUsers.push({
          id: key,
          name: data[key].name,
          email: data[key].email,
          account: data[key].account,
        });
      }

      setUsers(loadedUsers);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  const removeUserHandler = async (userId) => {
    const response = await removeUser(userId);
    if (response.ok) {
      await createLog("USER REMOVED");
    }
    fetchUsersHandler();
  };

  const editUserHandler = (user) => {
    history.push("/editUser", { params: user });
  };

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  return (
    <section className={classes.container}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Account</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.account}</td>
                    <td className={classes.edit}>
                      <button
                        type="button"
                        onClick={() => editUserHandler(user)}
                      >
                        <FaUserEdit />
                      </button>
                    </td>
                    <td className={classes.delete}>
                      <button
                        type="button"
                        onClick={() => removeUserHandler(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default UsersTable;
