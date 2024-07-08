import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { allowedColumns } from "../data";
import Clusters from "./graphics/Clusters";
import Comportamento from "./graphics/Comportamento";
import Dispersao from "./graphics/Dispersao";
import Heatmap from "./graphics/Heatmap";
import Importancias from "./graphics/Importancias";
import Mapeamento from "./graphics/Mapeamento";
import Reputacao from "./graphics/Reputacao";
import ScoreAverage from "./graphics/ScoreAverage";
import Selecao from "./graphics/Selecao";
import Tabela from "./graphics/Tabela";
import Upload from "./graphics/Upload";

// df_selected = trimestre escolhido
// ips = df_selected['IP'].apply(extract_ip).unique()

/**
 * Renders a graphic based on the inputs from the form.
 * @param {function} feature Function to share the feature state with Form through Main.
 * @param {function} period Function to share the period state with Form through Main.
 * @param {function} ip Function to share the ip state with Form through Main.
 * @param {function} numIps Function to share the numIps state with Form through Main.
 * @returns {ReactNode}
 */
export default function Graphic({
  data,
  feature,
  period,
  ip,
  numIps,
  chartType,
  setIpList,
}) {
  return (
    <div className="w-full lg:w-2/3 lg:h-full flex items-center justify-center p-4 flex-grow bg-gray-100 flex-col">
      {!feature ? "No feature selected" : null}
      {feature === "Gráficos de comportamento" ? (
        <Comportamento data={data} ip={ip} chartType={chartType} />
      ) : null}
      {feature === "Mapeamento de features" ? <Mapeamento /> : null}
      {feature === "Clusters" ? <Clusters /> : null}
      {feature === "Seleção de características" ? <Selecao /> : null}
      {feature === "Importâncias para machine learning" ? (
        <Importancias />
      ) : null}
      {feature === "Score average mobat dos ips com maior variação" ? (
        <ScoreAverage />
      ) : null}
      {feature === "Reputação por país" ? <Reputacao /> : null}
      {feature === "Heatmap de ocorrência dos ips nos países" ? (
        <Heatmap />
      ) : null}
      {feature === "Tabela de acurácia e tempo de treinamento dos modelos" ? (
        <Tabela />
      ) : null}
      {feature === "Gráfico de dispersão" ? <Dispersao /> : null}
    </div>
  );
}
