import { useEffect } from "react";
import Plot from "react-plotly.js";
import api from "../services/api";

export default function Clusters({ columnCluster, numClusters }) {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message || error}</p>;

  return (
    <>
      <Plot />
    </>
  );
}
