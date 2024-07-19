import Select from "components/Select";
import Input from "components/Input";
import useFormStore from "store/useFormStore";

/**
 * Sidebar component of the application.
 * @returns {React.JSX.Element} The aside tag, containing all the inputs and form components for filtering the data.
 */
const Sidebar = () => {
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
  const setVisualization = useFormStore((state) => state.setVisualization);

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
  const setClusterFeature = useFormStore((state) => state.setClusterFeature);
  const setClusterNum = useFormStore((state) => state.setClusterNum);

  const setDispersaoX = useFormStore((state) => state.setDispersaoX);
  const setDispersaoY = useFormStore((state) => state.setDispersaoY);

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
  const setComportamentoIp = useFormStore((state) => state.setComportamentoIp);
  const setComportamentoChart = useFormStore(
    (state) => state.setComportamentoChart
  );

  const modelOptions = [];
  const setImportanciasModel = useFormStore(
    (state) => state.setImportanciasModel
  );

  const setMapeamentoFeature = useFormStore(
    (state) => state.setMapeamentoFeature
  );

  const countryOptions = [];
  const setReputacaoCountry = useFormStore(
    (state) => state.setReputacaoCountry
  );

  const setScoreNum = useFormStore((state) => state.setScoreNum);

  const techniqueOptions = [];
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

          <Select
            title="Coluna do cluster"
            options={featureOptions}
            handle={(e) => {
              setClusterFeature(e.target.value);
            }}
          />

          <Input
            title="Número de clusters"
            handle={(e) => {
              setClusterNum(e.target.value);
            }}
            min={1}
            max={10}
          />

          <Select
            title="Coluna eixo x dispersão"
            options={featureOptions}
            handle={(e) => {
              setDispersaoX(e.target.value);
            }}
          />

          <Select
            title="Coluna eixo y dispersão"
            options={featureOptions}
            handle={(e) => {
              setDispersaoY(e.target.value);
            }}
          />

          <Select
            title="IP"
            options={ipOptions}
            handle={(e) => {
              setComportamentoIp(e.target.value);
            }}
          />

          <Select
            title="Tipo de comportamento"
            options={chartTypeOptions}
            handle={(e) => {
              setComportamentoChart(e.target.value);
            }}
          />

          <Select
            title="Modelo"
            options={modelOptions}
            handle={(e) => {
              setImportanciasModel(e.target.value);
            }}
          />

          <Select
            title="Coluna mapeamento"
            options={featureOptions}
            handle={(e) => {
              setMapeamentoFeature(e.target.value);
            }}
          />

          <Select
            title="País mapeamento"
            options={countryOptions}
            handle={(e) => {
              setReputacaoCountry(e.target.value);
            }}
          />

          <Input
            title="Número de IPs"
            handle={(e) => {
              setScoreNum(e.target.value);
            }}
            min={1}
            max={10}
          />

          <Select
            title="Técnica"
            options={techniqueOptions}
            handle={(e) => {
              setSelecaoTechnique(e.target.value);
            }}
          />
        </form>
      </aside>
    </>
  );
};

export default Sidebar;
