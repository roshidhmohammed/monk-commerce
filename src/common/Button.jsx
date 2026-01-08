const Button = ({ text, onClick, className }) => {
  return (
    <button onClick={onClick} className={`${className} cursor-pointer`}>
      {text}
    </button>
  );
};

export default Button;
