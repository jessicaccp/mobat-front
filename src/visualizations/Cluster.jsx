import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import api from "services/api";
import useFormStore from "store/useFormStore";
import Error from "layout/Error";
import { getRandom } from "tests/utils";

const Cluster = () => {
  // example
  // url = "clusterizacao/?feature=abuseipdb_is_whitelisted&clusters=1&year=2023&month=2&day=3&semester=First&view=json"
  // params: feature, clusters, year, month, day, semester, view
  // feature: nome da coluna [required]
  // clusters: número de clusters (int) [required]
  // year: ano (int, 2023 ou 2024) [required]
  // month: mês (int, 1 a 12)
  // day: dia (int, 1 a 31)
  // semester: string (First ou Second)
  // view: string (json ou csv) [required]

  // Get user input values from the store
  const columnCluster = useFormStore((state) => state.cluster.feature);
  const numCluster = useFormStore((state) => state.cluster.num);
  const errorMessage = "Feature and number of clusters not selected";

  // Set initial states
  const [data, setData] = useState(null);
  const [mean, setMean] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from the api
  // useEffect(() => {
  //   if (columnCluster && numCluster) {
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
  // }, [columnCluster, numCluster]);

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
  if (!(columnCluster && numCluster)) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message="No data" />;

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
