// selecionar período
// selecionar ip
// form-select w-full select-none border-0 rounded-md
// escolher numero de ips

export default function Form({ option, inputValues }) {
  const ipsList = ["Escolha um IP", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const periodsList = [
    "Selecione o período a ser analisado",
    "jan-mar/2023",
    "abr-jun/2023",
    "jul-set/2023",
    "out-dez/2023",
  ];

  return (
    <>
      <form className="flex flex-col gap-4 w-full">
        <select
          id="period"
          name="period"
          className="border-0 rounded-md"
          defaultValue={periodsList[0]}
        >
          {periodsList.map((period) => (
            <option
              key={period}
              value={period}
              disabled={period === periodsList[0]}
            >
              {period}
            </option>
          ))}
        </select>

        <select
          id="ip"
          name="ip"
          className="border-0 rounded-md"
          defaultValue={ipsList[0]}
        >
          {ipsList.map((ip) => (
            <option key={ip} value={ip} disabled={ip === ipsList[0]}>
              {ip}
            </option>
          ))}
        </select>

        <input
          id="num_ips"
          name="num_ips"
          type="number"
          className="border-0 rounded-md"
          placeholder="Quantidade de IPs a visualizar"
          min="1"
          max="10"
          required={option === "Score Average Mobat dos IPs com maior variação"}
        />
      </form>
    </>
  );
}
