const Input = ({ min, max, title, handle }) => {
  return (
    <>
      <input
        type="number"
        min={min}
        max={max}
        placeholder={title}
        onChange={handle}
        className="border-0 rounded-md w-[22%] lg:w-full min-w-48 text-sm"
      />
    </>
  );
};

export default Input;
