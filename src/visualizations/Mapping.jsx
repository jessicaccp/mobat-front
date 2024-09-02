import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import { useEffect, useState } from "react";
import api from "services/api";
import Error from "layout/Error";
import Loading from "layout/Loading";

const Mapping = () => {
  const columnMap = useFormStore((state) => state.feature);
  const year = useFormStore((state) => state.year);
  const semester = useFormStore((state) => state.semester);

  // Optional input
  const month = useFormStore((state) => state.month);
  const day = useFormStore((state) => state.day);
  const ip = useFormStore((state) => state.ip);

  // Error messages
  const requiredInput = columnMap && year && semester;
  const missingInput = "Campos obrigatórios não preenchidos";
  const noData = "Sem dados para exibição";
  const fetchError = "Falha ao solicitar dados";

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUrl(
      `mapeamento-features/?action=Map%20Feature&feature_choice=${columnMap}&year=${year}${
        month ? `&month=${month}` : ``
      }${day ? `&day=${day}` : ``}&semester=${semester}${
        ip ? `&specific_ip=${ip}` : ``
      }&view=json`
    );
  }, [columnMap, year, month, day, semester, ip]);

  useEffect(() => {
    if (url && requiredInput) {
      setLoading(true);
      setError(null);
      api
        .get(url)
        .then((response) => setData(response.data))
        .then((data) =>
          data.length > 0
            ? setData(data.toSorted((a, b) => b.count - a.count))
            : setData(data)
        )
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
        data={[{}]}
        layout={{
          autosize: true,
          title: "Mapeamento das Features",
          xaxis: { title: columnMap, automargin: true },
          yaxis: { title: "Quantidade", automargin: true },
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

export default Mapping;
