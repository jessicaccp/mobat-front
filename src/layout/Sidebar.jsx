// To-do:
// - change all options to a dictionary
// - add handle functions to every component
// - give titles a null value
// - set when component is required
// - remove duplicate components

import Select from "components/Select";
import Input from "components/Input";
import useFormStore from "store/useFormStore";
import { useEffect, useState } from "react";
import api from "services/api";
import { data1, data2, data3 } from "tests/data";
import { iso31661 } from "iso-3166";

/**
 * Sidebar component of the application.
 * @returns {React.JSX.Element} The aside tag, containing all the inputs and form components for filtering the data.
 */
const Sidebar = () => {
  const visualization = useFormStore((state) => state.visualization);
  const visualizationTitle = "Visualização";
  const year = useFormStore((state) => state.year);
  const yearTitle = "Ano";
  const semester = useFormStore((state) => state.semester);
  const semesterTitle = "Semestre";
  const month = useFormStore((state) => state.month);
  const monthTitle = "Mês";
  const day = useFormStore((state) => state.day);
  const dayTitle = "Dia";
  const ip = useFormStore((state) => state.ip);
  const ipTitle = "IP";
  const feature = useFormStore((state) => state.feature);
  const featureTitle = "Característica";
  // const clusterFeature = useFormStore((state) => state.clusterFeature);
  // const clusterFeatureTitle = "Característica";
  const clusterNum = useFormStore((state) => state.clusterNum);
  const clusterNumTitle = "Número de clusters";
  // const clusterIp = useFormStore((state) => state.clusterIp);
  // const clusterIpTitle = "IP";
  const scatterX = useFormStore((state) => state.scatterX);
  const scatterXTitle = "Característica para o eixo x";
  const scatterY = useFormStore((state) => state.scatterY);
  const scatterYTitle = "Característica para o eixo y";
  // const behaviorIp = useFormStore((state) => state.behaviorIp);
  // const behaviorIpTitle = "IP";
  const behaviorChart = useFormStore((state) => state.behaviorChart);
  const behaviorChartTitle = "Comportamento";
  const importanceModel = useFormStore((state) => state.importanceModel);
  const importanceModelTitle = "Modelo";
  // const mappingFeature = useFormStore((state) => state.mappingFeature);
  // const mappingFeatureTitle = "Característica";
  const reputationCountry = useFormStore((state) => state.reputationCountry);
  const reputationCountryTitle = "País";
  const scoreNum = useFormStore((state) => state.scoreNum);
  const scoreNumTitle = "Número de IPs";
  const selectionTechnique = useFormStore((state) => state.selectionTechnique);
  const selectionTechniqueTitle = "Técnica de Machine Learning";

  // Options
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

  const semesterOptions = {
    First: "Primeiro",
    Second: "Segundo",
  };

  const yearOptions = [2023, 2024];

  const monthOptions = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dayOptions = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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

  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(
      `dados-banco/?column_choice=IP&year=${year}${
        month ? `&month=${month}` : ``
      }${day ? `&day=${day}` : ``}${semester ? `&semester=${semester}` : ``}${
        ip ? `&ip_address=${ip}` : ``
      }&view=json`
    );
  }, [year, month, day, semester, ip]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url && year) {
      setLoading(true);
      api
        .get(url)
        .then((response) => response.data)
        .then((data) => setData(data))
        .then(() => setLoading(false))
        .catch((error) => {
          setError(error);
          console.error(error);
        });
    }
  }, [url]);

  const ipOptions = [...new Set(data.map((item) => item.IP))].toSorted((a, b) =>
    a.toString().localeCompare(b, "pt-br", { numeric: true })
  );
  console.log(data, ipOptions);

  const behaviorOptions = [
    "Localização",
    "Relatórios",
    "Média de pontuação",
    "Último relatório",
    "Período do dia",
    "Pontuações IBM",
    "Estatísticas do VirusTotal",
  ];

  const modelOptions = [
    "Gradient Boosting Regressor",
    "Random Forest Regressor",
    "Extra Trees Regressor",
    "AdaBoost Regressor",
    "XGBoost Regressor",
    "ElasticNet",
  ];

  // --- TESTE
  const countryOptions = [
    ...new Set([...data1, ...data2, ...data3].map((item) => item[3])),
  ]
    .map(
      (alpha2) =>
        iso31661.filter((country) => country.alpha2 === alpha2)[0].name
    )
    .toSorted((a, b) => a.toString().localeCompare(b, "pt-br"));

  // --- REAL
  // const countryOptions = [...new Set(data.map((item) => item.country))];

  const techniqueOptions = [
    "Variance Threshold",
    "SelectKBest",
    "Lasso",
    "Mutual Information",
    "Matriz de correlação",
  ];

  // Setters
  const setVisualization = useFormStore((state) => state.setVisualization);
  const setClusterFeature = useFormStore((state) => state.setClusterFeature);
  const setClusterNum = useFormStore((state) => state.setClusterNum);
  const setClusterIp = useFormStore((state) => state.setClusterIp);
  const setScatterX = useFormStore((state) => state.setScatterX);
  const setScatterY = useFormStore((state) => state.setScatterY);
  const setBehaviorIp = useFormStore((state) => state.setBehaviorIp);
  const setBehaviorChart = useFormStore((state) => state.setBehaviorChart);
  const setImportanceModel = useFormStore((state) => state.setImportanceModel);
  const setMappingFeature = useFormStore((state) => state.setMappingFeature);
  const setReputationCountry = useFormStore(
    (state) => state.setReputationCountry
  );
  const setScoreNum = useFormStore((state) => state.setScoreNum);
  const setSelectionTechnique = useFormStore(
    (state) => state.setSelectionTechnique
  );
  const setYear = useFormStore((state) => state.setYear);
  const setMonth = useFormStore((state) => state.setMonth);
  const setDay = useFormStore((state) => state.setDay);
  const setSemester = useFormStore((state) => state.setSemester);

  useEffect(() => {
    setClusterFeature(null);
    setClusterNum(null);
    setClusterIp(null);
    setScatterX(null);
    setScatterY(null);
    setBehaviorIp(null);
    setBehaviorChart(null);
    setImportanceModel(null);
    setMappingFeature(null);
    setReputationCountry(null);
    setScoreNum(null);
    setSelectionTechnique(null);
  }, [visualization]);

  // Handlers
  const handleVisualization = (event) => {
    setVisualization(
      Object.keys(visualizationOptions).find(
        (key) => visualizationOptions[key] === event.target.value
      )
    );
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };

  const handleSemester = (event) => {
    setSemester(
      Object.keys(semesterOptions).find(
        (key) => semesterOptions[key] === event.target.value
      )
    );
  };

  const handleMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleDay = (event) => {
    setDay(e.target.value);
  };

  const handleIp = (event) => {};

  const handleClusterFeature = (event) => {};
  const handleClusterNum = (event) => {};
  const handleScatterX = (event) => {};
  const handleScatterY = (event) => {};
  const handleBehaviorType = (event) => {};
  const handleImportanceModel = (event) => {};
  const handleMappingFeature = (event) => {};
  const handleReputationCountry = (event) => {};
  const handleScoreNum = (event) => {};
  const handleSelectionTechnique = (event) => {};

  return (
    <>
      <aside className="w-full max-h-[1400px] lg:w-1/3 lg:h-full p-4 lg:p-8 bg-gray-100 gap-4 flex items-center flex-col lg:justify-center">
        <form className="grid grid-cols-2 gap-4 w-full grid-flow-row">
          <Select
            title="Visualização"
            options={Object.values(visualizationOptions)}
            handle={handleVisualization}
            fullWidth={true}
            required={true}
          />
          <Select
            title="Ano"
            options={yearOptions}
            handle={handleYear}
            required={true}
          />
          <Select
            title="Semestre"
            options={Object.values(semesterOptions)}
            handle={handleSemester}
            required={true}
          />
          <Select title="Mês" options={monthOptions} handle={handleMonth} />
          <Select title="Dia" options={dayOptions} handle={handleDay} />
          <Select title="IP" options={ipOptions} handle={handleDay} />

          {useFormStore((state) => state.visualization) === "cluster" && (
            <Select
              title="Característica"
              options={numericFeatureOptions}
              handle={(e) => {
                setClusterFeature(e.target.value);
              }}
              fullWidth={true}
              required={true}
            />
          )}
          {useFormStore((state) => state.visualization) === "cluster" && (
            <Input
              title="Número de clusters"
              handle={(e) => {
                setClusterNum(e.target.value);
              }}
              min={1}
              max={10}
              required={true}
            />
          )}
          {useFormStore((state) => state.visualization) === "scatter" && (
            <Select
              title="Característica para o eixo x"
              options={numericFeatureOptions}
              handle={(e) => {
                setScatterX(e.target.value);
              }}
              axis={"X"}
              fullWidth={true}
              required={true}
            />
          )}
          {useFormStore((state) => state.visualization) === "scatter" && (
            <Select
              title="Característica para o eixo y"
              options={numericFeatureOptions}
              handle={(e) => {
                setScatterY(e.target.value);
              }}
              axis={"Y"}
              fullWidth={true}
              required={true}
            />
          )}
          {useFormStore((state) => state.visualization) === "behavior" && (
            <Select
              title="Comportamento"
              options={behaviorOptions}
              handle={(e) => {
                setBehaviorChart(e.target.value);
              }}
              required={true}
            />
          )}
          {useFormStore((state) => state.visualization) === "importance" && (
            <Select
              title="Modelo"
              options={modelOptions}
              handle={(e) => {
                setImportanceModel(e.target.value);
              }}
              fullWidth={true}
              required={true}
            />
          )}
          {useFormStore((state) => state.visualization) === "reputation" && (
            <Select
              title="País"
              options={countryOptions}
              handle={(e) => {
                setReputationCountry(e.target.value);
              }}
              fullWidth={true}
              required={true}
            />
          )}
          {useFormStore((state) => state.visualization) === "score" && (
            <Input
              title="Número de IPs"
              handle={(e) => {
                setScoreNum(e.target.value);
              }}
              min={1}
              max={10}
              fullWidth={true}
              required={true}
            />
          )}
          {useFormStore((state) => state.visualization) === "selection" && (
            <Select
              title="Técnica de Machine Learning"
              options={techniqueOptions}
              handle={(e) => {
                setSelectionTechnique(e.target.value);
              }}
              fullWidth={true}
              required={true}
            />
          )}
        </form>
      </aside>
    </>
  );
};

export default Sidebar;
