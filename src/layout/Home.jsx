import Clusters from "visualizations/Clusters";
import Comportamento from "visualizations/Comportamento";
import Dispersao from "visualizations/Dispersao";
import Heatmap from "visualizations/Heatmap";
import Importancias from "visualizations/Importancias";
import Mapeamento from "visualizations/Mapeamento";
import Reputacao from "visualizations/Reputacao";
import ScoreAverage from "visualizations/ScoreAverage";
import Selecao from "visualizations/Selecao";
import Tabela from "visualizations/Tabela";
import Upload from "visualizations/Upload";
import useFormStore from "store/useFormStore";
import Error from "layout/Error";
import React from "react";

/**
 * Home component.
 * @returns {React.JSX.Element} The chart for the visualization selected by the user.
 */
const Home = () => {
  const visualization = useFormStore((state) => state.visualization);
  const errorMessage = "Visualização não selecionada";

  switch (visualization) {
    case "Clusters":
      return <Clusters />;
    case "Gráfico de Dispersão":
      return <Dispersao />;
    case "Gráficos de Comportamento":
      return <Comportamento />;
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
      return <Error message={errorMessage} />;
  }
};

export default Home;
