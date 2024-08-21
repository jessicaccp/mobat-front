/**
 * Input component.
 * @param {Object} props - Input properties for the component.
 * @param {Number} props.min - The input's minimum value.
 * @param {Number} props.max - The input's maximum value.
 * @param {String} props.title - The input's placeholder value.
 * @param {Function} props.handle - The input's onChange event handler.
 * @returns {React.JSX.Element} An input tag with the given input props.
 */
const Input = ({
  min = 1,
  max = 10,
  title = "Set a value",
  handle = () => {},
}) => {
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
