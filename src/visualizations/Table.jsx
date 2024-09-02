// To-do:
// - add url
// - add api data to plot

import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Error from "layout/Error";
import Loading from "layout/Loading";
import api from "services/api";
import useFormStore from "store/useFormStore";

const Table = () => {
  // Required input
  const year = useFormStore((state) => state.year);

  // Optional input
  const semester = useFormStore((state) => state.semester);
  const month = useFormStore((state) => state.month);
  const day = useFormStore((state) => state.day);
  const ip = useFormStore((state) => state.ip);

  // Plot strings
  const plotTitle = "Tabela de acurácia e tempo de treinamento de modelos";

  // Error messages
  const requiredInput = year;
  const missingInput = "Campos obrigatórios não preenchidos";
  const noData = "Sem dados para exibição";
  const fetchError = "Falha ao solicitar dados";

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUrl(``);
  }, [year]);

  useEffect(() => {
    if (url && requiredInput) {
      setLoading(true);
      setError(null);
      api
        .get(url)
        .then((response) => setData(response.data))
        .then(() => setLoading(false))
        .catch((error) => {
          setError(fetchError);
          console.error(error);
        });
    }
  }, []);

  const [values, setValues] = useState(null);
  const labels = [
    "Modelo",
    "Técnica de seleção",
    "MSE",
    "Tempo de treinamento",
  ];

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

  // Handle errors
  // In case of missing user input, loading, error or no data
  if (error) return <Error message={error?.message || error} />;
  if (!requiredInput) return <p>{missingInput}</p>;
  if (loading) return <Loading />;
  if (!data || data.length === 0) return <p>{noData}</p>;

  // Plot table
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
          title: plotTitle,
        }}
        config={{ locale: "pt-br" }}
        useResizeHandler
        responsive
        className="w-full h-full"
      />
    </>
  );
};

export default Table;
