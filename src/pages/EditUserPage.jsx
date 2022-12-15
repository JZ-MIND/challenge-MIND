import EditUser from "../components/Users/EditUser";

const EditUsersPage = (props) => {
  return <EditUser name={props.name} role={props.role} />;
};

export default EditUsersPage;
