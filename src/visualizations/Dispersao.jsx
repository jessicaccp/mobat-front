import Plot from "react-plotly.js";
export default function Dispersao({ data, period, columnX, columnY }) {
  if (data && columnX && columnY) {
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
          // {responsive: true}
        />
      </>
    );
  }

  return <p>No data</p>;
}
