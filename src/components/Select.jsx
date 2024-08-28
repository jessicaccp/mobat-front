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
  fullWidth = false,
  required = false,
}) => {
  const fullWidthClasses =
    "border-0 border-b rounded-sm text-xs md:text-sm col-span-2";
  const defaultClasses = "border-0 border-b rounded-sm text-xs md:text-sm";
  const requiredClasses = "border-red-500";
  const classes = `${required ? requiredClasses : ""} ${
    fullWidth ? fullWidthClasses : defaultClasses
  }`;

  return (
    <>
      <select
        defaultValue={title}
        onChange={handle}
        className={classes}
        disabled={options.length === 0}
        required={required}
      >
        {[
          title,
          ...options.toSorted((a, b) => a.toString().localeCompare(b, "pt-br")),
        ].map((option, key) => (
          <option
            key={key}
            value={option}
            disabled={
              option === title ||
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
