import Cluster from "visualizations/Cluster";
import Behavior from "visualizations/Behavior";
import Scatter from "visualizations/Scatter";
import Heatmap from "visualizations/Heatmap";
import Importance from "visualizations/Importance";
import Mapping from "visualizations/Mapping";
import Reputation from "visualizations/Reputation";
import Score from "visualizations/Score";
import Selection from "visualizations/Selection";
import Table from "visualizations/Table";
import Error from "layout/Error";
import React from "react";
import { useTranslation } from "react-i18next";
import useFormStore from "store/useFormStore";

/**
 * Home component.
 * @returns {React.JSX.Element} The chart for the visualization selected by the user.
 */
const Home = () => {
  const { t, i18n } = useTranslation();
  const visualization = useFormStore((state) => state.visualization);

  switch (visualization) {
    case "cluster":
      return <Cluster />;

    // Gráfico de dispersão
    case "scatter":
      return <Scatter />;

    // Gráficos de comportamento
    case "behavior":
      return <Behavior />;

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
      return <Error message={t("home.error")} />;
  }
};

export default Home;
