// To-do:
// - fix plot when country is selected

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

  // Error messages
  const requiredInput = country && year;
  const missingInput = "Campos obrigatórios não preenchidos";
  const noData = "Sem dados para exibição";
  const fetchError = "Falha ao solicitar dados";

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [mean, setMean] = useState(null);
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
        data={[
          {
            x: Object.entries(data)
              .filter((x) => x[0] !== "Média das médias dos países")
              .toSorted((a, b) => b[1] - a[1])
              .map((x) => x[0]),
            y: Object.entries(data)
              .filter((x) => x[0] !== "Média das médias dos países")
              .toSorted((a, b) => b[1] - a[1])
              .map((x) => x[1].toFixed(2)),
            text: Object.entries(data)
              .toSorted((a, b) => b[1] - a[1])
              .map((x) => x[1].toFixed(2))
              .map(String),
            type: "bar",
            textposition: "outside",
          },
        ]}
        layout={{
          autosize: true,
          title: "Reputação por país",
          modebar: { orientation: "v", remove: ["lasso", "select"] },
          xaxis: {
            title: "País",
            automargin: true,
          },
          yaxis: {
            title: "Média do Score Average MoBAt",
            automargin: true,
          },
          shapes: [
            {
              type: "line",
              xref: "paper",
              x0: 0,
              x1: 1,
              y0: data["Média das médias dos países"],
              y1: data["Média das médias dos países"],
              line: {
                color: "red",
                width: 2,
                dash: "dot",
              },
              label: {
                text: `Média das médias dos países: ${data[
                  "Média das médias dos países"
                ].toFixed(2)}`,
                textposition: "end",
                font: {
                  color: "red",
                  size: 10,
                  shadow: "1px 1px white",
                  weight: 1000,
                },
              },
            },
          ],
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
