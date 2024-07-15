import { useEffect, useState } from "react";
import api from "./services/api";
import Comportamento from "./features/Comportamento";
import Mapeamento from "./features/Mapeamento";
import Clusters from "./features/Clusters";
import Selecao from "./features/Selecao";
import Importancias from "./features/Importancias";
import ScoreAverage from "./features/ScoreAverage";
import Reputacao from "./features/Reputacao";
import Heatmap from "./features/Heatmap";
import Tabela from "./features/Tabela";
import Dispersao from "./features/Dispersao";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Visualization -- states, options and handlers
  const [visualization, setVisualization] = useState(null);
  const [visualizationSelected, setVisualizationSelected] = useState(null);
  const visualizationTitle = "Selecionar visualização";
  const visualizationOptions = {
    "Gráficos de comportamento": <Comportamento />,
    "Mapeamento de features": <Mapeamento />,
    Clusters: <Clusters />,
    "Seleção de características": <Selecao />,
    "Importâncias para machine learning": <Importancias />,
    "Score average mobat dos ips com maior variação": <ScoreAverage />,
    "Reputação por país": <Reputacao />,
    "Heatmap de ocorrência dos ips nos países": <Heatmap />,
    "Tabela de acurácia e tempo de treinamento dos modelos": <Tabela />,
    "Gráfico de dispersão": <Dispersao />,
  };
  const handleVisualizationSelect = (event) => {
    setVisualizationSelected(event.target.value);
  };
  const handleVisualizationButton = () => {
    setVisualization(visualizationSelected);
  };

  // Gráficos de comportamento -- inputs
  const [ip, setIp] = useState(null);
  const [ipSelected, setIpSelected] = useState(null);
  const ipTitle = "Selecionar IP";
  const [ipOptions, setIpOptions] = useState([]);
  const handleIpSelect = (event) => {
    setIpSelected(event.target.value);
  };

  useEffect(() => {
    if (visualization === "Gráficos de comportamento") {
      setLoading(true);
      fetch(api)
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error(`Failed to fetch data: ${response}`);
        })
        .then((data) => setIpOptions(data))
        .then(() => setLoading(false))
        .catch((error) => setError(error));
    }
  }, [visualization]);

  const [chartType, setChartType] = useState(null);
  const [chartTypeSelected, setChartTypeSelected] = useState(null);
  const chartTypeTitle = "Selecionar tipo de gráfico";
  const chartTypeOptions = [
    "Location",
    "Reports",
    "Score average",
    "Last report",
    "Time period",
    "IBM scores",
    "VirusTotal stats",
  ];
  const handleChartTypeSelect = (event) => {
    setChartTypeSelected(event.target.value);
  };

  return (
    <>
      <header>
        <form>
          <select
            defaultValue={visualizationTitle}
            onChange={handleVisualizationSelect}
            className="p-4"
          >
            {[
              visualizationTitle,
              ...Object.keys(visualizationOptions).toSorted((a, b) =>
                a.localeCompare(b, "pt-br")
              ),
            ].map((option, key) => (
              <option
                key={key}
                value={option}
                disabled={option === visualizationTitle}
              >
                {option}
              </option>
            ))}
          </select>
          <input
            type="button"
            onClick={handleVisualizationButton}
            value="OK"
            className="p-4 bg-slate-50"
          />
        </form>
      </header>
      <main>
        <form>
          {visualization === "Gráficos de comportamento" ? (
            <>
              <select defaultValue={ipTitle} onChange={handleIpSelect}>
                {[
                  ipTitle,
                  ...ipOptions.toSorted((a, b) => a.localeCompare(b, "pt-br")),
                ].map((option, key) => (
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
                defaultValue={chartTypeTitle}
                onChange={handleChartTypeSelect}
              >
                {[
                  chartTypeTitle,
                  ...chartTypeOptions.toSorted((a, b) =>
                    a.localeCompare(b, "pt-br")
                  ),
                ].map((option, key) => (
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
          {visualization === "Mapeamento de features" ? null : null}
          {visualization === "Clusters" ? null : null}
          {visualization === "Seleção de características" ? null : null}
          {visualization === "Importâncias para machine learning" ? null : null}
          {visualization === "Score average mobat dos ips com maior variação"
            ? null
            : null}
          {visualization === "Reputação por país" ? null : null}
          {visualization === "Heatmap de ocorrência dos ips nos países"
            ? null
            : null}
          {visualization ===
          "Tabela de acurácia e tempo de treinamento dos modelos"
            ? null
            : null}
          {visualization === "Gráfico de dispersão" ? null : null}
          {visualization ? null : null}
        </form>
        <section>{visualizationOptions[visualization]}</section>
      </main>
    </>
  );
}
