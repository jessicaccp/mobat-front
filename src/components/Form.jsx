import { useState } from "react";
import Select from "./Select";

export default function Form({
  formSelectFeature,
  formSelectPeriod,
  formSelectIp,
  formSelectNumIps,
}) {
  const [feature, setFeature] = useState(null);
  function childSetFeature(feature) {
    setPeriod(null);
    setIp(null);
    setNumIps(null);
    setFeature(feature);
  }

  const [period, setPeriod] = useState(null);
  function childSetPeriod(period) {
    setPeriod(period);
  }

  const [ip, setIp] = useState(null);
  function childSetIp(ip) {
    setIp(ip);
  }

  const [numIps, setNumIps] = useState(null);
  function handleNumIpsChange(event) {
    setNumIps(event.target.value);
  }

  function handleButtonClick(event) {
    formSelectFeature(feature);
    formSelectPeriod(period);
    formSelectIp(ip);
    formSelectNumIps(numIps);
  }

  function handleResetClick(event) {
    setFeature(null);
    formSelectFeature(null);
    document.getElementById("select-feature").value =
      "Selecionar funcionalidade";
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
        <Select name="feature" childSelect={childSetFeature} />

        {feature ? <Select name="period" childSelect={childSetPeriod} /> : null}

        {feature === "Gráficos de Comportamento" ? (
          <Select name="ip" childSelect={childSetIp} />
        ) : null}

        {feature === "Score Average Mobat dos IPs com maior variação" ? (
          <input
            id="input-num-ips"
            name="input-num-ips"
            type="number"
            className="border-0 rounded-md w-full"
            placeholder="Quantidade de IPs a visualizar"
            min="1"
            max="10"
            onChange={handleNumIpsChange}
            required={
              feature === "Score Average Mobat dos IPs com maior variação"
            }
          />
        ) : null}

        {feature ? (
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
        ) : null}
      </form>
    </div>
  );
}
