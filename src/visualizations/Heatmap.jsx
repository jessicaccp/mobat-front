import { useEffect, useState } from "react";
import { iso31661, iso31661Alpha2ToAlpha3 } from "iso-3166";
import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import api from "services/api";
import Error from "layout/Error";
import Loading from "layout/Loading";

const Heatmap = () => {
  // Required input
  const year = useFormStore((state) => state.year);

  // Optional input
  const semester = useFormStore((state) => state.semester);
  const month = useFormStore((state) => state.month);
  const day = useFormStore((state) => state.day);
  const ip = useFormStore((state) => state.ip);

  // Plot strings
  const plotTitle = "Heatmap de ocorrência de IPs por país";
  const plotColorbarTitle = "Ocorrência";

  // Error messages and required input
  const requiredInput = year;
  const missingInput = "Campos obrigatórios não preenchidos";
  const noData = "Sem dados para exibição";
  const fetchError = "Falha ao solicitar dados";

  // States
  const [count, setCount] = useState(null);
  const [plotLocations, setPlotLocations] = useState(null);
  const [plotZ, setPlotZ] = useState(null);
  const [plotText, setPlotText] = useState(null);
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Change URL based on user input
  useEffect(() => {
    setUrl(
      `country-score-average/?year=${year}${month ? `&month=${month}` : ``}${
        day ? `&day=${day}` : ``
      }${
        semester ? `&semester=${semester}` : ``
      }&country=Todos&metric=count&view=json`
    );
  }, [year, month, day, semester]);

  // Fetch data
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

  // Format data
  useEffect(() => {
    if (data) {
      const countries = {};
      Object.keys(data).forEach((code) => {
        if (code.length === 2) {
          countries[code] = {
            iso3: iso31661Alpha2ToAlpha3[code],
            name: iso31661.filter((item) => item.alpha2 === code)[0].name,
            count: data[code],
          };
        }
      });
      setCount(countries);
    }
  }, [data]);

  // Set plot data
  useEffect(() => {
    if (count) {
      setPlotLocations(Object.values(count).map((country) => country.iso3));
      setPlotZ(Object.values(count).map((country) => country.count));
      setPlotText(Object.values(count).map((country) => country.name));
    } else {
      setPlotLocations(null);
      setPlotZ(null);
      setPlotText(null);
    }
  }, [count]);

  // Handle errors
  // In case of missing user input, loading, error or no data
  if (error) return <Error message={error?.message || error} />;
  if (!requiredInput) return <p>{missingInput}</p>;
  if (loading) return <Loading />;
  if (!data || data.length === 0) return <p>{noData}</p>;

  // Plot heatmap
  return (
    <>
      <Plot
        divId="chart"
        data={[
          {
            type: "choropleth",
            locationmode: "ISO-3",
            locations: plotLocations,
            z: plotZ,
            text: plotText,
            autocolorscale: true,
            colorbar: {
              title: plotColorbarTitle,
            },
          },
        ]}
        layout={{
          autosize: true,
          modebar: { orientation: "v", remove: ["lasso", "select"] },
          title: plotTitle,
          geo: {
            projection: {
              type: "robinson",
            },
          },
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

export default Heatmap;
