import { useEffect, useState } from "react";
import api from "services/api";
import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import Error from "layout/Error";

const Selection = () => {
  const technique = useFormStore((state) => state.selection.technique);
  const year = useFormStore((state) => state.year);
  const errorMessage = "Technique not selected";

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState(null);

  const labels = [
    "abuseipdb_is_whitelisted",
    "abuseipdb_confidence_score",
    "abuseipdb_total_reports",
    "abuseipdb_num_distinct_users",
    "virustotal_reputation",
    "harmless",
    "malicious",
    "suspicious",
    "undetected",
    "IBM_score",
    "IBM_average_history_Score",
    "IBM_most_common_score",
    "score_average_Mobat",
  ];

  const techniques = {
    "Variance Threshold": "variance_threshold",
    SelectKBest: "select_kbest",
    Lasso: "lasso",
    "Mutual Information": "mutual_info",
    "Correlation Matrix": "correlation",
  };

  useEffect(() => {
    setUrl(
      `feature-selection/?technique=${techniques[technique]}&year=${year}&view=json`
    );
  }, [technique, year]);

  // --- REAL
  useEffect(() => {
    if (url && technique && year) {
      setLoading(true);
      // fetch(api + url)
      api
        .get(url, { headers: { "Access-Control-Allow-Origin": "*" } })
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error(`Failed to fetch data: ${response}`);
        })
        .then((data) => setData(data))
        .then(() => setLoading(false))
        .catch((error) => setError(error));
    }
  }, [url]);

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

  console.log(url);
  console.log(api);
  console.log(data);

  if (!technique) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message="No data" />;

  if (technique === "Correlation Matrix")
    return (
      <>
        <Plot
          divId="chart"
          data={[
            {
              x: labels,
              y: labels,
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
