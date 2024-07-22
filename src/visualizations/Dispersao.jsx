import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import { useEffect, useState } from "react";
import api from "services/api";
import Error from "layout/Error";

const Dispersao = () => {
  const columnX = useFormStore((state) => state.dispersao.x);
  const columnY = useFormStore((state) => state.dispersao.y);
  const errorMessage = "Colunas X e Y não selecionadas";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (columnX && columnY) {
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
  }, [columnX, columnY]);

  if (!(columnX && columnY)) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message="No data" />;

  return (
    <>
      <Plot
        divId="chart"
        data={[
          {
            x: data.map((item) => Number(item[columnX])),
            y: data.map((item) => Number(item[columnY])),
            type: "scatter",
            mode: "markers",
          },
        ]}
        layout={{
          autosize: true,
          title: "Gráfico de Dispersão",
          xaxis: { title: columnX },
          yaxis: { title: columnY },
        }}
        config={{ locale: "pt-br" }}
        useResizeHandler
        responsive
        className="w-full h-full"
      />
    </>
  );
};

export default Dispersao;
