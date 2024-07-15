import { useEffect, useState } from "react";
import api from "../services/api";
import Plot from "react-plotly.js";

export default function Selecao({ technique }) {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState(null);
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const labels = null;

  useEffect(() => {
    if (technique) {
      setLoading(true);
      fetch(api)
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error(`Failed to fetch data: ${response}`);
        })
        .then((data) => setData(data))
        .then(() => setLoading(false))
        .catch((error) => setError(error));
    }
  }, [technique]);

  useEffect(() => {
    if (data) {
      const values = data.map((item) => item.value);
      setValues(values);
    }
  }, [data]);

  useEffect(() => {
    switch (technique) {
      case "Variance Threshold":
        setTitle("Variância das Features");
        break;
      case "SelectKBest":
        setTitle("SelectKBest - Top 5 Features");
        break;
      case "Lasso":
        setTitle("Lasso Coefficients");
        break;
      case "Mutual Information":
        setTitle("Mutual Information");
        break;
      case "Correlation Matrix":
        setTitle("Matriz de Correlação");
        break;
      default:
        setTitle(null);
        break;
    }
  }, [technique]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message || error}</p>;

  if (technique === "Correlation Matrix")
    return (
      <>
        <Plot
          divId="chart"
          data={[{ z: values, type: "heatmap" }]}
          layout={{
            autosize: true,
            title: title,
          }}
          config={{ locale: "pt-br" }}
          useResizeHandler
          responsive
          className="w-full h-full"
        />
      </>
    );

  return (
    <>
      <Plot
        divId="chart"
        data={[{ x: [], y: values, type: "bar" }]}
        layout={{
          autosize: true,
          title: title,
        }}
        config={{ locale: "pt-br" }}
        useResizeHandler
        responsive
        className="w-full h-full"
      />
    </>
  );
}
