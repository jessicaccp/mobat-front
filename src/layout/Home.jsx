import useFormStore from "store/useFormStore";
import Behavior from "visualizations/Behavior";
import Cluster from "visualizations/Cluster";
import Heatmap from "visualizations/Heatmap";
import Importance from "visualizations/Importance";
import Mapping from "visualizations/Mapping";
import Reputation from "visualizations/Reputation";
import Scatter from "visualizations/Scatter";
import Score from "visualizations/Score";
import Selection from "visualizations/Selection";
import Table from "visualizations/Table";

/**
 * Home component. It links the visualization selected by the user to the corresponding component.
 * @returns {React.JSX.Element} The component for the visualization selected.
 */
const Home = () => {
  const visualization = useFormStore((state) => state.visualization);
  const errorMessage = "Selecione uma visualização";

  // Call the corresponding visualization component
  switch (visualization) {
    // Gráficos de comportamento
    case "behavior":
      return <Behavior />;

    // Clusters
    case "cluster":
      return <Cluster />;

    // Heatmap de ocorrência dos IPs nos países
    case "heatmap":
      return <Heatmap />;

    // Importâncias para machine learning
    case "importance":
      return <Importance />;

    // Mapeamento das features
    case "mapping":
      return <Mapping />;

    // Reputação por país
    case "reputation":
      return <Reputation />;

    // Gráfico de dispersão
    case "scatter":
      return <Scatter />;

    // Score average MoBAt dos IPs com maior variação
    case "score":
      return <Score />;

    // Seleção de características
    case "selection":
      return <Selection />;

    // Tabela de acurácia e tempo de treinamento de modelos
    case "table":
      return <Table />;

    // Display error message
    default:
      return <p>{errorMessage}</p>;
  }
};

export default Home;
