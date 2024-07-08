import React, { useState } from "react";

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
  const periodTitle = "Select period";
  const periodOptions = ["1st semester", "2nd semester", "3rd semester"];

  const ipTitle = "Select ip";

  const chartTypeTitle = "Select chart type";
  const chartTypeOptions = [
    "location",
    "reports",
    "score_average",
    "last_report",
    "time_period",
    "ibm_scores",
    "virustotal_stats",
  ];

  const [formPeriod, setFormPeriod] = useState(null);
  const [formIp, setFormIp] = useState(null);
  const [formChartType, setFormChartType] = useState(null);
  const [formNumIps, setFormNumIps] = useState(null);

  // Handlers
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
    if (document.getElementById("form-select-period"))
      document.getElementById("form-select-period").value = periodTitle;
    setIp(null);
    setFormIp(null);
    if (document.getElementById("form-select-ip"))
      document.getElementById("form-select-ip").value = ipTitle;
    setNumIps(null);
    setFormNumIps(null);
    if (document.getElementById("form-input-num-ips"))
      document.getElementById("form-input-num-ips").value = "";
    setChartType(null);
    setFormChartType(null);
    if (document.getElementById("form-select-chart-type"))
      document.getElementById("form-select-chart-type").value = chartTypeTitle;
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
          <select
            id="form-select-period"
            className="border-0 rounded-md w-full"
            defaultValue={periodTitle}
            onChange={(event) => setFormPeriod(event.target.value)}
          >
            {[periodTitle, ...periodOptions].map((option, key) => (
              <option
                key={key}
                value={option}
                disabled={option === periodTitle}
              >
                {option}
              </option>
            ))}
          </select>
        ) : null}

        {feature === "Gráficos de comportamento" ? (
          <>
            <select
              id="form-select-ip"
              className="border-0 rounded-md w-full"
              defaultValue={ipTitle}
              onChange={(event) => setFormIp(event.target.value)}
            >
              {[ipTitle].map((option, key) => (
                <option key={key} value={option} disabled={option === ipTitle}>
                  {option}
                </option>
              ))}
            </select>

            <select
              id="form-select-chart-type"
              className="border-0 rounded-md w-full"
              defaultValue={chartTypeTitle}
              onChange={(event) => setFormChartType(event.target.value)}
            >
              {[chartTypeTitle, ...chartTypeOptions].map((option, key) => (
                <option
                  key={key}
                  value={option}
                  disabled={option === chartTypeTitle}
                >
                  {option}
                </option>
              ))}
            </select>
          </>
        ) : null}

        {feature === "Mapeamento de features" ? <></> : null}
        {feature === "Clusters" ? <></> : null}
        {feature === "Seleção de características" ? <></> : null}
        {feature === "Importâncias para machine learning" ? <></> : null}

        {feature === "Score average mobat dos ips com maior variação" ? (
          <input
            id="form-input-num-ips"
            name="input-num-ips"
            type="number"
            className="border-0 rounded-md w-full"
            placeholder="Number of IPs to display"
            min="1"
            max="10"
            onChange={(event) => setFormNumIps(event.target.value)}
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
