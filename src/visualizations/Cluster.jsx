import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Error from "layout/Error";
import Loading from "layout/Loading";
import api from "services/api";
import useFormStore from "store/useFormStore";
import { getRandom } from "tests/utils";

const Cluster = () => {
  // Get user input values from the store
  const columnCluster = useFormStore((state) => state.cluster.feature);
  const numCluster = useFormStore((state) => state.cluster.num);
  const year = useFormStore((state) => state.year);

  // Error messages
  const missingInput = "Característica e/ou número de clusters não informados";
  const noData = "Sem dados";
  const fetchError = "Falha ao solicitar dados";

  // Set initial states
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [mean, setMean] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUrl(
      `clusterizacao/?feature=${columnCluster}t&clusters=${numCluster}&year=${year}&view=json`
    );
  }, [columnCluster, numCluster, year]);

  useEffect(() => {
    if (url && columnCluster && numCluster && year) {
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

  // Set up fake data for testing
  // Add a trace for every cluster, randomizing x and y values
  // Sum all the y values to calculate the feature fake mean
  useEffect(() => {
    let sum = 0;
    let size = 10;
    setData([
      ...Array(numCluster)
        .keys()
        .map((_, number) => {
          const randomY = getRandom("int", size, 1, 1000);
          sum += randomY.reduce((a, b) => a + b, 0);
          return {
            x: getRandom("int", size, 1, size * numCluster),
            y: randomY,
            mode: "markers",
            type: "scatter",
            name: `Cluster ${number + 1}`,
          };
        }),
    ]);
    setMean(sum / (size * numCluster));
  }, [numCluster, columnCluster]);

  // Handle errors
  // In case of missing user input, loading, error or no data
  if (!(columnCluster && numCluster)) return <Error message={missingInput} />;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message={noData} />;
  if (loading) return <Loading />;

  // Render the plot with clusters and aproximated mean data
  return (
    <>
      <Plot
        divId="chart"
        data={data}
        layout={{
          autosize: true,
          title: `${columnCluster} clusters`,
          xaxis: { title: "index" },
          yaxis: { title: `${columnCluster}` },
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
