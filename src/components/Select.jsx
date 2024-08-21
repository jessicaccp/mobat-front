import useFormStore from "store/useFormStore";
import { useTranslation } from "react-i18next";
import { localeSort } from "src/utils";

/**
 * Select component.
 * @param {Object} props - Input properties for the component.
 * @param {String} props.title - The select's default value
 * @param {Array} props.options - The select's options values
 * @param {Function} props.handle - The select's onChange event handler
 * @returns {React.JSX.Element} A select tag with the given input props.
 */
const Select = ({
  title = null,
  options = [],
  handle = () => {},
  axis = null,
}) => {
  // Translation
  const { t, i18n } = useTranslation();
  // Use the default value if there is no title
  const defaultValue = title || t("select.default_value");
  // Style
  const classes = "border-0 rounded-md w-[22%] lg:w-full min-w-48 text-sm";
  // Disable the select if there are no options
  const selectDisabled = options.length === 0;
  // Option is disabled if it is the default value or if it is the same as the other axis
  const optionDisabled = (option) => {
    option === defaultValue ||
      (axis === "X" && option === useFormStore((state) => state.scatter.y)) ||
      (axis === "Y" && option === useFormStore((state) => state.scatter.x));
  };

  return (
    <>
      <select
        defaultValue={defaultValue}
        onChange={handle}
        className={classes}
        disabled={selectDisabled}
      >
        {[defaultValue, ...options.toSorted(localeSort)].map((option, key) => (
          <option key={key} value={option} disabled={optionDisabled(option)}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
