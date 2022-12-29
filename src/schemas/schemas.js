import * as yup from "yup";

export const accountSchema = yup
  .object()
  .shape({
    accountName: yup.string().required("Account Name is required"),
    clientName: yup.string().required("Client Name is required"),
    responsibleName: yup.string().required("Responsible Name is required"),
  })
  .required();

export const userSchema = (isEditForm) => {
  return yup
    .object()
    .shape({
      userName: yup.string().required("User Name is required"),
      userEmail: yup.string().required("Email is required"),
      userPassword: isEditForm
        ? yup.string().notRequired()
        : yup.string().required("Password is required"),
    })
    .required();
};
