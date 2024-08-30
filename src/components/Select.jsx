import useFormStore from "store/useFormStore";

/**
 * Select component.
 * @param {String} props.title - The select's default value.
 * @param {Array} props.options - The select's options values.
 * @param {Function} props.handle - The select's onChange event handler.
 * @param {String} props.axis - The select's axis value.
 * @param {Number} props.colspan - The select's column span.
 * @param {Boolean} props.required - The select's required status.
 * @param {String} props.defaultValue - The select's default value.
 * @returns {React.JSX.Element} A select tag with the given input props.
 */
const Select = ({
  title = "Selecione uma opção",
  options = [],
  handle = () => {},
  axis = null,
  colspan = 1,
  required = false,
  defaultValue = "",
}) => {
  // Define the select classes
  const colspanClasses = { 1: "col-span-1", 2: "col-span-2", 3: "col-span-3" };
  const requiredClasses = "border-red-500";
  const notRequiredClasses = "border-white";
  const defaultClasses = "border-0 border-r rounded-sm text-xs md:text-sm";
  const classes = `${defaultClasses} ${colspanClasses[colspan]} ${
    required ? requiredClasses : notRequiredClasses
  }`;

  // Return the select element
  return (
    <>
      <select
        id={title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLocaleLowerCase()
          .replaceAll(" ", "-")}
        defaultValue={defaultValue || title}
        onChange={handle}
        className={classes}
        disabled={options.length === 0}
        required={required}
      >
        {[title, ...options].map((option, key) => (
          <option
            key={key}
            value={option === title ? "" : option}
            disabled={
              (axis === "X" &&
                option === useFormStore((state) => state.scatter.y)) ||
              (axis === "Y" &&
                option === useFormStore((state) => state.scatter.x))
            }
          >
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
