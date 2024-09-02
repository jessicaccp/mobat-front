import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { iso31661 } from "iso-3166";
import useFormStore from "store/useFormStore";
import api from "services/api";
import Error from "layout/Error";
import Loading from "layout/Loading";

const Reputation = () => {
  const country = useFormStore((state) => state.reputation.country);

  // Optional input
  const year = useFormStore((state) => state.year);
  const semester = useFormStore((state) => state.semester);
  const month = useFormStore((state) => state.month);
  const day = useFormStore((state) => state.day);
  const ip = useFormStore((state) => state.ip);

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
      `country-score-average/?year=${year}${month ? `&month=${month}` : ``}${
        day ? `&day=${day}` : ``
      }${semester ? `&semester=${semester}` : ``}&country=${
        country || `Todos`
      }&metric=average&view=json`
    );
  }, [country, year, month, day, semester]);

  useEffect(() => {
    if (url && requiredInput) {
      setLoading(true);
      setError(null);
      api
        .get(url)
        .then((response) => setData(response.data))
        .catch((error) => {
          setError(fetchError);
          setX([]);
          setY([]);
          setSize([]);
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
        data={[{}]}
        layout={{
          autosize: true,
          title: "Reputação por País",
          xaxis: { title: "", automargin: true },
          yaxis: { title: "", automargin: true },
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

export default Reputation;
