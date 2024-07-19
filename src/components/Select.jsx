const Select = ({ title = "Select", options = [], handle }) => {
  return (
    <>
      <select
        defaultValue={title}
        onChange={handle}
        className="border-0 rounded-md w-[45%] lg:w-full"
      >
        {[
          title,
          ...options.toSorted((a, b) => a.localeCompare(b, "pt-br")),
        ].map((option, key) => (
          <option key={key} value={option} disabled={option === title}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
