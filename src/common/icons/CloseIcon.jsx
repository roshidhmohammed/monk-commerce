import closeIcon from "../../assets/icons/close.svg";

const CloseIcon = ({handleRemoved}) => {
  return (
      <img src={closeIcon} className=" cursor-pointer" onClick={handleRemoved}/>

  );
};

export default CloseIcon;
