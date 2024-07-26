import useFormStore from "store/useFormStore";
import Error from "layout/Error";
import api from "services/api";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const Behavior = () => {
  const ip = useFormStore((state) => state.behavior.ip);
  const chartType = useFormStore((state) => state.behavior.chart);
  const errorMessage = "IP and behavior not selected";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- TEST
  useEffect(() => {
    setData();
  }, []);

  // --- REAL
  // useEffect(() => {
  //   if (ip) {
  //     setLoading(true);
  //     fetch(api + `/?ip=${ip}`)
  //       .then((response) => {
  //         if (response.ok) return response.json();
  //         throw new Error(`Failed to fetch data: ${response}`);
  //       })
  //       .then((data) => setData(data))
  //       .then(() => setLoading(false))
  //       .catch((error) => setError(error));
  //   }
  // }, [ip]);

  if (!(ip && chartType)) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message="No data" />;

  switch (chartType) {
    case "Location":
      return (
        <>
          <Plot
            divId="chart"
            data={[{}]}
            layout={{
              autosize: true,
              title: `Comportamento do IP ${ip} em relação à localização`,
              xaxis: { title: "Registros ao longo do tempo" },
              yaxis: { title: "Valor" },
            }}
            config={{ locale: "pt-br" }}
            useResizeHandler
            responsive
            className="w-full h-full"
          />
        </>
      );
    case "Reports":
      return (
        <>
          <Plot
            divId="chart"
            data={[{}]}
            layout={{
              autosize: true,
              title: `Comportamento do IP ${ip} em relação ao total de reports e usuários distintos`,
              xaxis: { title: "Registros ao longo do tempo" },
              yaxis: { title: "Valor" },
            }}
            config={{ locale: "pt-br" }}
            useResizeHandler
            responsive
            className="w-full h-full"
          />
        </>
      );
    case "Score Average":
      return (
        <>
          <Plot
            divId="chart"
            data={[{}]}
            layout={{
              autosize: true,
              title: `Comportamento do IP ${ip} em relação ao Score Average Mobat`,
              xaxis: { title: "Registros ao longo do tempo" },
              yaxis: { title: "Score Average Mobat" },
            }}
            config={{ locale: "pt-br" }}
            useResizeHandler
            responsive
            className="w-full h-full"
          />
        </>
      );
    case "Last Report":
      return (
        <>
          <Plot
            divId="chart"
            data={[{}]}
            layout={{
              autosize: true,
              title: `Comportamento do IP ${ip} em relação ao último relatório do AbuseIPDB`,
              xaxis: { title: "Registros ao longo do tempo" },
              yaxis: { title: "Timestamp(EUA)" },
            }}
            config={{ locale: "pt-br" }}
            useResizeHandler
            responsive
            className="w-full h-full"
          />
        </>
      );
    case "Time Period":
      return (
        <>
          <Plot
            divId="chart"
            data={[{}]}
            layout={{
              autosize: true,
              title: `Períodos do Dia com mais ocorrência de report do IP ${ip}`,
              xaxis: { title: "Período do dia" },
              yaxis: { title: "Ocorrências" },
            }}
            config={{ locale: "pt-br" }}
            useResizeHandler
            responsive
            className="w-full h-full"
          />
        </>
      );
    case "IBM Scores":
      return (
        <>
          <Plot
            divId="chart"
            data={[{}]}
            layout={{
              autosize: true,
              title: `Comportamento do IP ${ip} em relação aos scores da IBM`,
              xaxis: { title: "Registros ao longo do tempo" },
              yaxis: { title: "Valor" },
            }}
            config={{ locale: "pt-br" }}
            useResizeHandler
            responsive
            className="w-full h-full"
          />
        </>
      );
    case "VirusTotal Stats":
      return (
        <>
          <Plot
            divId="chart"
            data={[{}]}
            layout={{
              autosize: true,
              title: `Comportamento do IP ${ip} em relação às estatísticas do VirusTotal`,
              xaxis: { title: "Registros ao longo do tempo" },
              yaxis: { title: "Valor" },
            }}
            config={{ locale: "pt-br" }}
            useResizeHandler
            responsive
            className="w-full h-full"
          />
        </>
      );
    default:
      return <Error message="Tipo de gráfico inválido" />;
  }
};

export default Behavior;
