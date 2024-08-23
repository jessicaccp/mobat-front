import { useEffect, useState } from "react";
import { iso31661, iso31661Alpha2ToAlpha3 } from "iso-3166";
import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import api from "services/api";
import Error from "layout/Error";

const Heatmap = () => {
  const year = useFormStore((state) => state.year);

  const [count, setCount] = useState(null);
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUrl(
      `country-score-average/?year=${year}&country=Todos&metric=count&view=json`
    );
  }, [year]);

  useEffect(() => {
    if (url && year) {
      setLoading(true);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message="No data" />;

  return (
    <>
      <Plot
        divId="chart"
        data={[
          {
            type: "choropleth",
            locationmode: "ISO-3",
            locations: count
              ? Object.values(count).map((country) => country.iso3)
              : null,
            z: count
              ? Object.values(count).map((country) => country.count)
              : null,
            text: count
              ? Object.values(count).map((country) => country.name)
              : null,
            autocolorscale: true,
            colorbar: {
              title: "Occurrence",
            },
          },
        ]}
        layout={{
          autosize: true,
          modebar: { orientation: "v", remove: ["lasso", "select"] },
          title: "Heatmap of occurrence of IPs per country",
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
