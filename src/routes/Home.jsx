import Clusters from "features/Clusters";
import Comportamento from "features/Comportamento";
import Dispersao from "features/Dispersao";
import Heatmap from "features/Heatmap";
import Importancias from "features/Importancias";
import Mapeamento from "features/Mapeamento";
import Reputacao from "features/Reputacao";
import ScoreAverage from "features/ScoreAverage";
import Selecao from "features/Selecao";
import Tabela from "features/Tabela";
import Upload from "features/Upload";
import useFormStore from "store/useFormStore";
import Error from "routes/Error";
import React from "react";

/**
 * Home component.
 * @returns {React.JSX.Element} The chart for the visualization selected by the user.
 */
const Home = () => {
  const visualization = useFormStore((state) => state.visualization);

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
      return <Error message="Visualização não selecionada" />;
  }
};

export default Home;
