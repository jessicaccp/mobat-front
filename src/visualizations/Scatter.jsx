import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Error from "layout/Error";
import Loading from "layout/Loading";
import api from "services/api";
import useFormStore from "store/useFormStore";

const Scatter = () => {
  // Get user input values from the store
  const columnX = useFormStore((state) => state.scatter.x);
  const columnY = useFormStore((state) => state.scatter.y);
  const year = useFormStore((state) => state.year);
  const semester = useFormStore((state) => state.semester);

  // Error messages
  const missingInput = "Características não informadas";
  const noData = "Sem dados";
  const fetchError = "Falha ao solicitar dados";

  // Set initial states
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [formattedData, setFormattedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [size, setSize] = useState([]);

  // Set url
  useEffect(() => {
    setUrl(
      `/mapeamento-features/?action=Map%20Feature%20by%20Feature&feature_choice=${columnX}&feature_to_count=${columnY}&year=${year}&semester=${semester}&view=json`
    );
  }, [columnX, columnY, semester, year]);

  // Fetch data
  useEffect(() => {
    if (url && columnX && columnY && year) {
      setLoading(true);
      setError(null);
      api
        .get(url)
        .then((response) => setData(response.data))
        .catch((error) => {
          setError(fetchError);
          console.error(error);
        });
    }
  }, [url]);

  useEffect(() => {
    if (data) {
      Object.values(data).forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (key !== columnX && item[key] !== 0) {
            setX((old) => [...old, Number(item[columnX])]);
            setY((old) => [...old, Number(key)]);
            setSize((old) => [...old, Number(item[key])]);
          }
        });
      });
    } else {
      setX([]);
      setY([]);
      setSize([]);
    }
    setLoading(false);
  }, [data]);

  // Handle errors
  // In case of missing user input, loading, error or no data
  if (!(columnX && columnY)) return <Error message={missingInput} />;
  if (error) return <Error message={error?.message || error} />;
  if (loading) return <Loading />;
  if (!data) return <Error message={noData} />;

  // console.log(size.sort());
  // Render the scatter plot
  return (
    <>
      <Plot
        divId="chart"
        data={[
          {
            x: x,
            y: y,
            type: "scatter",
            mode: "markers",
            marker: {
              size: size,
              sizeref: 0.1,
              sizemode: "area",
            },
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
        className="w-auto h-full"
      />
    </>
  );
};

export default Scatter;
