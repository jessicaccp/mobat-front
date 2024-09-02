import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import { useEffect, useState } from "react";
import api from "services/api";
import Error from "layout/Error";
import Loading from "layout/Loading";

const Mapping = () => {
  const columnMap = useFormStore((state) => state.feature);

  // Optional input
  const year = useFormStore((state) => state.year);
  const semester = useFormStore((state) => state.semester);
  const month = useFormStore((state) => state.month);
  const day = useFormStore((state) => state.day);
  const ip = useFormStore((state) => state.ip);

  // Error messages
  const requiredInput = columnMap;
  const missingInput = "Campos obrigatórios não preenchidos";
  const noData = "Sem dados para exibição";
  const fetchError = "Falha ao solicitar dados";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- TEST
  useEffect(() => {
    setData();
  }, []);

  // --- REAL
  // useEffect(() => {
  //   if (columnMap) {
  //     setLoading(true);
  //     setError(null);
  //     fetch(api)
  //       .then((response) => {
  //         if (response.ok) return response.json();
  //         throw new Error(`Failed to fetch data: ${response}`);
  //       })
  //       .then((data) => setData(data))
  //       .then(() => setLoading(false))
  //       .catch((error) => setError(error));
  //   }
  // }, [columnMap]);

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

export default Mapping;
