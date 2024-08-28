import { useEffect, useState } from "react";
import api from "services/api";
import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import Error from "layout/Error";

const Score = () => {
  const numIps = useFormStore((state) => state.score.num);
  const year = useFormStore((state) => state.year);
  const errorMessage = "Number of IPs not selected";

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUrl(`top-ips-score-average/?num_ips=${numIps}&year=${year}&view=json`);
  }, [numIps, year]);

  useEffect(() => {
    if (url && numIps && year) {
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

  if (!numIps) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message="No data" />;

  return (
    <>
      <Plot
        divId="chart"
        data={
          data
            ? data.top_ips_data.map((item, key) => ({
                x: [key + 1, key + 1],
                y: [item.MinScore.toFixed(2), item.MaxScore.toFixed(2)],
                type: "scatter",
                mode: "lines+markers",
                name: item.IP,
                text: `Score variation: ${item.ScoreVariation.toFixed(2)}`,
              }))
            : null
        }
        layout={{
          autosize: true,
          title: "Score Average Mobat dos IPs com maior variação",
          modebar: { orientation: "v", remove: ["lasso", "select"] },
          xaxis: { title: "IPs", automargin: true },
          yaxis: { title: "MoBAt average score", automargin: true },
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

export default Score;
