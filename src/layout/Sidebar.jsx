import { useState } from "react";
import Select from "components/Select";
import Input from "components/Input";

/**
 * Sidebar component of the application.
 * @returns {React.JSX.Element} The aside tag, containing all the inputs and form components for filtering the data.
 */
const Sidebar = () => {
  const [visualization, setVisualization] = useState(null);
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
    "Upload da Tabela dos IPs do período",
  ];
  const handleVisualization = (event) => {
    setVisualization(event.target.value);
  };

  const [featureCluster, setFeatureCluster] = useState(null);
  const [numCluster, setNumCluster] = useState(null);
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
  const handleFeatureCluster = (event) => {
    setFeatureCluster(event.target.value);
  };
  const handleNumCluster = (event) => {
    setNumCluster(event.target.value);
  };

  const [featureX, setFeatureX] = useState(null);
  const [featureY, setFeatureY] = useState(null);
  const handleFeatureX = (event) => {
    setFeatureX(event.target.value);
  };
  const handleFeatureY = (event) => {
    setFeatureY(event.target.value);
  };

  const [ip, setIp] = useState(null);
  const [chartType, setChartType] = useState(null);
  const ipOptions = [];
  const chartTypeOptions = [
    "Location",
    "Reports",
    "Score Average",
    "Last Report",
    "Time Period",
    "IBM Scores",
    "VirusTotal Stats",
  ];
  const handleIp = (event) => {
    setIp(event.target.value);
  };
  const handleChartType = (event) => {
    setChartType(event.target.value);
  };

  const [model, setModel] = useState(null);
  const modelOptions = [];
  const handleModel = (event) => {
    setModel(event.target.value);
  };
  const [featureMap, setFeatureMap] = useState(null);
  const handleFeatureMap = (event) => {
    setFeatureMap(event.target.value);
  };
  const [country, setCountry] = useState(null);
  const countryOptions = [];
  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  const [numIP, setNumIP] = useState(null);
  const handleNumIP = (event) => {
    setNumIP(event.target.value);
  };
  const [technique, setTechnique] = useState(null);
  const techniqueOptions = [];
  const handleTechnique = (event) => {
    setTechnique(event.target.value);
  };

  return (
    <>
      <aside className="w-full max-h-fit lg:w-1/3 lg:h-full p-8 bg-gray-100 gap-4 flex items-center flex-col overflow-y-scroll lg:overflow-y-auto">
        <form className="flex flex-row flex-wrap lg:flex-col gap-4 w-full items-center justify-center">
          <Select
            title="Visualização"
            options={visualizationOptions}
            handle={handleVisualization}
          />

          <Select
            title="Coluna do cluster"
            options={featureOptions}
            handle={handleFeatureCluster}
          />

          <Input
            title="Número de clusters"
            handle={handleNumCluster}
            min={1}
            max={10}
          />

          <Select
            title="Coluna eixo x dispersão"
            options={featureOptions}
            handle={handleFeatureX}
          />

          <Select
            title="Coluna eixo y dispersão"
            options={featureOptions}
            handle={handleFeatureY}
          />

          <Select title="IP" options={ipOptions} handle={handleIp} />

          <Select
            title="Tipo de comportamento"
            options={chartTypeOptions}
            handle={handleChartType}
          />

          <Select title="Modelo" options={modelOptions} handle={handleModel} />

          <Select
            title="Coluna mapeamento"
            options={featureOptions}
            handle={handleFeatureMap}
          />

          <Select
            title="País mapeamento"
            options={countryOptions}
            handle={handleCountry}
          />

          <Input title="Número de IPs" handle={handleNumIP} min={1} max={10} />

          <Select
            title="Técnica"
            options={techniqueOptions}
            handle={handleTechnique}
          />
        </form>
      </aside>
    </>
  );
};

export default Sidebar;
