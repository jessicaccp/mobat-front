import Clusters from "../features/Clusters";
import Comportamento from "../features/Comportamento";
import Dispersao from "../features/Dispersao";
import Heatmap from "../features/Heatmap";
import Importancias from "../features/Importancias";
import Mapeamento from "../features/Mapeamento";
import Reputacao from "../features/Reputacao";
import ScoreAverage from "../features/ScoreAverage";
import Selecao from "../features/Selecao";
import Tabela from "../features/Tabela";

/**
 * Renders a graphic based on the inputs from the form.
 * @param {Object} props
 * @returns {ReactNode}
 */
export default function Graphic({
  data,
  feature,
  period,
  ip,
  chartType,
  columnMap,
  columnCluster,
  numClusters,
  technique,
  model,
  numIps,
  country,
  columnX,
  columnY,
}) {
  return (
    <div className="w-full lg:w-2/3 lg:h-full flex items-center justify-center p-4 flex-grow bg-gray-100 flex-col">
      {/* {feature ? <p>{feature}</p> : null}
      {period ? <p>{period}</p> : null}
      {ip ? <p>{ip}</p> : null}
      {chartType ? <p>{chartType}</p> : null}
      {columnMap ? <p>{columnMap}</p> : null}
      {columnCluster ? <p>{columnCluster}</p> : null}
      {numClusters ? <p>{numClusters}</p> : null}
      {technique ? <p>{technique}</p> : null}
      {model ? <p>{model}</p> : null}
      {numIps ? <p>{numIps}</p> : null}
      {country ? <p>{country}</p> : null}
      {columnX ? <p>{columnX}</p> : null}
      {columnY ? <p>{columnY}</p> : null} */}

      {!feature ? "No feature selected" : null}

      {feature === "Gráficos de comportamento" ? (
        <Comportamento
          data={data}
          period={period}
          ip={ip}
          chartType={chartType}
        />
      ) : null}

      {feature === "Mapeamento de features" ? (
        <Mapeamento data={data} period={period} columnMap={columnMap} />
      ) : null}

      {feature === "Clusters" ? (
        <Clusters
          data={data}
          period={period}
          columnCluster={columnCluster}
          numClusters={numClusters}
        />
      ) : null}

      {feature === "Seleção de características" ? (
        <Selecao data={data} period={period} technique={technique} />
      ) : null}

      {feature === "Importâncias para machine learning" ? (
        <Importancias data={data} period={period} model={model} />
      ) : null}

      {feature === "Score average mobat dos ips com maior variação" ? (
        <ScoreAverage data={data} period={period} numIps={numIps} />
      ) : null}

      {feature === "Reputação por país" ? (
        <Reputacao data={data} period={period} country={country} />
      ) : null}

      {feature === "Heatmap de ocorrência dos ips nos países" ? (
        <Heatmap data={data} period={period} />
      ) : null}

      {feature === "Tabela de acurácia e tempo de treinamento dos modelos" ? (
        <Tabela data={data} period={period} />
      ) : null}

      {feature === "Gráfico de dispersão" ? (
        <Dispersao
          data={data}
          period={period}
          columnX={columnX}
          columnY={columnY}
        />
      ) : null}
    </div>
  );
}
