import { useEffect, useState } from "react";
import { iso31661, iso31661Alpha2ToAlpha3 } from "iso-3166";
import Plot from "react-plotly.js";

export default function Heatmap({ data, period }) {
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

  if (countries) {
    return (
      <>
        <p>{}</p>
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
                  iso31661.filter(
                    (country) => country.alpha3 === countryISO3
                  )[0].name
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
  }

  return <>No data</>;
}
