import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import { useEffect, useState } from "react";
import api from "services/api";
import Error from "layout/Error";

const Mapping = () => {
  const columnMap = useFormStore((state) => state.mapping.feature);
  const errorMessage = "Feature not selected";

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

  if (!columnMap) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  // if (!data) return <Error message="No data" />;

  return (
    <>
      <Plot
        divId="chart"
        data={[{}]}
        layout={{
          autosize: true,
          title: "Mapeamento das Features",
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

export default Mapping;
