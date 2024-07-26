import { useEffect, useState } from "react";
import { iso31661, iso31661Alpha2ToAlpha3 } from "iso-3166";
import Plot from "react-plotly.js";
import useFormStore from "store/useFormStore";
import api from "services/api";
import Error from "layout/Error";

const Heatmap = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- TEST
  useEffect(() => {
    setData();
  }, []);

  // --- REAL
  // useEffect(() => {
  //   setLoading(true);
  //   fetch(api)
  //     .then((response) => {
  //       if (response.ok) return response.json();
  //       throw new Error(`Failed to fetch data: ${response}`);
  //     })
  //     .then((data) => setData(data))
  //     .then(() => setLoading(false))
  //     .catch((error) => setError(error));
  // }, []);

  const [countries, setCountries] = useState(null);
  const countryCounts = {};

  useEffect(() => {
    if (data) {
      for (const country of data.map((item) => item.abuseipdb_country_code)) {
        countryCounts[iso31661Alpha2ToAlpha3[country]] = countryCounts[
          iso31661Alpha2ToAlpha3[country]
        ]
          ? countryCounts[iso31661Alpha2ToAlpha3[country]] + 1
          : 1;
      }
      if (countryCounts["undefined"]) delete countryCounts["undefined"];
      setCountries(countryCounts);
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
            locations: Object.keys(countries),
            z: Object.values(countries),
            text: Object.keys(countries).map(
              (countryISO3) =>
                iso31661.filter((country) => country.alpha3 === countryISO3)[0]
                  .name
            ),
            autocolorscale: true,
          },
        ]}
        layout={{
          autosize: true,
          title: "Heatmap de Ocorrência dos IPs nos Países",
          geo: {
            projection: {
              type: "robinson",
            },
          },
        }}
        config={{ locale: "pt-br" }}
        useResizeHandler
        responsive
        className="w-full h-full"
      />
    </>
  );
};

export default Heatmap;
