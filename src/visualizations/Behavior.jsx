import useFormStore from "store/useFormStore";
import Error from "layout/Error";
import api from "services/api";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { getRandom, range } from "tests/utils";

const Behavior = () => {
  // Get user input values from the store
  const ip = useFormStore((state) => state.behavior.ip);
  const behavior = useFormStore((state) => state.behavior.chart);
  const errorMessage = "IP and behavior not selected";

  // Set initial states
  const [data, setData] = useState(null);
  const [mean, setMean] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from the api
  // useEffect(() => {
  //   if (ip && behavior) {
  //     setLoading(true);
  //     fetch(api)
  //       .then((response) => {
  //         if (response.ok) return response.json();
  //         throw new Error(`Failed to fetch data: ${response}`);
  //       })
  //       .then((data) => setData(data))
  //       .then(() => setLoading(false))
  //       .catch((error) => setError(error));
  //   }
  // }, [ip, behavior]);

  // Set up fake data for testing
  useEffect(() => {
    const size = 10;
    setData({
      location: {
        abuseIPDB: {
          country: {
            x: range(1, size),
            y: getRandom("string", size, 1, 10),
          },
          isp: {
            x: range(1, size),
            y: getRandom("string", size, 1, 10),
          },
          domain: {
            x: range(1, size),
            y: getRandom("string", size, 1, 10),
          },
        },
        virusTotal: {
          asOwner: {
            x: range(1, size),
            y: getRandom("string", size, 1, 10),
          },
          asn: {
            x: range(1, size),
            y: getRandom("string", size, 1, 10),
          },
        },
        alienVault: {
          asn: {
            x: range(1, size),
            y: getRandom("string", size, 1, 10),
          },
        },
      },
      reports: {
        abuseIPDB: {
          totalReports: {
            x: range(1, size),
            y: getRandom("float", size, 1, 10),
          },
          numDistinctUsers: {
            x: range(1, size),
            y: getRandom("float", size, 1, 10),
          },
        },
      },
      scoreAverage: {
        x: range(1, size),
        y: getRandom("string", size, 1, 10),
      },
      lastReport: {
        x: range(1, size),
        y: getRandom("float", size, 1, 10),
      },
      timePeriod: {
        x: ["Morning", "Afternoon", "Night"],
        y: getRandom("int", 3, 1, 100),
      },
      ibmScores: {
        default: {
          x: range(1, size),
          y: getRandom("float", size, 1, 10),
        },
        history: {
          x: range(1, size),
          y: getRandom("float", size, 1, 10),
        },
        common: {
          x: range(1, size),
          y: getRandom("float", size, 1, 10),
        },
      },
      virusTotalStats: {
        x: range(1, size),
        y: getRandom("float", size, 1, 10),
      },
    });
    setMean();
  }, [ip]);

  // Handle errors
  // In case of missing user input, loading, error or no data
  if (!(ip && behavior)) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message="No data" />;

  // Render the plot for the respective behavior
  switch (behavior) {
    // Recebe os dados relacionados ao ip selecionado,
    // x = do 1 ao tamanho do array y
    // y = abuseipdb_country_code: string com código alpha-2 do país
    // y = abuseipdb_isp: string contendo nome da empresa
    // y = abuseipdb_domain: string contendo nome do domínio
    // y = virustotal_as_owner: string contendo nome da empresa
    // y = virustotal_asn: string contendo alfabeto e números
    // y = ALIENVAULT_asn: string contendo código acima e o nome da empresa
    // Exibe um gráfico com 6 traços, cada um representando a relação do ip com cada uma das características acima
    case "Location":
      return (
        <>
          <Plot
            divId="chart"
            data={[
              {
                x: data.location.abuseIPDB.country.x,
                y: data.location.abuseIPDB.country.y,
                name: "abuseipdb_country_code",
                mode: "lines+markers",
                type: "scatter",
              },
              {
                x: data.location.abuseIPDB.isp.x,
                y: data.location.abuseIPDB.isp.y,
                name: "abuseipdb_isp",
                mode: "lines+markers",
                type: "scatter",
                yaxis: "y2",
              },
              {
                x: data.location.abuseIPDB.domain.x,
                y: data.location.abuseIPDB.domain.y,
                name: "abuseipdb_domain",
                mode: "lines+markers",
                type: "scatter",
                yaxis: "y3",
              },
              {
                x: data.location.virusTotal.asOwner.x,
                y: data.location.virusTotal.asOwner.y,
                name: "virustotal_as_owner",
                mode: "lines+markers",
                type: "scatter",
                yaxis: "y4",
              },
              {
                x: data.location.virusTotal.asn.x,
                y: data.location.virusTotal.asn.y,
                name: "virustotal_asn",
                mode: "lines+markers",
                type: "scatter",
                yaxis: "y5",
              },
              {
                x: data.location.alienVault.asn.x,
                y: data.location.alienVault.asn.y,
                name: "ALIENVAULT_asn",
                mode: "lines+markers",
                type: "scatter",
                yaxis: "y6",
              },
            ]}
            layout={{
              autosize: true,
              title: `${ip} IP behavior in relation to location`,
              xaxis: { title: "Records over time" },
              modebar: { orientation: "v", remove: ["lasso", "select"] },
              yaxis: { domain: [0, 0.165], title: "Value" },
              yaxis2: { domain: [0.165, 0.33] },
              yaxis3: { domain: [0.33, 0.495] },
              yaxis4: { domain: [0.495, 0.66] },
              yaxis5: { domain: [0.66, 0.825] },
              yaxis6: { domain: [0.825, 1] },
            }}
            config={{
              locale: "en-us",
              scrollZoom: true,
              displaylogo: false,
              responsive: true,
            }}
            useResizeHandler
            className="w-full h-full"
          />
        </>
      );
    // Recebe os dados relacionados ao ip selecionado,
    // x = index na tabela
    // y = abuseipdb_total_reports: float do total de relatórios
    // mean(abuseipdb_total_reports): horizontal com média
    // min(abuseipdb_total_reports): lateral do retângulo destacado
    // max(abuseipdb_total_reports): lateral do retângulo destacado
    // y = abuseipdb_num_distinct_users: float do número de usuários distintos
    // mean(abuseipdb_num_distinct_users): horizontal com média
    // min(abuseipdb_num_distinct_users): lateral do retângulo destacado
    // max(abuseipdb_num_distinct_users): lateral do retângulo destacado
    // Exibe um gráfico com 2 traços, cada um representando a relação do ip com cada uma das características acima
    case "Reports":
      return (
        <>
          <Plot
            divId="chart"
            data={[
              {
                x: data.reports.abuseIPDB.totalReports.x,
                y: data.reports.abuseIPDB.totalReports.y,
                name: "abuseipdb_total_reports",
                mode: "lines+markers",
                type: "scatter",
              },
              {
                x: data.reports.abuseIPDB.numDistinctUsers.x,
                y: data.reports.abuseIPDB.numDistinctUsers.y,
                name: "abuseipdb_num_distinct_users",
                mode: "lines+markers",
                type: "scatter",
              },
            ]}
            layout={{
              autosize: true,
              title: `${ip} IP behavior in relation to the total number of reports and different users`,
              xaxis: { title: "Records over time" },
              yaxis: { title: "Value" },
              modebar: { orientation: "v", remove: ["lasso", "select"] },
            }}
            config={{
              locale: "en-us",
              scrollZoom: true,
              displaylogo: false,
              responsive: true,
            }}
            useResizeHandler
            className="w-full h-full"
          />
        </>
      );
    // Recebe os dados relacionados ao ip selecionado,
    // x = index na tabela
    // y = score_average_Mobat: string com valor mobat
    // mean(score_average_Mobat): horizontal com média
    // min(score_average_Mobat): lateral do retângulo destacado
    // max(score_average_Mobat): lateral do retângulo destacado
    // Exibe gráfico com traço único
    case "Score Average":
      return (
        <>
          <Plot
            divId="chart"
            data={[
              {
                x: data.scoreAverage.x,
                y: data.scoreAverage.y,
                name: "score_average_Mobat",
                mode: "lines+markers",
                type: "scatter",
              },
            ]}
            layout={{
              autosize: true,
              title: `${ip} IP behavior in relation to the Mobat Average Score`,
              xaxis: { title: "Records over time" },
              yaxis: { title: "Mobat Average Score" },
              modebar: { orientation: "v", remove: ["lasso", "select"] },
            }}
            config={{
              locale: "en-us",
              scrollZoom: true,
              displaylogo: false,
              responsive: true,
            }}
            useResizeHandler
            className="w-full h-full"
          />
        </>
      );
    // Recebe os dados relacionados ao ip selecionado,
    // x = index na tabela
    // y = abuseipdb_last_reported_at: string com horário
    // Exibe gráfico com traço único
    case "Last Report":
      return (
        <>
          <Plot
            divId="chart"
            data={[
              {
                x: data.lastReport.x,
                y: data.lastReport.y,
                name: "abuseipdb_last_reported_at",
                mode: "lines+markers",
                type: "scatter",
              },
            ]}
            layout={{
              autosize: true,
              title: `${ip} IP behavior in relation to the latest AbuseIPDB report`,
              xaxis: { title: "Records over time" },
              yaxis: { title: "Timestamp (USA)" },
              modebar: { orientation: "v", remove: ["lasso", "select"] },
            }}
            config={{
              locale: "en-us",
              scrollZoom: true,
              displaylogo: false,
              responsive: true,
            }}
            useResizeHandler
            className="w-full h-full"
          />
        </>
      );
    // Gráfico de barras: morning, afternoon, night
    case "Time Period":
      return (
        <>
          <Plot
            divId="chart"
            data={[{ x: data.timePeriod.x, y: data.timePeriod.y, type: "bar" }]}
            layout={{
              autosize: true,
              title: `Day periods with the most occurrence of ${ip} IP reports `,
              xaxis: { title: "Day period" },
              yaxis: { title: "Occurrences" },
              modebar: { orientation: "v", remove: ["lasso", "select"] },
            }}
            config={{
              locale: "en-us",
              scrollZoom: true,
              displaylogo: false,
              responsive: true,
            }}
            useResizeHandler
            className="w-full h-full"
          />
        </>
      );
    // Recebe os dados relacionados ao ip selecionado,
    // x = index na tabela
    // y = IBM_score: float
    // mean(IBM_score): horizontal com média
    // min(IBM_score): lateral do retângulo destacado
    // max(IBM_score): lateral do retângulo destacado
    // y = IBM_average history Score: float
    // mean(IBM_average history Score): horizontal com média
    // min(IBM_average history Score): lateral do retângulo destacado
    // max(IBM_average history Score): lateral do retângulo destacado
    // y = IBM_most common score: float
    // mean(IBM_most common score): horizontal com média
    // min(IBM_most common score): lateral do retângulo destacado
    // max(IBM_most common score): lateral do retângulo destacado
    // Exibe gráfico com 3 traços
    case "IBM Scores":
      return (
        <>
          <Plot
            divId="chart"
            data={[
              {
                x: data.ibmScores.default.x,
                y: data.ibmScores.default.y,
                type: "scatter",
                name: "IBM Score",
                mode: "lines+markers",
              },
              {
                x: data.ibmScores.history.x,
                y: data.ibmScores.history.y,
                type: "scatter",
                name: "IBM Average History Score",
                mode: "lines+markers",
              },
              {
                x: data.ibmScores.common.x,
                y: data.ibmScores.common.y,
                type: "scatter",
                name: "IBM Most Common Score",
                mode: "lines+markers",
              },
            ]}
            layout={{
              shapes: [
                {
                  // mean score
                  type: "line",
                  xref: "paper",
                  x0: 0,
                  y0: 12.0,
                  x1: 1,
                  y1: 12.0,
                  line: {
                    color: "red",
                    dash: "dot",
                  },
                  label: {
                    text: "Mean score",
                    textposition: "end",
                    font: { color: "red", size: 12 },
                  },
                },

                {
                  // score range
                  type: "rect",
                  x0: 0,
                  y0: 0,
                  x1: 1,
                  y1: 12,
                  fillcolor: "#d3d3d3",
                  opacity: 0.2,
                  editable: true,
                  line: {
                    width: 0,
                  },
                  label: {
                    text: "Score range",
                    font: { size: 10, color: "green" },
                    textposition: "top center",
                  },
                },
              ],

              autosize: true,
              title: `${ip} IP behavior in relation to IBM scores`,
              xaxis: { title: "Records over time", anchor: "x1" },
              yaxis: { title: "Value" },
              modebar: { orientation: "v", remove: ["lasso", "select"] },
            }}
            config={{
              locale: "en-us",
              scrollZoom: true,
              displaylogo: false,
              responsive: true,
            }}
            useResizeHandler
            className="w-full h-full"
          />
        </>
      );
    // Recebe os dados relacionados ao ip selecionado,
    // x = index na tabela
    // y = virustotal_reputation: float
    // mean(virustotal_reputation): horizontal com média
    // min(virustotal_reputation): lateral do retângulo destacado
    // max(virustotal_reputation): lateral do retângulo destacado
    // Exibe gráfico com 1 traço
    case "VirusTotal Stats":
      return (
        <>
          <Plot
            divId="chart"
            data={[
              {
                x: data.virusTotalStats.x,
                y: data.virusTotalStats.y,
                type: "scatter",
                name: "VirusTotal Reputation",
                mode: "lines+markers",
              },
            ]}
            layout={{
              autosize: true,
              title: `${ip} IP behavior in relation to VirusTotal statistics`,
              xaxis: { title: "Records over time" },
              yaxis: { title: "Value" },
              modebar: { orientation: "v", remove: ["lasso", "select"] },
            }}
            config={{
              locale: "en-us",
              scrollZoom: true,
              displaylogo: false,
              responsive: true,
            }}
            useResizeHandler
            className="w-full h-full"
          />
        </>
      );
    default:
      return <Error message="Invalid behavior" />;
  }
};

export default Behavior;
