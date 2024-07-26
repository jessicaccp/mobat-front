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
  title = "Select an option",
  options = [],
  handle = emptyHandler,
  eixo = null,
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
              (eixo === "X" &&
                option === useFormStore((state) => state.dispersao.y)) ||
              (eixo === "Y" &&
                option === useFormStore((state) => state.dispersao.x))
            }
          >
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

const emptyHandler = () => {};

export default Select;
