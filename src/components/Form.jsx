import { useState } from "react";

export default function Form({
  formSelectVisualization,
  formSelectPeriod,
  formSelectIp,
  formSelectNumIps,
}) {
  const ipsList = ["Escolha um IP", 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const periodsList = [
    "Selecione o período a ser analisado",
    "jan-mar/2023",
    "abr-jun/2023",
    "jul-set/2023",
    "out-dez/2023",
  ];

  const options = [
    "Selecionar visualização",
    "Clusters",
    "Gráfico de Dispersão",
    "Gráficos de Comportamento",
    "HeatMap de Ocorrência dos IPs nos países",
    "Importâncias para Machine Learning",
    "Mapeamento das features",
    "Reputação por País",
    "Score Average Mobat dos IPs com maior variação",
    "Seleção de Características",
    "Tabela de Acurácia e Tempo de Treinamento dos Modelos",
    "Upload da Tabela dos IPs do período",
  ];

  const [visualization, setVisualization] = useState(null);
  function handleSelectVisualizationChange(event) {
    setPeriod(null);
    setIp(null);
    setNumIps(null);
    setVisualization(event.target.value);
  }

  const [period, setPeriod] = useState(null);
  function handleSelectPeriodChange(event) {
    setPeriod(event.target.value);
  }

  const [ip, setIp] = useState(null);
  function handleSelectIpChange(event) {
    setIp(event.target.value);
  }

  const [numIps, setNumIps] = useState(null);
  function handleSelectNumIpsChange(event) {
    setNumIps(event.target.value);
  }

  function handleButtonClick(event) {
    formSelectVisualization(visualization);
    formSelectPeriod(period);
    formSelectIp(ip);
    formSelectNumIps(numIps);
  }

  function handleResetClick(event) {
    setVisualization(null);
    formSelectVisualization(null);
    document.getElementById("select-visualization").value = options[0];
    setPeriod(null);
    formSelectPeriod(null);
    setIp(null);
    formSelectIp(null);
    setNumIps(null);
    formSelectNumIps(null);
  }

  return (
    <div className="w-full lg:w-1/3 lg:h-full p-4 bg-slate-100 gap-4 flex items-center flex-col justify-center">
      <form className="flex flex-col gap-4 w-full items-center">
        {/* always shows */}
        <select
          name="select-visualization"
          id="select-visualization"
          className="form-select w-full select-none border-0 rounded-md"
          onChange={handleSelectVisualizationChange}
          defaultValue={options[0]}
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="py-1"
              disabled={option === options[0]}
            >
              {option}
            </option>
          ))}
        </select>

        {/* shows when visualization is not null */}
        {visualization === null ? (
          ""
        ) : (
          <select
            id="select-period"
            name="select-period"
            className="border-0 rounded-md w-full"
            defaultValue={periodsList[0]}
            onChange={handleSelectPeriodChange}
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
        )}

        {/* shows when visualization === Gráficos de Comportamento */}
        {visualization === "Gráficos de Comportamento" ? (
          <select
            id="select-ip"
            name="select-ip"
            className="border-0 rounded-md w-full"
            onChange={handleSelectIpChange}
            defaultValue={ipsList[0]}
          >
            {ipsList.map((ip) => (
              <option key={ip} value={ip} disabled={ip === ipsList[0]}>
                {ip}
              </option>
            ))}
          </select>
        ) : (
          ""
        )}

        {visualization === "Score Average Mobat dos IPs com maior variação" ? (
          <input
            id="select-num-ips"
            name="select-num-ips"
            type="number"
            className="border-0 rounded-md w-full"
            placeholder="Quantidade de IPs a visualizar"
            min="1"
            max="10"
            onChange={handleSelectNumIpsChange}
            required={
              visualization === "Score Average Mobat dos IPs com maior variação"
            }
          />
        ) : (
          ""
        )}

        {!visualization ? (
          ""
        ) : (
          <div className="flex w-full justify-center gap-4">
            <button
              id="submit"
              className="border-0 rounded-md w-1/3 bg-white p-2"
              onClick={handleButtonClick}
              type="button"
            >
              Visualizar
            </button>

            <button
              className="border-0 rounded-md w-1/3 bg-white p-2"
              type="reset"
              onClick={handleResetClick}
            >
              Apagar
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
