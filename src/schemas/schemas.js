import * as yup from "yup";

export const accountSchema = yup
  .object()
  .shape({
    accountName: yup.string().required("Account Name is required"),
    clientName: yup.string().required("Client Name is required"),
    responsibleName: yup.string().required("Responsible Name is required"),
  })
  .required();

export const userSchema = yup
  .object()
  .shape({
    accountName: yup.string().required("Account Name is required"),
    clientName: yup.string().required("Client Name is required"),
    responsibleName: yup.string().required("Responsible Name is required"),
  })
  .required();
