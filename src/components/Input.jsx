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
  title = "Selecione um valor",
  handle = () => {},
  type = "number",
  fullWidth = false,
  required = false,
}) => {
  const fullWidthClasses =
    "border-0 border-b rounded-sm text-xs md:text-sm col-span-2";
  const defaultClasses = "border-0 border-b rounded-sm  text-xs md:text-sm";
  const requiredClasses = "border-red-500";
  const classes = `${required ? requiredClasses : ""} ${
    fullWidth ? fullWidthClasses : defaultClasses
  }`;

  return (
    <>
      <input
        type={type}
        min={min}
        max={max}
        placeholder={title}
        onChange={handle}
        className={classes}
        required={required}
      />
    </>
  );
};

export default Input;
