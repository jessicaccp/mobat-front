// To-do:
// - update plot with API data
// - calculate mean value
// - fix API request error
// - add plot strings to const variables

import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Error from "layout/Error";
import Loading from "layout/Loading";
import api from "services/api";
import useFormStore from "store/useFormStore";

const Cluster = () => {
  // Get user input values from the store
  const feature = useFormStore((state) => state.cluster.feature);
  const nClusters = useFormStore((state) => state.cluster.num);
  const ip = useFormStore((state) => state.cluster.ip);

  // Optional input
  const year = useFormStore((state) => state.year);
  const semester = useFormStore((state) => state.semester);
  const month = useFormStore((state) => state.month);
  const day = useFormStore((state) => state.day);
  // const ip = useFormStore((state) => state.ip);

  // Error messages
  const requiredInput = nClusters && feature && ip && year && semester;
  const missingInput = "Campos obrigatórios não preenchidos";
  const noData = "Sem dados para exibição";
  const fetchError = "Falha ao solicitar dados";

  // Set initial states
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [mean, setMean] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUrl(
      `clusterizacao/?feature=${feature}t&clusters=${nClusters}&year=${year}&semester=${semester}&ip_address=${ip}&view=json`
    );
  }, [feature, nClusters, ip, year, semester]);

  useEffect(() => {
    if (url && feature && nClusters && year && semester && ip) {
      setError(null);
      setLoading(true);
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
  if (!data) return <p>{noData}</p>;

  // Render the plot with clusters and aproximated mean data
  return (
    <>
      <Plot
        divId="chart"
        data={{
          x: [],
          y: [],
          mode: "markers",
          type: "scatter",
          name: `Cluster`,
        }}
        layout={{
          autosize: true,
          title: `${feature} clusters`,
          xaxis: { title: "index" },
          yaxis: { title: `${feature}` },
          shapes: [
            {
              type: "line",
              xref: "paper",
              x0: 0,
              y0: mean,
              x1: 1,
              y1: mean,
              line: {
                color: "red",
                dash: "dot",
                width: 1,
              },
              label: {
                text: `Mean \u2248 ${Math.round(mean)}`,
                textposition: "end",
                font: { color: "red", size: 11 },
              },
            },
          ],
        }}
        config={{ locale: "pt-br" }}
        useResizeHandler
        responsive
        className="w-full h-full"
      />
    </>
  );
};

export default Cluster;
