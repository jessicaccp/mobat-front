import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import api from "services/api";
import useFormStore from "store/useFormStore";
import Error from "layout/Error";

const Clusters = () => {
  const columnCluster = useFormStore((state) => state.cluster.feature);
  const numClusters = useFormStore((state) => state.cluster.num);
  const errorMessage = "Coluna e número de clusters não selecionados";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (columnCluster && numClusters) {
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
  }, [columnCluster, numClusters]);

  if (!(columnCluster && numClusters)) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message="No data" />;

  return (
    <>
      <Plot
        divId="chart"
        data={[{}]}
        layout={{
          autosize: true,
          title: "Clusters",
          xaxis: { title: "" },
          yaxis: { title: "" },
        }}
        config={{ locale: "pt-br" }}
        useResizeHandler
        responsive
        className="w-full h-full"
      />
    </>
  );
};

export default Clusters;
