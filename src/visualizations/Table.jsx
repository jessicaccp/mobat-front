import { useEffect, useState } from "react";
import api from "services/api";
import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import Error from "layout/Error";
import Loading from "layout/Loading";

const Table = () => {
  // Error messages
  const requiredInput = null;
  const missingInput = "Campos obrigatórios não preenchidos";
  const noData = "Sem dados para exibição";
  const fetchError = "Falha ao solicitar dados";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- TEST
  useEffect(() => {
    setData();
  }, []);

  // --- REAL
  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);
  //   fetch(api)
  //     .then((response) => {
  //       if (response.ok) return response.json();
  //       throw new Error(`Failed to fetch data: ${response}`);
  //     })
  //     .then((data) => setData(data))
  //     .then(() => setLoading(false))
  //     .catch((error) => setError(error));
  // }, []);

  const [values, setValues] = useState(null);
  const labels = ["Model", "Selection technique", "MSE", "Training time"];

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
  if (!data) return <p>{noData}</p>;

  // --- REAL
  // if (!data) return <Error message="No data" />;

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
          title: "Model accuracy and training time table",
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
