import React, { useState } from "react";
import Select from "./Select";

/**
 * Renders a form with inputs used to generate the graphic.
 * @param {function} formSelectFeature Function to share the feature state with Graphic through Main.
 * @param {function} formSelectPeriod Function to set the period state with Graphic through Main.
 * @param {function} formSelectIp Function to set the ip state with Graphic through Main.
 * @param {function} formSelectNumIps Function to set the numIps state with Graphic through Main.
 * @returns {ReactNode}
 */
export default function Form({
  feature,
  setFeature,
  period,
  setPeriod,
  ip,
  setIp,
  numIps,
  setNumIps,
  chartType,
  setChartType,
  ipList,
}) {
  const [formPeriod, setFormPeriod] = useState(null);
  const [formIp, setFormIp] = useState(null);
  const [formChartType, setFormChartType] = useState(null);
  const [formNumIps, setFormNumIps] = useState(null);

  // Handlers
  /**
   * Sets the number of IPs to be shown in the graphic.
   * @param {Event} event
   */
  function handleNumIpsChange(event) {
    setFormNumIps(event.target.value);
  }

  function handleSubmitClick(event) {
    setPeriod(formPeriod);
    setIp(formIp);
    setChartType(formChartType);
    setNumIps(formNumIps);
  }

  /**
   * Resets the form. Sets all states to null and the select to the default value.
   */
  function handleResetClick(event) {
    setPeriod(null);
    setFormPeriod(null);
    setIp(null);
    setFormIp(null);
    setNumIps(null);
    setFormNumIps(null);
    setChartType(null);
    setFormChartType(null);
  }

  // Select "feature" always shows
  // Select "period" shows if "feature" is not null
  // Select "ip" shows if the feature is "Gráficos de Comportamento"
  // Input "input-num-ips" shows if the feature is "Score Average Mobat dos IPs com maior variação"
  // Buttons "submit" and "reset" show if "feature" is not null
  return (
    <div className="w-full lg:w-1/3 lg:h-full p-4 bg-gray-100 gap-4 flex items-center flex-col justify-center">
      <form className="flex flex-col gap-4 w-full items-center">
        {feature ? (
          <select className="border-0 rounded-md w-full">
            <option>Period</option>
          </select>
        ) : null}

        {feature === "Gráficos de comportamento" ? (
          <>
            <select className="border-0 rounded-md w-full">
              <option>Ip</option>
            </select>
            <select className="border-0 rounded-md w-full">
              <option>Chart type</option>
            </select>
          </>
        ) : null}

        {feature === "Mapeamento de features" ? <></> : null}
        {feature === "Clusters" ? <></> : null}
        {feature === "Seleção de características" ? <></> : null}
        {feature === "Importâncias para machine learning" ? <></> : null}

        {feature === "Score average mobat dos ips com maior variação" ? (
          <input
            id="input-num-ips"
            name="input-num-ips"
            type="number"
            className="border-0 rounded-md w-full"
            placeholder="Number of IPs to display"
            min="1"
            max="10"
            onChange={handleNumIpsChange}
            required={
              feature === "Score average mobat dos ips com maior variação"
            }
          />
        ) : null}

        {feature === "Reputação por país" ? <></> : null}
        {feature === "Heatmap de ocorrência dos ips nos países" ? <></> : null}
        {feature === "Tabela de acurácia e tempo de treinamento dos modelos" ? (
          <></>
        ) : null}
        {feature === "Gráfico de dispersão" ? <></> : null}

        {feature ? (
          <div className="flex w-full justify-center gap-4">
            <button
              id="form-submit-button"
              className="border-0 rounded-md w-1/3 bg-white p-2 hover:bg-gray-200 "
              onClick={handleSubmitClick}
              type="button"
            >
              Display
            </button>

            <button
              id="form-reset-button"
              className="border-0 rounded-md w-1/3 bg-white p-2 hover:bg-gray-200"
              type="reset"
              onClick={handleResetClick}
            >
              Reset
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
