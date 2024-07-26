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
  // Options
  const visualizationOptions = [
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
  ];

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
    "IBM_average history Score",
    "IBM_most common score",
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
    "IBM_average history Score",
    "IBM_most common score",
    "ALIENVAULT_reputation",
    "score_average_Mobat",
  ];

  // --- TESTE
  const ipOptions = [
    ...new Set([
      "190.123.237.28",
      "162.243.132.15",
      "43.156.75.234",
      "109.161.120.156",
      "189.90.181.225",
      "80.151.31.87",
      "222.12.38.178",
      "94.102.61.4",
      "223.236.89.2",
      "185.231.59.165",
      "20.151.171.161",
      "80.94.95.203",
      "218.92.0.51",
      "84.78.93.70",
      "122.160.115.28",
      "182.70.252.174",
      "141.98.11.55",
      "84.78.93.70",
      "141.98.11.67",
      "125.99.241.130",
      "103.143.171.228",
      "185.69.155.107",
      "141.98.11.55",
      "45.95.147.200",
      "182.70.252.174",
      "84.78.93.70",
      "45.95.147.200",
      "138.91.3.70",
      "165.232.70.143",
      "143.198.146.239",
    ]),
  ].toSorted((a, b) => a.localeCompare(b, "pt-br"));

  // --- REAL
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   setLoading(true);
  //   fetch(api)
  //     .then((response) => {
  //       if (response.ok) return response.json();
  //       throw new Error(`Failed to fetch data: ${response}`);
  //     })
  //     .then((data) => setData(data))
  //     .then(() => setLoading(false))
  //     .catch((error) => setError(error));
  // }, []);
  // const ipOptions = [...new Set(data.map((item) => item.ip))];

  const chartTypeOptions = [
    "Location",
    "Reports",
    "Score Average",
    "Last Report",
    "Time Period",
    "IBM Scores",
    "VirusTotal Stats",
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
    .toSorted((a, b) => a.localeCompare(b, "pt-br"));

  // --- REAL
  // const countryOptions = [...new Set(data.map((item) => item.country))];

  const techniqueOptions = [
    "Variance Threshold",
    "SelectKBest",
    "Lasso",
    "Mutual Information",
    "Correlation Matrix",
  ];

  // Setters
  const setVisualization = useFormStore((state) => state.setVisualization);
  const setClusterFeature = useFormStore((state) => state.setClusterFeature);
  const setClusterNum = useFormStore((state) => state.setClusterNum);
  const setDispersaoX = useFormStore((state) => state.setDispersaoX);
  const setDispersaoY = useFormStore((state) => state.setDispersaoY);
  const setComportamentoIp = useFormStore((state) => state.setComportamentoIp);
  const setComportamentoChart = useFormStore(
    (state) => state.setComportamentoChart
  );
  const setImportanciasModel = useFormStore(
    (state) => state.setImportanciasModel
  );
  const setMapeamentoFeature = useFormStore(
    (state) => state.setMapeamentoFeature
  );
  const setReputacaoCountry = useFormStore(
    (state) => state.setReputacaoCountry
  );
  const setScoreNum = useFormStore((state) => state.setScoreNum);
  const setSelecaoTechnique = useFormStore(
    (state) => state.setSelecaoTechnique
  );

  return (
    <>
      <aside className="w-full max-h-fit lg:w-1/3 lg:h-full p-8 bg-gray-100 gap-4 flex items-center flex-col overflow-y-scroll lg:overflow-y-auto lg:justify-center">
        <form className="flex flex-row flex-wrap lg:flex-col gap-4 w-full items-center justify-center">
          <Select
            title="Visualização"
            options={visualizationOptions}
            handle={(e) => {
              setVisualization(e.target.value);
            }}
          />
          {useFormStore((state) => state.visualization) === "Clusters" && (
            <Select
              title="Coluna para clusterização"
              options={featureOptions}
              handle={(e) => {
                setClusterFeature(e.target.value);
              }}
            />
          )}
          {useFormStore((state) => state.visualization) === "Clusters" && (
            <Input
              title="Número de clusters"
              handle={(e) => {
                setClusterNum(e.target.value);
              }}
              min={1}
              max={10}
            />
          )}
          {useFormStore((state) => state.visualization) ===
            "Gráfico de Dispersão" && (
            <Select
              title="Coluna eixo x dispersão"
              options={numericFeatureOptions}
              handle={(e) => {
                setDispersaoX(e.target.value);
              }}
              eixo={"X"}
            />
          )}
          {useFormStore((state) => state.visualization) ===
            "Gráfico de Dispersão" && (
            <Select
              title="Coluna eixo y dispersão"
              options={numericFeatureOptions}
              handle={(e) => {
                setDispersaoY(e.target.value);
              }}
              eixo={"Y"}
            />
          )}
          {useFormStore((state) => state.visualization) ===
            "Gráficos de Comportamento" && (
            <Select
              title="IP"
              options={ipOptions}
              handle={(e) => {
                setComportamentoIp(e.target.value);
              }}
            />
          )}
          {useFormStore((state) => state.visualization) ===
            "Gráficos de Comportamento" && (
            <Select
              title="Tipo de comportamento"
              options={chartTypeOptions}
              handle={(e) => {
                setComportamentoChart(e.target.value);
              }}
            />
          )}
          {useFormStore((state) => state.visualization) ===
            "Importâncias para Machine Learning" && (
            <Select
              title="Modelo"
              options={modelOptions}
              handle={(e) => {
                setImportanciasModel(e.target.value);
              }}
            />
          )}
          {useFormStore((state) => state.visualization) ===
            "Mapeamento das features" && (
            <Select
              title="Coluna mapeamento"
              options={featureOptions}
              handle={(e) => {
                setMapeamentoFeature(e.target.value);
              }}
            />
          )}
          {useFormStore((state) => state.visualization) ===
            "Reputação por País" && (
            <Select
              title="País reputação"
              options={countryOptions}
              handle={(e) => {
                setReputacaoCountry(e.target.value);
              }}
            />
          )}
          {useFormStore((state) => state.visualization) ===
            "Score Average Mobat dos IPs com maior variação" && (
            <Input
              title="Número de IPs"
              handle={(e) => {
                setScoreNum(e.target.value);
              }}
              min={1}
              max={10}
            />
          )}
          {useFormStore((state) => state.visualization) ===
            "Seleção de Características" && (
            <Select
              title="Técnica"
              options={techniqueOptions}
              handle={(e) => {
                setSelecaoTechnique(e.target.value);
              }}
            />
          )}
        </form>
      </aside>
    </>
  );
};

export default Sidebar;
