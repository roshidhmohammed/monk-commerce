import editIcon from "../../assets/icons/edit.svg";

const EditIcon = ({handleEditProduct}) => {
  return <img src={editIcon} onClick={handleEditProduct}/>;
};

export default EditIcon;
