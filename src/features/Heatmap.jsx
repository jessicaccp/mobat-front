import { useEffect } from "react";
import { countryList } from "../data";
import { iso31661Alpha2ToAlpha3 } from "iso-3166";
import Plot from "react-plotly.js";

// HeatMap de Ocorrência dos IPs nos países: Mostra um mapa de calor da ocorrência dos IPs nos países. No final, pergunta se deseja exportar o arquivo excel com os dados do gráfico.
// inputs: nenhum
// geographic heatmap
// recebe dados da planilha, agrupa por país e conta a quantidade de ocorrências
export default function Heatmap({ data, period }) {
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
    }
  }, [data]);

  if (data)
    return (
      <>
        <Plot
          divId="chart"
          data={[
            {
              type: "choropleth",
              locationmode: "ISO-3",
              locations: Object.keys(countryCounts),
              z: countryCounts,
              text: countryCounts,
              autocolorscale: true,
            },
          ]}
          layout={{
            autosize: true,
            title: "Heatmap",
            geo: {
              projection: {
                type: "robinson",
              },
            },
            // xaxis: { title: columnX },
            // yaxis: { title: columnY },
          }}
          config={{ locale: "pt-br" }}
          useResizeHandler
          responsive
          className="w-full h-full"
        />
      </>
    );

  return <>Heatmap</>;
}
