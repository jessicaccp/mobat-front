import { useEffect, useState } from "react";
import api from "services/api";
import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import Error from "layout/Error";
import Loading from "layout/Loading";

const Score = () => {
  const numIps = useFormStore((state) => state.score.num);

  // Optional input
  const year = useFormStore((state) => state.year);
  const semester = useFormStore((state) => state.semester);
  const month = useFormStore((state) => state.month);
  const day = useFormStore((state) => state.day);

  // Error messages
  const requiredInput = numIps && year;
  const missingInput = "Campos obrigatórios não preenchidos";
  const noData = "Sem dados para exibição";
  const fetchError = "Falha ao solicitar dados";

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUrl(
      `top-ips-score-average/?num_ips=${numIps}&year=${year}${
        month ? `&month=${month}` : ``
      }${day ? `&day=${day}` : ``}${
        semester ? `&semester=${semester}` : ``
      }&view=json`
    );
  }, [numIps, year, month, day, semester]);

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
  }, [url]);

  // Handle errors
  // In case of missing user input, loading, error or no data
  if (error) return <Error message={error?.message || error} />;
  if (!requiredInput) return <p>{missingInput}</p>;
  if (loading) return <Loading />;
  if (!data || data.length === 0) return <p>{noData}</p>;

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
                showlegend: true,
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
