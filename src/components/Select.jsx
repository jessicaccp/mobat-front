const Select = ({ title = "Select", options = [], handle }) => {
  return (
    <>
      <select
        defaultValue={title}
        onChange={handle}
        className="border-0 rounded-md w-[22%] lg:w-full min-w-48 text-sm"
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
