import { useEffect, useState } from "react";
import api from "../services/api";
import Plot from "react-plotly.js";

export default function Tabela({}) {
  const [data, setData] = useState(null);
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const labels = ["Model", "Selection Technique", "MSE", "Training Time"];

  useEffect(() => {
    setLoading(true);
    fetch(api)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(`Failed to fetch data: ${response}`);
      })
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch((error) => setError(error));
  }, []);

  // Extracts the cell values from the data
  useEffect(() => {
    if (data) {
      const values = data.map((item) => [
        item.model,
        item.selection_technique,
        item.mse,
        item.training_time,
      ]);
      setValues(values);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message || error}</p>;

  return (
    <>
      <Plot
        divId="chart"
        data={[
          {
            type: "table",
            header: {
              values: labels,
              align: "center",
              line: { width: 1, color: "black" },
              fill: { color: "grey" },
              font: { color: "white" },
            },
            cells: {
              values: values,
              align: "center",
              line: { width: 1, color: "black" },
              font: { color: "black" },
            },
          },
        ]}
        layout={{
          autosize: true,
          title: "Tabela de acurácia e tempo de treinamento dos modelos",
        }}
        config={{ locale: "pt-br" }}
        useResizeHandler
        responsive
        className="w-full h-full"
      />
    </>
  );
}
