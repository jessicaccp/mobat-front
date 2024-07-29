import { useEffect, useState } from "react";
import api from "services/api";
import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import Error from "layout/Error";

const Selection = () => {
  const technique = useFormStore((state) => state.selection.technique);
  const errorMessage = "Technique not selected";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState(null);
  const [values, setValues] = useState(null);
  const labels = null;

  // --- TEST
  useEffect(() => {
    setData();
  }, []);

  // --- REAL
  // useEffect(() => {
  //   if (technique) {
  //     setLoading(true);
  //     fetch(api)
  //       .then((response) => {
  //         if (response.ok) return response.json();
  //         throw new Error(`Failed to fetch data: ${response}`);
  //       })
  //       .then((data) => setData(data))
  //       .then(() => setLoading(false))
  //       .catch((error) => setError(error));
  //   }
  // }, [technique]);

  useEffect(() => {
    if (data) {
      const values = data.map((item) => item.value);
      setValues(values);
    }
  }, [data]);

  useEffect(() => {
    switch (technique) {
      // Variância das Features
      case "Variance Threshold":
        setTitle("Variance threshold");
        break;
      // SelectKBest - Top 5 Features
      case "SelectKBest":
        setTitle("SelectKBest - Top 5 features");
        break;
      // Lasso Coefficients
      case "Lasso":
        setTitle("Lasso coefficients");
        break;
      // Mutual Information
      case "Mutual Information":
        setTitle("Mutual information");
        break;
      // Matriz de Correlação
      case "Correlation Matrix":
        setTitle("Correlation matrix");
        break;
      default:
        setTitle(null);
        break;
    }
  }, [technique]);

  if (!technique) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;

  // --- REAL
  // if (!data) return <Error message="No data" />;

  if (technique === "Correlation Matrix")
    return (
      <>
        <Plot
          divId="chart"
          data={[
            {
              // x: [],
              // y: [],
              // z: [[], [], []],
              // --- TEST
              x: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              y: ["Morning", "Afternoon", "Evening"],
              z: [
                [1, null, 30, 50, 1],
                [20, 1, 60, 80, 30],
                [30, 60, 1, -10, 20],
              ],
              type: "heatmap",
              hoverongaps: false,
              // colorscale: "YlGnBu",
            },
          ]}
          layout={{
            autosize: true,
            title: title,
          }}
          config={{ locale: "en-us" }}
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
        data={[
          {
            // --- TEST
            x: ["a", "b", "c"], // valores precisam ser diferentes
            y: [20, 14, 23], // tamanho de x e y devem ser iguais
            // x: [],
            // y: values,
            type: "bar",
          },
        ]}
        layout={{
          autosize: true,
          title: title,
          yaxis: { title: "Score" },
        }}
        config={{ locale: "en-us" }}
        useResizeHandler
        responsive
        className="w-full h-full"
      />
    </>
  );
};

export default Selection;
