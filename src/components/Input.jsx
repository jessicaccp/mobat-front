/**
 * Input component.
 * @param {Number} props.min - The input's minimum value.
 * @param {Number} props.max - The input's maximum value.
 * @param {String} props.title - The input's placeholder value.
 * @param {Function} props.handle - The input's onChange event handler.
 * @param {String} props.type - The input's type.
 * @param {Number} props.colspan - The input's column span.
 * @param {Boolean} props.required - The input's required status.
 * @returns {React.JSX.Element} An input tag with the given input props.
 */
const Input = ({
  min = 1,
  max = 10,
  title = "Selecione um valor",
  handle = emptyHandle,
  type = "number",
  colspan = 1,
  required = false,
}) => {
  // Define the input classes
  const colspanClasses = { 1: "col-span-1", 2: "col-span-2", 3: "col-span-3" };
  const requiredClasses = "border-red-500";
  const notRequiredClasses = "border-white";
  const defaultClasses = "border-0 border-r rounded-sm text-xs md:text-sm";
  const classes = `${defaultClasses} ${colspanClasses[colspan]} ${
    required ? requiredClasses : notRequiredClasses
  }`;

  // Return the input element
  return (
    <>
      <input
        id={title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLocaleLowerCase()
          .replaceAll(" ", "-")}
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

const emptyHandle = () => {};

export default Input;
