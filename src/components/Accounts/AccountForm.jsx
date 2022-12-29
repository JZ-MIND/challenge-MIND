import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createAccount } from "../../services/accountService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classes from "./AccountForm.module.css";
import { accountSchema } from "../../schemas/schemas";

const AccountForm = (props) => {
  const [isEditForm, setIsEditForm] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accountSchema),
  });

  const submitHandler = (data) => {
    const { accountName, clientName, responsibleName } = data;

    const account = {
      name: accountName,
      client: clientName,
      responsible: responsibleName,
    };

    addAccountHandler(account);
    /* 
    if (isEditForm) {
      updateUserHandler(user);
    } else {
      addUserHandler(user);
    } */
  };

  async function addAccountHandler(account) {
    const response = await createAccount(account);

    cleanInputs();
  }

  const cleanInputs = () => {
    setValue("accountName", "");
    setValue("clientName", "");
    setValue("responsibleName", "");

    history.replace("/");
  };

  /*  useEffect(() => {
    if (props.accountName || props.clientName || props.responsibleNme) {
      accountNameInputRef.current.value = props.accountName;
      clientNameInputRef.current.value = props.clientName;
      responsibletNameInputRef.current.value = props.responsibleNme;
      setIsEditForm(true);
    }
  }, []); */

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={classes.control}>
        <label htmlFor="account-name">Account Name</label>
        <input
          type="text"
          id="account-name"
          maxLength="30"
          {...register("accountName")}
        />
        {errors.accountName && (
          <p className="text-sm text-red-500">{errors.accountName.message}</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="client-name">Client Name</label>
        <input
          type="text"
          id="client-name"
          maxLength="30"
          {...register("clientName")}
        />
        {errors.clientName && (
          <p className="text-sm text-red-500">{errors.clientName.message}</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="responsible-name">Responsible Operation Name</label>
        <input
          type="text"
          id="responsible-name"
          maxLength="30"
          {...register("responsibleName")}
        />
        {errors.responsibleName && (
          <p className="text-sm text-red-500">
            {errors.responsibleName.message}
          </p>
        )}
      </div>
      <div className={classes.action}>
        <button>
          {!isEditForm && "Create Account"}
          {isEditForm && "Update Account"}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
