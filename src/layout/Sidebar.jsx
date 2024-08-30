import Select from "components/Select";
import Input from "components/Input";
import Loading from "layout/Loading";
import api from "services/api";
import useFormStore from "store/useFormStore";
import { useEffect, useState } from "react";

/**
 * Sidebar component of the application. It filters the data to be displayed in the main content.
 * @returns {React.JSX.Element} The aside tag, containing a form with all the inputs for filtering the data.
 */
const Sidebar = () => {
  // Stored values
  const visualization = useFormStore((state) => state.visualization);
  const year = useFormStore((state) => state.year);
  const semester = useFormStore((state) => state.semester);
  const month = useFormStore((state) => state.month);
  const day = useFormStore((state) => state.day);
  const ip = useFormStore((state) => state.ip);
  const feature = useFormStore((state) => state.feature);
  const clusterNum = useFormStore((state) => state.cluster.num);
  const scatterX = useFormStore((state) => state.scatter.x);
  const scatterY = useFormStore((state) => state.scatter.y);
  const behaviorChart = useFormStore((state) => state.behavior.chart);
  const importanceModel = useFormStore((state) => state.importance.model);
  const reputationCountry = useFormStore((state) => state.reputation.country);
  const scoreNum = useFormStore((state) => state.score.num);
  const selectionTechnique = useFormStore((state) => state.selection.technique);

  // Setters for the stored values
  const setVisualization = useFormStore((state) => state.setVisualization);
  const setYear = useFormStore((state) => state.setYear);
  const setSemester = useFormStore((state) => state.setSemester);
  const setMonth = useFormStore((state) => state.setMonth);
  const setDay = useFormStore((state) => state.setDay);
  const setIp = useFormStore((state) => state.setIp);
  const setFeature = useFormStore((state) => state.setFeature);
  const setClusterNum = useFormStore((state) => state.setClusterNum);
  const setScatterX = useFormStore((state) => state.setScatterX);
  const setScatterY = useFormStore((state) => state.setScatterY);
  const setBehaviorChart = useFormStore((state) => state.setBehaviorChart);
  const setImportanceModel = useFormStore((state) => state.setImportanceModel);
  const setReputationCountry = useFormStore(
    (state) => state.setReputationCountry
  );
  const setScoreNum = useFormStore((state) => state.setScoreNum);
  const setSelectionTechnique = useFormStore(
    (state) => state.setSelectionTechnique
  );

  // Titles for the inputs
  const visualizationTitle = "Visualização";
  const yearTitle = "Ano";
  const semesterTitle = "Semestre";
  const monthTitle = "Mês";
  const dayTitle = "Dia";
  const ipTitle = "IP";
  const featureTitle = "Característica";
  const clusterNumTitle = "Número de clusters";
  const scatterXTitle = "Característica do eixo x";
  const scatterYTitle = "Característica do eixo y";
  const behaviorChartTitle = "Comportamento";
  const importanceModelTitle = "Modelo";
  const reputationCountryTitle = "País";
  const scoreNumTitle = "Número de IPs";
  const selectionTechniqueTitle = "Técnica";

  // Handlers for the inputs
  const handleVisualization = (event) => {
    const visualization = Object.keys(visualizationOptions).find(
      (key) => visualizationOptions[key] === event.target.value
    );
    setVisualization(visualization || null);
  };
  const handleYear = (event) => {
    setYear(event.target.value || null);
  };
  const handleSemester = (event) => {
    const semester = Object.keys(semesterOptions).find(
      (key) => semesterOptions[key] === event.target.value
    );
    setSemester(semester || null);
  };
  const handleMonth = (event) => {
    const month = Object.keys(monthOptions).find(
      (key) => monthOptions[key] === event.target.value
    );
    setMonth(month || null);
  };
  const handleDay = (event) => {
    setDay(event.target.value || null);
  };
  const handleIp = (event) => {
    setIp(event.target.value || null);
  };
  const handleFeature = (event) => {
    setFeature(event.target.value || null);
  };
  const handleClusterNum = (event) => {
    setClusterNum(event.target.value || null);
  };
  const handleScatterX = (event) => {
    setScatterX(event.target.value || null);
  };
  const handleScatterY = (event) => {
    setScatterY(event.target.value || null);
  };
  const handleBehaviorChart = (event) => {
    setBehaviorChart(event.target.value || null);
  };
  const handleImportanceModel = (event) => {
    setImportanceModel(event.target.value || null);
  };
  const handleReputationCountry = (event) => {
    setReputationCountry(event.target.value || null);
  };
  const handleScoreNum = (event) => {
    setScoreNum(event.target.value || null);
  };
  const handleSelectionTechnique = (event) => {
    setSelectionTechnique(event.target.value || null);
  };

  // Options for visualization select
  const visualizationOptions = {
    cluster: "Cluster",
    scatter: "Gráfico de dispersão",
    behavior: "Gráficos de comportamento",
    heatmap: "Heatmap de ocorrências de IPs nos países",
    importance: "Importâncias para Machine Learning",
    mapping: "Mapeamento de características",
    reputation: "Reputação por país",
    score: "Score_Average_MoBAt dos IPs com maior variação",
    selection: "Seleção de características",
    table: "Tabela de acurácia e tempo de treinamento de modelos",
  };

  // Options for year select
  const yearOptions = [2023, 2024];

  // Options for semester select
  const semesterOptions = {
    First: "Primeiro",
    Second: "Segundo",
  };

  // Options for month select
  const monthOptions = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };

  // Number of days for each month
  const dayByMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Options for day select based on month
  const dayOptions = Array.from(
    { length: dayByMonth[month - 1] },
    (_, i) => i + 1
  );

  // Variable states for the API request of IP list
  // based on required year and optional month, day and semester
  const [ipUrl, setIpUrl] = useState(null);
  const [ipData, setIpData] = useState([]);
  const [ipLoading, setIpLoading] = useState(false);
  const [ipError, setIpError] = useState(null);

  // Set the IP URL based on the values
  useEffect(() => {
    setIpUrl(
      `dados-banco/?column_choice=IP&year=${year}${
        month ? `&month=${month}` : ``
      }${day ? `&day=${day}` : ``}${
        semester ? `&semester=${semester}` : ``
      }&view=json`
    );
  }, [year, month, day, semester]);

  // Request the IP data from the API
  useEffect(() => {
    if (ipUrl && year) {
      setIpLoading(true);
      api
        .get(ipUrl)
        .then((response) => response.data)
        .then((data) => setIpData(data))
        .then(() => setIpLoading(false))
        .catch((error) => {
          setIpError(error);
          console.error(error);
        });
    }
  }, [ipUrl]);

  // Options for IP select
  const ipOptions = [...new Set(ipData.map((item) => item.IP))].toSorted(
    (a, b) => a.toString().localeCompare(b, "pt-br", { numeric: true })
  );

  // Visualizations that change IP select colspan from 2 to 1
  const ipVisualizations = [
    "cluster",
    "behavior",
    "importance",
    "reputation",
    "score",
    "selection",
  ];

  // Visualizations that require feature value
  const featureVisualizations = ["cluster", "mapping"];

  // Options for feature select
  // required by featureVisualizations
  const featureOptions = [
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
    "IBM_average_history_Score",
    "IBM_most_common_score",
    "virustotal_asn",
    "SHODAN_asn",
    "SHODAN_isp",
    "ALIENVAULT_reputation",
    "ALIENVAULT_asn",
    "score_average_Mobat",
  ];

  // Options for scatter X and Y selects
  const numericFeatureOptions = [
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
    "IBM_average_history_Score",
    "IBM_most_common_score",
    "ALIENVAULT_reputation",
    "score_average_Mobat",
  ];

  // Options for behavior chart select
  const behaviorOptions = [
    "Localização",
    "Relatórios",
    "Média de pontuação",
    "Último relatório",
    "Período do dia",
    "Pontuações IBM",
    "Estatísticas do VirusTotal",
  ];

  // Options for importance model select
  const modelOptions = [
    "Gradient Boosting Regressor",
    "Random Forest Regressor",
    "Extra Trees Regressor",
    "AdaBoost Regressor",
    "XGBoost Regressor",
    "ElasticNet",
  ];

  // Variable states for the API request of country list
  // based on required year and optional month, day, semester and ip
  const [countryUrl, setCountryUrl] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [countryLoading, setCountryLoading] = useState(false);
  const [countryError, setCountryError] = useState(null);

  // Set the country URL based on the values
  useEffect(() => {
    setCountryUrl(
      `dados-banco/?column_choice=abuseipdb_country_code&year=${year}${
        month ? `&month=${month}` : ``
      }${day ? `&day=${day}` : ``}${semester ? `&semester=${semester}` : ``}${
        ip ? `&ip_address=${ip}` : ``
      }&view=json`
    );
  }, [year, month, day, semester, ip]);

  // Request the country data from the API
  useEffect(() => {
    if (countryUrl && year) {
      setCountryLoading(true);
      api
        .get(countryUrl)
        .then((response) => response.data)
        .then((data) => setCountryData(data))
        .then(() => setCountryLoading(false))
        .catch((error) => {
          setCountryError(error);
          console.error(error);
        });
    }
  }, [countryUrl]);

  // There is no support for LU, RO, AT, BE, LV
  const countryNames = {
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
    None: "Nenhum",
    IE: "Irlanda",
    FI: "Finlândia",
    ZA: "África do Sul",
    IT: "Itália",
    PH: "Filipinas",
    CR: "Costa Rica",
    CH: "Suíça",
  };

  // Options for country select
  const countryOptions = [
    ...new Set(
      countryData
        .filter(
          (item) =>
            Object.keys(countryNames).includes(item.abuseipdb_country_code) &&
            item.abuseipdb_country_code !== "None"
        )
        .map((item) => countryNames[item.abuseipdb_country_code])
    ),
  ].toSorted((a, b) => a.localeCompare(b, "pt-br"));

  // Options for selection technique select
  const techniqueOptions = [
    "Variance Threshold",
    "SelectKBest",
    "Lasso",
    "Mutual Information",
    "Matriz de correlação",
  ];

  // Reset some values when visualization changes
  useEffect(() => {
    setFeature(null);
    setClusterNum(null);
    setScatterX(null);
    setScatterY(null);
    setBehaviorChart(null);
    setImportanceModel(null);
    setReputationCountry(null);
    setScoreNum(null);
    setSelectionTechnique(null);
  }, [visualization]);

  // Render the sidebar form with inputs based on the visualization selected
  return (
    <>
      <aside className="w-full max-h-[1400px] lg:w-1/3 lg:h-full p-4 lg:p-8 bg-gray-100 gap-4 flex items-center flex-col lg:justify-center">
        <form className="grid grid-cols-2 gap-4 w-full grid-flow-row">
          <Select
            title={visualizationTitle}
            options={Object.values(visualizationOptions)}
            handle={handleVisualization}
            colspan={2}
            required={true}
            default={!visualization}
            defaultValue={visualization || visualizationTitle}
          />
          <Select
            title={yearTitle}
            options={yearOptions}
            handle={handleYear}
            colspan={1}
            required={true}
            default={!year}
            defaultValue={year || yearTitle}
          />
          <Select
            title={semesterTitle}
            options={Object.values(semesterOptions)}
            handle={handleSemester}
            colspan={1}
            required={true}
            default={!semester}
            defaultValue={semester || semesterTitle}
          />
          <Select
            title={monthTitle}
            options={Object.values(monthOptions)}
            handle={handleMonth}
            colspan={1}
            defaultValue={month || monthTitle}
          />
          <Select
            title={dayTitle}
            options={dayOptions}
            handle={handleDay}
            colspan={1}
            defaultValue={day || dayTitle}
          />
          {ipLoading ? (
            <Loading />
          ) : (
            <Select
              title={ipTitle}
              options={ipOptions}
              handle={handleIp}
              colspan={ipVisualizations.includes(visualization) ? 1 : 2}
              defaultValue={ip || ipTitle}
            />
          )}
          {visualization === "cluster" && (
            <Input
              title={clusterNumTitle}
              handle={handleClusterNum}
              min={1}
              max={10}
              required={true}
              default={!clusterNum}
              defaultValue={clusterNum || clusterNumTitle}
            />
          )}
          {featureVisualizations.includes(visualization) && (
            <Select
              title={featureTitle}
              options={featureOptions}
              handle={handleFeature}
              colspan={2}
              required={true}
              default={!feature}
              defaultValue={feature || featureTitle}
            />
          )}
          {visualization === "scatter" && (
            <Select
              title={scatterXTitle}
              options={numericFeatureOptions}
              handle={handleScatterX}
              axis={"X"}
              colspan={2}
              required={true}
              default={!scatterX}
              defaultValue={scatterX || scatterXTitle}
            />
          )}
          {visualization === "scatter" && (
            <Select
              title={scatterYTitle}
              options={numericFeatureOptions}
              handle={handleScatterY}
              axis={"Y"}
              colspan={2}
              required={true}
              default={!scatterY}
              defaultValue={scatterY || scatterYTitle}
            />
          )}
          {visualization === "behavior" && (
            <Select
              title={behaviorChartTitle}
              options={behaviorOptions}
              handle={handleBehaviorChart}
              required={true}
              default={!behaviorChart}
              defaultValue={behaviorChart || behaviorChartTitle}
            />
          )}
          {visualization === "importance" && (
            <Select
              title={importanceModelTitle}
              options={modelOptions}
              handle={handleImportanceModel}
              colspan={1}
              required={true}
              default={!importanceModel}
              defaultValue={importanceModel || importanceModelTitle}
            />
          )}
          {countryLoading ? (
            <Loading />
          ) : (
            visualization === "reputation" && (
              <Select
                title={reputationCountryTitle}
                options={countryOptions}
                handle={handleReputationCountry}
                colspan={1}
                required={true}
                default={!reputationCountry}
                defaultValue={reputationCountry || reputationCountryTitle}
              />
            )
          )}
          {visualization === "score" && (
            <Input
              title={scoreNumTitle}
              handle={handleScoreNum}
              min={1}
              max={10}
              colspan={1}
              required={true}
              default={!scoreNum}
              defaultValue={scoreNum || scoreNumTitle}
            />
          )}
          {visualization === "selection" && (
            <Select
              title={selectionTechniqueTitle}
              options={techniqueOptions}
              handle={handleSelectionTechnique}
              colspan={1}
              required={true}
              default={!selectionTechnique}
              defaultValue={selectionTechnique || selectionTechniqueTitle}
            />
          )}
        </form>
      </aside>
    </>
  );
};

export default Sidebar;
