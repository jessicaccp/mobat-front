// To-do:
// - add values to day and month titles
// - add name or id

import useFormStore from "store/useFormStore";

/**
 * Select component.
 * @param {Object} props - Input properties for the component.
 * @param {String} props.title - The select's default value
 * @param {Array} props.options - The select's options values
 * @param {Function} props.handle - The select's onChange event handler
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
  const colspanClasses = { 1: "col-span-1", 2: "col-span-2", 3: "col-span-3" };
  const requiredClasses = "border-red-500";
  const notRequiredClasses = "border-white";
  const defaultClasses = "border-0 border-r rounded-sm text-xs md:text-sm";
  const classes = `${defaultClasses} ${colspanClasses[colspan]} ${
    required ? requiredClasses : notRequiredClasses
  }`;

  return (
    <>
      <select
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
