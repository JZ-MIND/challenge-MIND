/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Dropdown from "react-dropdown";
import classes from "./UserForm.module.css";
import "react-dropdown/style.css";
import { createUser, updateUser } from "../../services/usersService";
import { userSchema } from "../../schemas/schemas";
import { signUp } from "../../services/authService";
import { getAccounts } from "../../services/accountService";
import { createLog } from "../../services/logService";

const UserForm = (props) => {
  const [isEditForm, setIsEditForm] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountSelected, setAccountSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema(isEditForm)),
  });

  const submitHandler = (data) => {
    const { userName, userEmail, userPassword, userAccount } = data;

    const user = {
      name: userName,
      email: userEmail,
      ...(userPassword && { password: userPassword }),
      account: userAccount,
    };

    if (isEditForm) {
      updateUserHandler(user);
    } else {
      addUserHandler(user);
    }
  };

  async function updateUserHandler(user) {
    const id = props?.id;
    updateUser(id, user)
      .then((response) => {
        if (response.ok) return response;
        throw new Error("No fue posible actualizar el Usuario");
      })
      .then(() =>
        createLog({
          user: user.name,
          action: "User Updated",
          account: user.account,
        })
      )
      .then(() => cleanInputs())
      .catch((error) => {
        console.log(error);
      });
  }

  async function addUserHandler(user) {
    signUp(user.email, user.password, user.name)
      .then((response) => {
        if (response.ok) return response;

        throw new Error(
          "No es posible crear el Usuario / Usuario ya registrado"
        );
      })
      .then(() => {
        createUser({ name: user.name, email: user.email });
      })
      .then(() => {
        createLog({ user: user.name, action: "User Created" });
      })
      .then(() => {
        cleanInputs();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const fetchAccountHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await getAccounts();
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const loadedAccounts = [];

      for (const key in data) {
        loadedAccounts.push({
          value: data[key].name,
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

  const cleanInputs = () => {
    setValue("userName", "");
    setValue("userEmail", "");
    setValue("userPassword", "");
    history.replace("/users");
  };

  useEffect(() => {
    if (props.name || props.email) {
      setValue("userName", props.name);
      setValue("userEmail", props.email);
      setIsEditForm(true);
      fetchAccountHandler();
    }
  }, []);

  useEffect(() => {
    setValue("userAccount", accountSelected);
  }, [accountSelected]);

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={classes.control}>
        <label htmlFor="user-name">User Name</label>
        <input
          type="text"
          id="user-name"
          maxLength="30"
          {...register("userName")}
        />
        {errors.userName && (
          <p className="text-sm text-red-500">{errors.userName.message}</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="user-email">Email</label>
        <input
          type="text"
          id="user-role"
          maxLength="30"
          {...register("userEmail")}
        />
        {errors.userEmail && (
          <p className="text-sm text-red-500">{errors.userEmail.message}</p>
        )}
      </div>
      {!isEditForm && (
        <div className={classes.control}>
          <label htmlFor="user-password">Password</label>
          <input
            type="password"
            id="user-role"
            maxLength="30"
            {...register("userPassword")}
          />
          {errors.userPassword && (
            <p className="text-sm text-red-500">
              {errors.userPassword.message}
            </p>
          )}
        </div>
      )}

      {isEditForm && (
        <div className={classes.control}>
          <label htmlFor="user-account">Account</label>
          <Dropdown
            options={accounts}
            onChange={(option) => setAccountSelected(option.value)}
            value={accountSelected}
            placeholder="Select no option to unassign"
          />
        </div>
      )}

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
