import React, { useEffect, useState } from "react";

/**
 * Renders a form with inputs used to generate the graphics.
 * @param {Object} props
 * @returns {ReactNode}
 */
export default function Form({
  isLoading,
  feature,
  setPeriod,
  setIp,
  ipList,
  setChartType,
  setColumnMap,
  setColumnCluster,
  setNumClusters,
  setTechnique,
  setModel,
  setNumIps,
  setCountry,
  setColumnX,
  setColumnY,
}) {
  // Titles and lists
  const periodTitle = "Select period";
  const periodList = ["1st semester", "2nd semester", "3rd semester"];
  const ipTitle = "Select ip";
  const chartTypeTitle = "Select chart type";
  const chartTypeList = [
    "location",
    "reports",
    "score_average",
    "last_report",
    "time_period",
    "ibm_scores",
    "virustotal_stats",
  ].toSorted((a, b) => a.localeCompare(b, "pt-br"));
  const columnTitle = "Select column";
  const columnList = [
    "abuseipdb_is_whitelisted",
    "abuseipdb_confidence_score",
    "abuseipdb_country_code",
    "abuseipdb_isp",
    "abuseipdb_domain",
    "abuseipdb_total_reports",
    "abuseipdb_num_distinct_users",
    "abuseipdb_last_reported_at",
    "virustotal_reputation",
    "virustotal_regional_internet_registry",
    "virustotal_as_owner",
    "harmless",
    "malicious",
    "suspicious",
    "undetected",
    "IBM_score",
    "IBM_average history Score",
    "IBM_most common score",
    "virustotal_asn",
    "SHODAN_asn",
    "SHODAN_isp",
    "ALIENVAULT_reputation",
    "ALIENVAULT_asn",
    "score_average_Mobat",
  ].toSorted((a, b) => a.localeCompare(b, "pt-br"));
  const numClustersTitle = "Select number of clusters";
  const techniqueTitle = "Select technique";
  const techniqueList = [
    "Variance Threshold",
    "SelectKBest",
    "Lasso",
    "Mutual Information",
    "Correlation Matrix",
  ].toSorted((a, b) => a.localeCompare(b, "pt-br"));
  const modelTitle = "Select model";
  const modelList = [
    "Gradient Boosting Regressor",
    "Random Forest Regressor",
    "Extra Trees Regressor",
    "AdaBoost Regressor",
    "XGBoost Regressor",
    "ElasticNet",
  ].toSorted((a, b) => a.localeCompare(b, "pt-br"));
  const numIpsTitle = "Select number of ips";
  const countryTitle = "Select country";
  const countryList = {
    US: "Estados Unidos",
    CN: "China",
    SG: "Singapura",
    DE: "Alemanha",
    VN: "Vietnã",
    KR: "Coreia do Sul",
    IN: "Índia",
    RU: "Rússia",
    LT: "Lituânia",
    TW: "Taiwan",
    GB: "Reino Unido",
    JP: "Japão",
    IR: "Irã",
    BR: "Brasil",
    AR: "Argentina",
    NL: "Holanda",
    TH: "Tailândia",
    CA: "Canadá",
    PK: "Paquistão",
    ID: "Indonésia",
    ET: "Etiópia",
    FR: "França",
    BG: "Bulgária",
    PA: "Panamá",
    SA: "Arábia Saudita",
    BD: "Bangladesh",
    HK: "Hong Kong",
    MA: "Marrocos",
    EG: "Egito",
    UA: "Ucrânia",
    MX: "México",
    UZ: "Uzbequistão",
    ES: "Espanha",
    AU: "Austrália",
    CO: "Colômbia",
    KZ: "Cazaquistão",
    EC: "Equador",
    BZ: "Belize",
    SN: "Senegal",
    None: "None",
    IE: "Irlanda",
    FI: "Finlândia",
    ZA: "África do Sul",
    IT: "Itália",
    PH: "Filipinas",
    CR: "Costa Rica",
    CH: "Suíça",
  };
  const columnXTitle = "Select column X";
  const columnYTitle = "Select column Y";
  const columnXYList = [
    "abuseipdb_is_whitelisted",
    "abuseipdb_confidence_score",
    "abuseipdb_total_reports",
    "abuseipdb_num_distinct_users",
    "virustotal_reputation",
    "harmless",
    "malicious",
    "suspicious",
    "undetected",
    "IBM_score",
    "IBM_average history Score",
    "IBM_most common score",
    "ALIENVAULT_reputation",
    "score_average_Mobat",
  ].toSorted((a, b) => a.localeCompare(b, "pt-br"));

  // Form states
  const [formPeriod, setFormPeriod] = useState(null);
  const [formIp, setFormIp] = useState(null);
  const [formChartType, setFormChartType] = useState(null);
  const [formColumnMap, setFormColumnMap] = useState(null);
  const [formColumnCluster, setFormColumnCluster] = useState(null);
  const [formNumClusters, setFormNumClusters] = useState(null);
  const [formTechnique, setFormTechnique] = useState(null);
  const [formModel, setFormModel] = useState(null);
  const [formNumIps, setFormNumIps] = useState(null);
  const [formCountry, setFormCountry] = useState(null);
  const [formColumnX, setFormColumnX] = useState(null);
  const [formColumnY, setFormColumnY] = useState(null);

  useEffect(() => {
    setPeriod(null);
    setFormPeriod(null);
    if (document.getElementById("form-select-period"))
      document.getElementById("form-select-period").value = periodTitle;
    setIp(null);
    setFormIp(null);
    if (document.getElementById("form-select-ip"))
      document.getElementById("form-select-ip").value = ipTitle;
    setChartType(null);
    setFormChartType(null);
    if (document.getElementById("form-select-chart-type"))
      document.getElementById("form-select-chart-type").value = chartTypeTitle;
    setColumnMap(null);
    setFormColumnMap(null);
    if (document.getElementById("form-select-column-map"))
      document.getElementById("form-select-column-map").value = columnTitle;
    setColumnCluster(null);
    setFormColumnCluster(null);
    if (document.getElementById("form-select-column-cluster"))
      document.getElementById("form-select-column-cluster").value = columnTitle;
    setNumClusters(null);
    setFormNumClusters(null);
    if (document.getElementById("form-input-num-clusters"))
      document.getElementById("form-input-num-clusters").value = "";
    setTechnique(null);
    setFormTechnique(null);
    if (document.getElementById("form-select-technique"))
      document.getElementById("form-select-technique").value = techniqueTitle;
    setModel(null);
    setFormModel(null);
    if (document.getElementById("form-select-model"))
      document.getElementById("form-select-model").value = modelTitle;
    setNumIps(null);
    setFormNumIps(null);
    if (document.getElementById("form-input-num-ips"))
      document.getElementById("form-input-num-ips").value = "";
    setCountry(null);
    setFormCountry(null);
    if (document.getElementById("form-select-country"))
      document.getElementById("form-select-country").value = countryTitle;
    setColumnX(null);
    setFormColumnX(null);
    if (document.getElementById("form-select-column-x"))
      document.getElementById("form-select-column-x").value = columnTitle;
    setColumnY(null);
    setFormColumnY(null);
    if (document.getElementById("form-select-column-y"))
      document.getElementById("form-select-column-y").value = columnTitle;
  }, [feature]);

  function handlePeriodChange(event) {
    setFormPeriod(event.target.value);
    setPeriod(event.target.value);
  }
  /**
   * Sends the states to the parent component.
   * @param {Event} event
   */
  function handleSubmitClick(event) {
    setPeriod(formPeriod);
    setIp(formIp);
    setChartType(formChartType);
    setColumnMap(formColumnMap);
    setColumnCluster(formColumnCluster);
    setNumClusters(formNumClusters);
    setTechnique(formTechnique);
    setModel(formModel);
    setNumIps(formNumIps);
    setCountry(formCountry);
    setColumnX(formColumnX);
    setColumnY(formColumnY);
  }

  /**
   * Resets the form. Sets all states to null and the select to the default value.
   * @param {Event} event
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
    setChartType(null);
    setFormChartType(null);
    if (document.getElementById("form-select-chart-type"))
      document.getElementById("form-select-chart-type").value = chartTypeTitle;
    setColumnMap(null);
    setFormColumnMap(null);
    if (document.getElementById("form-select-column-map"))
      document.getElementById("form-select-column-map").value = columnTitle;
    setColumnCluster(null);
    setFormColumnCluster(null);
    if (document.getElementById("form-select-column-cluster"))
      document.getElementById("form-select-column-cluster").value = columnTitle;
    setNumClusters(null);
    setFormNumClusters(null);
    if (document.getElementById("form-input-num-clusters"))
      document.getElementById("form-input-num-clusters").value = "";
    setTechnique(null);
    setFormTechnique(null);
    if (document.getElementById("form-select-technique"))
      document.getElementById("form-select-technique").value = techniqueTitle;
    setModel(null);
    setFormModel(null);
    if (document.getElementById("form-select-model"))
      document.getElementById("form-select-model").value = modelTitle;
    setNumIps(null);
    setFormNumIps(null);
    if (document.getElementById("form-input-num-ips"))
      document.getElementById("form-input-num-ips").value = "";
    setCountry(null);
    setFormCountry(null);
    if (document.getElementById("form-select-country"))
      document.getElementById("form-select-country").value = countryTitle;
    setColumnX(null);
    setFormColumnX(null);
    if (document.getElementById("form-select-column-x"))
      document.getElementById("form-select-column-x").value = columnTitle;
    setColumnY(null);
    setFormColumnY(null);
    if (document.getElementById("form-select-column-y"))
      document.getElementById("form-select-column-y").value = columnTitle;
  }

  return (
    <div className="w-full lg:w-1/3 lg:h-full p-4 bg-gray-100 gap-4 flex items-center flex-col justify-center">
      <form className="flex flex-col gap-4 w-full items-center">
        {feature ? (
          <select
            id="form-select-period"
            className="border-0 rounded-md w-full"
            defaultValue={periodTitle}
            onChange={handlePeriodChange}
            required
          >
            {[periodTitle, ...periodList].map((option, key) => (
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

        {isLoading ? (
          "Loading..."
        ) : formPeriod ? (
          <>
            {feature === "Gráficos de comportamento" ? (
              <>
                <select
                  id="form-select-ip"
                  className="border-0 rounded-md w-full"
                  defaultValue={ipTitle}
                  onChange={(event) => setFormIp(event.target.value)}
                  required
                >
                  {[ipTitle, ...ipList.toSorted()].map((option, key) => (
                    <option
                      key={key}
                      value={option}
                      disabled={option === ipTitle}
                    >
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  id="form-select-chart-type"
                  className="border-0 rounded-md w-full"
                  defaultValue={chartTypeTitle}
                  onChange={(event) => setFormChartType(event.target.value)}
                  required
                >
                  {[chartTypeTitle, ...chartTypeList].map((option, key) => (
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

            {feature === "Mapeamento de features" ? (
              <>
                <select
                  id="form-select-column-map"
                  className="border-0 rounded-md w-full"
                  defaultValue={columnTitle}
                  onChange={(event) => setColumnMap(event.target.value)}
                  required
                >
                  {[columnTitle, ...columnList].map((option, key) => (
                    <option
                      key={key}
                      value={option}
                      disabled={option === columnTitle}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </>
            ) : null}

            {feature === "Clusters" ? (
              <>
                <select
                  id="form-select-column-cluster"
                  className="border-0 rounded-md w-full"
                  defaultValue={columnTitle}
                  onChange={(event) => setFormColumnCluster(event.target.value)}
                  required
                >
                  {[columnTitle, ...columnList].map((option, key) => (
                    <option
                      key={key}
                      value={option}
                      disabled={option === columnTitle}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </>
            ) : null}

            {feature === "Seleção de características" ? (
              <>
                <select
                  id="form-select-technique"
                  className="border-0 rounded-md w-full"
                  defaultValue={techniqueTitle}
                  onChange={(event) => setFormTechnique(event.target.value)}
                  required
                >
                  {[techniqueTitle, ...techniqueList].map((option, key) => (
                    <option
                      key={key}
                      value={option}
                      disabled={option === techniqueTitle}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </>
            ) : null}

            {feature === "Importâncias para machine learning" ? (
              <>
                <select
                  id="form-select-model"
                  className="border-0 rounded-md w-full"
                  defaultValue={modelTitle}
                  onChange={(event) => setFormModel(event.target.value)}
                  required
                >
                  {[modelTitle, ...modelList].map((option, key) => (
                    <option
                      key={key}
                      value={option}
                      disabled={option === modelTitle}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </>
            ) : null}

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
                required
              />
            ) : null}

            {feature === "Reputação por país" ? (
              <>
                <select
                  id="form-select-country"
                  className="border-0 rounded-md w-full"
                  defaultValue={countryTitle}
                  onChange={(event) => setFormCountry(event.target.value)}
                  required
                >
                  {[
                    countryTitle,
                    ...Object.values(countryList).toSorted((a, b) =>
                      a.localeCompare(b, "pt-br")
                    ),
                  ].map((option, key) => (
                    <option
                      key={key}
                      value={option}
                      disabled={option === countryTitle}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </>
            ) : null}

            {feature === "Heatmap de ocorrência dos ips nos países" ? (
              <></>
            ) : null}
            {feature ===
            "Tabela de acurácia e tempo de treinamento dos modelos" ? (
              <></>
            ) : null}

            {feature === "Gráfico de dispersão" ? (
              <>
                <select
                  id="form-select-column-x"
                  className="border-0 rounded-md w-full"
                  defaultValue={columnXTitle}
                  onChange={(event) => setFormColumnX(event.target.value)}
                  required
                >
                  {[columnXTitle, ...columnXYList].map((option, key) => (
                    <option
                      key={key}
                      value={option}
                      disabled={option === columnXTitle}
                    >
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  id="form-select-column-y"
                  className="border-0 rounded-md w-full"
                  defaultValue={columnYTitle}
                  onChange={(event) => setColumnY(event.target.value)}
                  required
                >
                  {[columnYTitle, ...columnXYList].map((option, key) => (
                    <option
                      key={key}
                      value={option}
                      disabled={option === columnYTitle}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </>
            ) : null}

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
          </>
        ) : null}
      </form>
    </div>
  );
}
