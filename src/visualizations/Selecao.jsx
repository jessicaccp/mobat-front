import { useEffect, useState } from "react";
import api from "../services/api";
import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import Error from "routes/Error";

const Selecao = () => {
  const technique = useFormStore((state) => state.score.num);
  const errorMessage = "Técnica não selecionada";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const [title, setTitle] = useState(null);
  const [values, setValues] = useState(null);
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

  if (!technique) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message="No data" />;

  if (technique === "Correlation Matrix")
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
};

return (
  <>
    <Plot />
  </>
);

export default Selecao;
