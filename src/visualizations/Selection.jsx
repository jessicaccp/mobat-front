// To-do:
// - fix technique value

import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Error from "layout/Error";
import Loading from "layout/Loading";
import api from "services/api";
import useFormStore from "store/useFormStore";

const Selection = () => {
  // Required input
  const technique = useFormStore((state) => state.selection.technique);

  // Optional input
  const year = useFormStore((state) => state.year);
  const semester = useFormStore((state) => state.semester);
  const month = useFormStore((state) => state.month);
  const day = useFormStore((state) => state.day);
  const ip = useFormStore((state) => state.ip);

  // Error messages
  const requiredInput = technique && year;
  const missingInput = "Campos obrigatórios não preenchidos";
  const noData = "Sem dados para exibição";
  const fetchError = "Falha ao solicitar dados";

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [plotTitle, setPlotTitle] = useState(null);
  const [plotX, setPlotX] = useState(null);
  const [plotY, setPlotY] = useState(null);
  const [plotZ, setPlotZ] = useState(null);
  const [plotType, setPlotType] = useState(null);
  const [plotXAxis, setPlotXAxis] = useState(null);
  const [plotYAxis, setPlotYAxis] = useState(null);

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

  useEffect(() => {
    if (url && technique && year) {
      setLoading(true);
      setError(null);
      api
        .get(url)
        .then((response) => {
          if (response.status === 200) return response.data;
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        })
        .then((data) => setData(data))
        .then(() => setLoading(false))
        .catch((error) => setError(error));
    }
  }, [url]);

  useEffect(() => {
    if (data) {
      switch (technique) {
        case "Variance Threshold":
          setPlotTitle("Variance threshold");
          setPlotX(Object.keys(data));
          setPlotY(Object.values(data).map((x) => x.toFixed(2)));
          setPlotZ(null);
          setPlotType("bar");
          setPlotXAxis("Feature");
          setPlotYAxis("Score");
          break;

        case "SelectKBest":
          const top5 = Object.entries(data)
            .toSorted((a, b) => b[1] - a[1])
            .slice(0, 5);
          setPlotTitle("SelectKBest - Top 5 features");
          setPlotX(top5.map((item) => item[0]));
          setPlotY(top5.map((item) => item[1].toFixed(2)));
          setPlotZ(null);
          setPlotType("bar");
          setPlotXAxis("Feature");
          setPlotYAxis("Score");
          break;

        case "Lasso":
          setPlotTitle("Lasso coefficients");
          setPlotX(Object.keys(data));
          setPlotY(Object.values(data).map((x) => x.toFixed(2)));
          setPlotZ(null);
          setPlotType("bar");
          setPlotXAxis("Feature");
          setPlotYAxis("Score");
          break;

        case "Mutual Information":
          setPlotTitle("Mutual information");
          setPlotX(Object.keys(data));
          setPlotY(Object.values(data).map((x) => x.toFixed(2)));
          setPlotZ(null);
          setPlotType("bar");
          setPlotXAxis("Feature");
          setPlotYAxis("Score");
          break;

        case "Correlation Matrix":
          setPlotTitle("Correlation matrix");
          setPlotX(labels);
          setPlotY(labels);
          setPlotZ(labels.map((label) => Object.values(data[label])));
          setPlotType("heatmap");
          setPlotXAxis("Feature");
          setPlotYAxis("Feature");
          break;

        default:
          setPlotTitle(null);
          setPlotX(null);
          setPlotY(null);
          setPlotZ(null);
          setPlotType(null);
          setPlotXAxis(null);
          setPlotYAxis(null);
          break;
      }
    }
  }, [data]);

  // Handle errors
  // In case of missing user input, loading, error or no data
  if (error) return <Error message={error?.message || error} />;
  if (!requiredInput) return <p>{missingInput}</p>;
  if (loading) return <Loading />;
  if (!data) return <p>{noData}</p>;

  return (
    <>
      <Plot
        divId="chart"
        data={[
          {
            x: plotX,
            y: plotY,
            z: plotZ,
            type: plotType,
            text: plotY && plotType !== "heatmap" ? plotY.map(String) : null,
            textposition: "outside",
          },
        ]}
        layout={{
          autosize: true,
          title: plotTitle,
          modebar: { orientation: "v", remove: ["lasso", "select"] },
          xaxis: {
            title: plotXAxis,
            automargin: true,
          },
          yaxis: {
            title: plotYAxis,
            automargin: true,
          },
        }}
        config={{
          locale: "pt-br",
          scrollZoom: true,
          displaylogo: false,
          responsive: true,
        }}
        useResizeHandler
        className="w-full h-full"
      />
    </>
  );
};

export default Selection;
