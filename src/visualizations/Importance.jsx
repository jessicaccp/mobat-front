import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import { useEffect, useState } from "react";
import api from "services/api";
import Error from "layout/Error";

const Importance = () => {
  const model = useFormStore((state) => state.importance.model);
  const year = useFormStore((state) => state.year);
  const errorMessage = "Model not selected";

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [plotY, setPlotY] = useState(null);

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
  ];

  const models = {
    "Gradient Boosting Regressor": "GradientBoostingRegressor",
    "Random Forest Regressor": "RandomForestRegressor",
    "Extra Trees Regressor": "ExtraTreesRegressor",
    "AdaBoost Regressor": "AdaBoostRegressor",
    "XGBoost Regressor": "XGBRegressor",
    ElasticNet: "ElasticNet",
  };

  useEffect(() => {
    setUrl(
      `feature_importance/?model_type=${models[model]}&year=${year}&view=json`
    );
  }, [model, year]);

  useEffect(() => {
    if (url && model && year) {
      setLoading(true);
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
      setPlotY(labels.map((label) => data[label].toFixed(2)));
    }
  }, [data]);

  if (!model) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message="No data" />;

  return (
    <>
      <Plot
        divId="chart"
        data={[
          {
            x: labels,
            y: plotY,
            type: "bar",
            text: plotY,
            textposition: "outside",
          },
        ]}
        layout={{
          autosize: true,
          title: `Feature importance for ${model} model on Score_Average_Mobat`,
          modebar: { orientation: "v", remove: ["lasso", "select"] },
          xaxis: { title: "Feature", automargin: true },
          yaxis: { title: "Importance", automargin: true },
        }}
        config={{
          locale: "en-us",
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

export default Importance;
