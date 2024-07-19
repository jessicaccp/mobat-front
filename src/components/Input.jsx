const Input = ({ min, max, title, handle }) => {
  return (
    <>
      <input
        type="number"
        min={min}
        max={max}
        placeholder={title}
        onChange={handle}
        className="border-0 rounded-md w-[45%] lg:w-full"
      />
    </>
  );
};

export default Input;
