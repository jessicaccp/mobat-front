import { useEffect } from "react";
import api from "../services/api";

export default function Clusters({ columnCluster, numClusters }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (columnCluster) {
      setIsLoading(true);
      fetch(api)
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error(`Failed to fetch data: ${response}`);
        })
        .then((data) => setData(data))
        .then(() => setIsLoading(false))
        .catch((error) => setError(error));
    }
  }, [columnCluster]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error || error.message}</p>;

  return <>Clusters</>;
}
