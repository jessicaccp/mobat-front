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
  formSelectFeature,
  formSelectPeriod,
  formSelectIp,
  formSelectNumIps,
}) {
  // States
  const [feature, setFeature] = useState(null);
  const [period, setPeriod] = useState(null);
  const [ip, setIp] = useState(null);
  const [numIps, setNumIps] = useState(null);

  // Functions that will be passed to the children components to set the variables states
  function childSetFeature(feature) {
    setPeriod(null);
    setIp(null);
    setNumIps(null);
    setFeature(feature);
  }

  function childSetPeriod(period) {
    setPeriod(period);
  }

  function childSetIp(ip) {
    setIp(ip);
  }

  // Handlers
  /**
   * Sets the number of IPs to be shown in the graphic.
   * @param {Event} event
   */
  function handleNumIpsChange(event) {
    setNumIps(event.target.value);
  }

  /**
   * Submits the form. Shares the variables states through the props functions.
   */
  function handleButtonClick(event) {
    formSelectFeature(feature);
    formSelectPeriod(period);
    formSelectIp(ip);
    formSelectNumIps(numIps);
  }

  /**
   * Resets the form. Sets all states to null and the select to the default value.
   */
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

  // Select "feature" always shows
  // Select "period" shows if "feature" is not null
  // Select "ip" shows if the feature is "Gráficos de Comportamento"
  // Input "input-num-ips" shows if the feature is "Score Average Mobat dos IPs com maior variação"
  // Buttons "submit" and "reset" show if "feature" is not null
  return (
    <div className="w-full lg:w-1/3 lg:h-full p-4 bg-slate-100 gap-4 flex items-center flex-col justify-center">
      <form className="flex flex-col gap-4 w-full items-center">
        <Select name="feature" childSet={childSetFeature} />

        {feature ? <Select name="period" childSet={childSetPeriod} /> : null}

        {feature === "Gráficos de Comportamento" ? (
          <Select name="ip" childSet={childSetIp} />
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
