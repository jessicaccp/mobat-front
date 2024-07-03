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
  function graphic(feature) {
    switch (feature) {
      case "Clusters":
        return <Clusters />;
      case "Gráficos de Comportamento":
        return <Comportamento data={data} ip={ip} chartType={chartType} />;
      case "Gráfico de Dispersão":
        return <Dispersao />;
      case "HeatMap de Ocorrência dos IPs nos países":
        return <Heatmap />;
      case "Importâncias para Machine Learning":
        return <Importancias />;
      case "Mapeamento das features":
        return <Mapeamento />;
      case "Reputação por País":
        return <Reputacao />;
      case "Score Average Mobat dos IPs com maior variação":
        return <ScoreAverage />;
      case "Seleção de Características":
        return <Selecao />;
      case "Tabela de Acurácia e Tempo de Treinamento dos Modelos":
        return <Tabela />;
      case "Upload da Tabela dos IPs do período":
        return <Upload />;
      default:
        return "Gráfico";
    }
  }

  return (
    <div className="w-full lg:w-2/3 lg:h-full flex items-center justify-center p-4 flex-grow bg-slate-100 flex-col">
      <div>{graphic(feature)}</div>
    </div>
  );
}
