import {
  featureList,
  periodList,
  ipList,
  countryList,
  allowedColumns,
} from "../data";

export default function Select({ name, childSet }) {
  const nameList = {
    feature: "funcionalidade",
    period: "período",
    ip: "IP",
    country: "país",
  };

  const listList = {
    feature: featureList,
    period: periodList,
    ip: ipList,
    country: countryList,
  };

  const title = `Selecionar ${nameList[name]}`;

  function handleChange(event) {
    childSet(event.target.value);
  }

  return (
    <select
      id={`select-${name}`}
      name={`select-${name}`}
      className="border-0 rounded-md w-full"
      defaultValue={title}
      onChange={handleChange}
    >
      {[title, ...listList[name]].map((select) => (
        <option key={select} value={select} disabled={select === title}>
          {select}
        </option>
      ))}
    </select>
  );
}
