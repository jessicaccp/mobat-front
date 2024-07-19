import useFormStore from "store/useFormStore";
import Error from "routes/Error";
import api from "services/api";
import { useState } from "react";

const Comportamento = () => {
  const ip = useFormStore((state) => state.comportamento.ip);
  const chartType = useFormStore((state) => state.comportamento.chart);
  const errorMessage = "IP e tipo de gráfico não selecionados";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ip && chartType) {
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
  }, [ip, chartType]);

  if (!(ip && chartType)) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;

  return (
    <>
      <Plot />
    </>
  );
};

export default Comportamento;
