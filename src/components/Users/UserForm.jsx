/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classes from "./UserForm.module.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { getAccounts } from "../../services/accountService";
import { createLog } from "../../services/logService";
import { createUser, updateUser } from "../../services/usersService";
import { userSchema } from "../../schemas/schemas";

const UserForm = (props) => {
  const [isEditForm, setIsEditForm] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountSelected, setAccountSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const newUserInputRef = useRef();
  const userRoleInputRef = useRef();

  const options = [{ value: "testOption", label: "Test Option" }];
  const defaultOption = options[0];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const fetchAccountHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await getAccounts();
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      if (response.ok) {
        await createLog("USERS READED");
      }

      const data = await response.json();

      const loadedAccounts = [];

      console.log(data);

      for (const key in data) {
        loadedAccounts.push({
          value: key,
          label: data[key].name,
        });
      }

      setAccounts(loadedAccounts);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setIsLoading(false);
  });

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewUser = newUserInputRef.current.value;
    const enteredNewRole = userRoleInputRef.current.value;
    const user = { name: enteredNewUser, role: enteredNewRole };

    if (isEditForm) {
      updateUserHandler(user);
    } else {
      addUserHandler(user);
    }
  };

  async function updateUserHandler(user) {
    const id = props?.id;
    const response = await updateUser(id, user);
    if (response.ok) {
      await createLog("USER UPDATED");
    }
    cleanInputs();
  }

  async function addUserHandler(user) {
    const response = await createUser(user);

    if (response.ok) {
      await createLog("USER ADDED");
    }
    cleanInputs();
  }

  const cleanInputs = () => {
    newUserInputRef.current.value = "";
    userRoleInputRef.current.value = "";
    history.replace("/users");
  };

  useEffect(() => {
    if (props.name || props.role) {
      newUserInputRef.current.value = props.name;
      userRoleInputRef.current.value = props.role;
      setIsEditForm(true);
    }
  }, []);

  useEffect(() => {
    fetchAccountHandler();
  }, []);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="user-name">User Name</label>
        <input
          type="text"
          id="user-name"
          maxLength="30"
          ref={newUserInputRef}
          {...register("userName")}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="user-email">Email</label>
        <input
          type="text"
          id="user-role"
          maxLength="30"
          ref={userRoleInputRef}
          {...register("userEmail")}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="user-name">Account</label>
        <Dropdown
          options={accounts}
          onChange={(option) => {
            setAccountSelected(option.value);
          }}
          value={accountSelected}
          placeholder="Select an option"
        />
      </div>
      <div className={classes.action}>
        <button>
          {!isEditForm && "Create User"}
          {isEditForm && "Update User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
