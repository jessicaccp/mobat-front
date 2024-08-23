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
}) => {
  return (
    <>
      <select
        defaultValue={title}
        onChange={handle}
        className="border-0 rounded-md w-[22%] lg:w-full min-w-48 text-sm"
        disabled={options.length === 0}
      >
        {[
          title,
          ...options.toSorted((a, b) => a.localeCompare(b, "pt-br")),
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
