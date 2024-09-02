// To-do:
// - fix cluster circle size
// - show size when hover

import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Error from "layout/Error";
import Loading from "layout/Loading";
import api from "services/api";
import useFormStore from "store/useFormStore";

const Scatter = () => {
  // Get user input values from the store
  // Required
  const columnX = useFormStore((state) => state.scatter.x);
  const columnY = useFormStore((state) => state.scatter.y);

  // Optional input
  const year = useFormStore((state) => state.year);
  const semester = useFormStore((state) => state.semester);
  const month = useFormStore((state) => state.month);
  const day = useFormStore((state) => state.day);
  const ip = useFormStore((state) => state.ip);

  // Error messages
  const requiredInput = columnX && columnY && semester && year;
  const missingInput = "Campos obrigatórios não preenchidos";
  const noData = "Sem dados para exibição";
  const fetchError = "Falha ao solicitar dados";

  // Set initial states
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [size, setSize] = useState([]);

  // Set url
  useEffect(() => {
    setUrl(
      `mapeamento-features/?action=Map%20Feature%20by%20Feature&feature_choice=${columnX}&feature_to_count=${columnY}&year=${year}${
        month ? `&month=${month}` : ``
      }${day ? `&day=${day}` : ``}&semester=${semester}${
        ip ? `&specific_ip=${ip}` : ``
      }&view=json`
    );
  }, [columnX, columnY, year, month, day, semester, ip]);

  // Fetch data
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

  useEffect(() => {
    if (data) {
      let x = [];
      let y = [];
      let size = [];
      Object.values(data).forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (key !== columnX && item[key] !== 0) {
            x.push(Number(item[columnX]));
            y.push(Number(key));
            size.push(Number(item[key]));
          }
        });
      });
      setX(x);
      setY(y);
      setSize(size);
    } else {
      setX([]);
      setY([]);
      setSize([]);
    }
    setLoading(false);
  }, [data]);

  // Handle errors
  // In case of missing user input, loading, error or no data
  if (error) return <Error message={error?.message || error} />;
  if (!requiredInput) return <p>{missingInput}</p>;
  if (loading) return <Loading />;
  if (!data || data.length === 0) return <p>{noData}</p>;

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
              opacity: 0.5,
              line: {
                color: "black",
                width: 0,
              },
            },
            text: size,
          },
        ]}
        layout={{
          autosize: true,
          title: "Gráfico de Dispersão",
          modebar: { orientation: "v", remove: ["lasso", "select"] },
          xaxis: { title: columnX, automargin: true },
          yaxis: { title: columnY, automargin: true },
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

export default Scatter;
