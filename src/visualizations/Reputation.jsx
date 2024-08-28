import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { iso31661 } from "iso-3166";
import useFormStore from "store/useFormStore";
import api from "services/api";
import Error from "layout/Error";
import Loading from "layout/Loading";

const Reputation = () => {
  const country = useFormStore((state) => state.reputation.country);
  const year = useFormStore((state) => state.year);

  // Error messages
  const requiredInput = country && year;
  const missingInput = "Campos obrigatórios não preenchidos";
  const noData = "Sem dados para exibição";
  const fetchError = "Falha ao solicitar dados";

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUrl(
      `country-score-average/?year=${year}&country=${country}&metric=average&view=json`
    );
  }, [country, year]);

  useEffect(() => {
    if (url && country && year) {
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

  // Handle errors
  // In case of missing user input, loading, error or no data
  if (error) return <Error message={error?.message || error} />;
  if (!requiredInput) return <p>{missingInput}</p>;
  if (loading) return <Loading />;
  if (!data) return <p>{noData}</p>;

  return (
    <>
      <Plot
        divId="chart"
        data={[{}]}
        layout={{
          autosize: true,
          title: "Reputação por País",
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

export default Reputation;
