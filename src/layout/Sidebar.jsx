import Select from "components/Select";
import Input from "components/Input";
import useFormStore from "store/useFormStore";
import { useEffect, useState } from "react";
import api from "services/api";
import { data1, data2, data3 } from "tests/data";
import { iso31661 } from "iso-3166";
import usePreferenceStore from "store/usePreferenceStore";
import { useTranslation } from "react-i18next";

/**
 * Sidebar component of the application.
 * @returns {React.JSX.Element} The aside tag, containing all the inputs and form components for filtering the data.
 */
const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const language = usePreferenceStore((state) => state.language);

  // Options
  const visualizationOptions = [
    "cluster",
    "scatter",
    "behavior",
    "heatmap",
    "importance",
    "mapping",
    "reputation",
    "score",
    "selection",
    "table",
  ];
  // const visualizationOptions = {
  //   en: {
  //     cluster: "Cluster",
  //     scatter: "Scatter plot",
  //     behavior: "Behavior graphs",
  //     heatmap: "Heatmap of occurrence of IPs per country",
  //     importance: "Importance for machine learning",
  //     mapping: "Feature mapping",
  //     reputation: "Reputation per country",
  //     score: "MoBAt average score of IPs with the highest variation",
  //     selection: "Feature selection",
  //     table: "Model accuracy and training time table",
  //   },
  //   pt: {
  //     cluster: "Cluster",
  //     scatter: "Gráfico de dispersão",
  //     behavior: "Gráficos de comportamento",
  //     heatmap: "Heatmap de ocorrência dos IPs nos países",
  //     importance: "Importâncias para machine learning",
  //     mapping: "Mapeamento das features",
  //     reputation: "Reputação por país",
  //     score: "Score average MoBAt dos IPs com maior variação",
  //     selection: "Seleção de características",
  //     table: "Tabela de acurácia e tempo de treinamento de modelos",
  //   },
  // };

  const yearOptions = ["2023", "2024"];

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
  ].toSorted((a, b) => a.localeCompare(b, "en-us"));

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

  const behaviorOptions = {
    en: {
      location: "Location",
      reports: "Reports",
      scoreAverage: "Score Average",
      lastReport: "Last Report",
      timePeriod: "Time Period",
      ibmScores: "IBM Scores",
      virusTotalStats: "VirusTotal Stats",
    },
    pt: {
      location: "Localização",
      reports: "Relatórios",
      scoreAverage: "Média de pontuação",
      lastReport: "Último relatório",
      timePeriod: "Período de tempo",
      ibmScores: "Pontuações IBM",
      virusTotalStats: "Estatísticas do VirusTotal",
    },
  };

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
    .toSorted((a, b) => a.localeCompare(b, "en-us"));

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

  // Handlers
  const handleVisualization = (e) => {
    setVisualization(
      Object.keys(t(`visualization`, { returnObjects: true })).find(
        (key) => t(`visualization.${key}`) === e.target.value
      )
    );
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleBehavior = (e) => {
    setBehaviorChart(
      Object.keys(behaviorOptions[language]).find(
        (key) => behaviorOptions[language][key] === e.target.value
      )
    );
  };

  return (
    <>
      <aside className="w-full max-h-fit lg:w-1/3 lg:h-full p-8 bg-gray-100 gap-4 flex items-center flex-col  lg:justify-center">
        <form className="flex flex-row flex-wrap lg:flex-col gap-4 w-full items-center justify-center">
          <Select
            title="Select a visualization"
            options={visualizationOptions.map((option) => {
              return t(`visualization.${option}`);
            })}
            handle={handleVisualization}
          />
          <Select
            title="Select a year"
            options={Object.values(yearOptions)}
            handle={handleYear}
          />
          {useFormStore((state) => state.visualization) === "cluster" && (
            <Select
              title="Select a feature"
              options={numericFeatureOptions}
              handle={(e) => {
                setClusterFeature(e.target.value);
              }}
            />
          )}
          {useFormStore((state) => state.visualization) === "cluster" && (
            <Input
              title="Select the number of clusters"
              handle={(e) => {
                setClusterNum(e.target.value);
              }}
              min={1}
              max={10}
            />
          )}
          {useFormStore((state) => state.visualization) === "scatter" && (
            <Select
              title="Select a feature for x-axis"
              options={numericFeatureOptions}
              handle={(e) => {
                setScatterX(e.target.value);
              }}
              axis={"X"}
            />
          )}
          {useFormStore((state) => state.visualization) === "scatter" && (
            <Select
              title="Select a feature for y-axis"
              options={numericFeatureOptions}
              handle={(e) => {
                setScatterY(e.target.value);
              }}
              axis={"Y"}
            />
          )}
          {useFormStore((state) => state.visualization) === "behavior" && (
            <Select
              title="Select an IP"
              options={ipOptions}
              handle={(e) => {
                setBehaviorIp(e.target.value);
              }}
            />
          )}
          {useFormStore((state) => state.visualization) === "behavior" && (
            <Select
              title="Select a behavior"
              options={Object.values(behaviorOptions[language])}
              handle={handleBehavior}
            />
          )}
          {useFormStore((state) => state.visualization) === "importance" && (
            <Select
              title="Select a model"
              options={modelOptions}
              handle={(e) => {
                setImportanceModel(e.target.value);
              }}
            />
          )}
          {useFormStore((state) => state.visualization) === "mapping" && (
            <Select
              title="Select a feature"
              options={featureOptions}
              handle={(e) => {
                setMappingFeature(e.target.value);
              }}
            />
          )}
          {useFormStore((state) => state.visualization) === "reputation" && (
            <Select
              title="Select a country"
              options={countryOptions}
              handle={(e) => {
                setReputationCountry(e.target.value);
              }}
            />
          )}
          {useFormStore((state) => state.visualization) === "score" && (
            <Input
              title="Select the number of IPs"
              handle={(e) => {
                setScoreNum(e.target.value);
              }}
              min={1}
              max={10}
            />
          )}
          {useFormStore((state) => state.visualization) === "selection" && (
            <Select
              title="Select a machine learning technique"
              options={techniqueOptions}
              handle={(e) => {
                setSelectionTechnique(e.target.value);
              }}
            />
          )}
        </form>
      </aside>
    </>
  );
};

export default Sidebar;
