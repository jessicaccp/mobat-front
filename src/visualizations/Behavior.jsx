import useFormStore from "store/useFormStore";
import Error from "layout/Error";
import api from "services/api";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { getRandom } from "tests/random";

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
    setData({
      location: {
        abuseIPDB: {
          country: { x: 0, y: 0 },
          isp: { x: 0, y: 0 },
          domain: { x: 0, y: 0 },
        },
        virusTotal: { asOwner: { x: 0, y: 0 }, asn: { x: 0, y: 0 } },
        alienVault: { asn: { x: 0, y: 0 } },
      },
      reports: {
        abuseIPDB: {
          totalReports: { x: 0, y: 0 },
          numDistinctUsers: { x: 0, y: 0 },
        },
      },
      scoreAverage: { x: 0, y: 0 },
      lastReport: { x: 0, y: 0 },
      timePeriod: { x: 0, y: 0 },
      ibmScores: {
        default: { x: 0, y: 0 },
        history: { x: 0, y: 0 },
        common: { x: 0, y: 0 },
      },
      virusTotalStats: { x: 0, y: 0 },
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
              },
              {
                x: data.location.abuseIPDB.isp.x,
                y: data.location.abuseIPDB.isp.y,
                name: "abuseipdb_isp",
              },
              {
                x: data.location.abuseIPDB.domain.x,
                y: data.location.abuseIPDB.domain.y,
                name: "abuseipdb_domain",
              },
              {
                x: data.location.virusTotal.asOwner.x,
                y: data.location.virusTotal.asOwner.y,
                name: "virustotal_as_owner",
              },
              {
                x: data.location.virusTotal.asn.x,
                y: data.location.virusTotal.asn.y,
                name: "virustotal_asn",
              },
              {
                x: data.location.alienVault.asn.x,
                y: data.location.alienVault.asn.y,
                name: "ALIENVAULT_asn",
              },
            ]}
            layout={{
              autosize: true,
              title: `${ip} IP behavior in relation to location`,
              xaxis: { title: "Records over time" },
              yaxis: { title: "Value" },
            }}
            config={{ locale: "en-us" }}
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
              title: `${ip} IP behavior in relation to the total number of reports and different users`,
              xaxis: { title: "Records over time" },
              yaxis: { title: "Value" },
            }}
            config={{ locale: "en-us" }}
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
              title: `${ip} IP behavior in relation to the Mobat Average Score`,
              xaxis: { title: "Records over time" },
              yaxis: { title: "Mobat Average Score" },
            }}
            config={{ locale: "en-us" }}
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
              title: `${ip} IP behavior in relation to the latest AbuseIPDB report`,
              xaxis: { title: "Records over time" },
              yaxis: { title: "Timestamp (USA)" },
            }}
            config={{ locale: "en-us" }}
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
              title: `Day periods with the most occurrence of ${ip} IP reports `,
              xaxis: { title: "Day period" },
              yaxis: { title: "Occurrences" },
            }}
            config={{ locale: "en-us" }}
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
            data={[
              {
                // --- TEST
                x: [0, 1, 2],
                y: [10, 11, 12],
                type: "scatter",
                name: "IBM Score",
              },
              {
                // --- TEST
                x: [2, 3, 4],
                y: [100, 110, 120],
                type: "scatter",
                name: "IBM Average History Score",
              },
              {
                // --- TEST
                x: [3, 4, 5],
                y: [1000, 1100, 1200],
                type: "scatter",
                name: "IBM Most Common Score",
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
                    color: "rgb(255, 0, 0)",
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
                  y1: 1200,
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
            }}
            config={{ locale: "en-us" }}
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
              title: `${ip} IP behavior in relation to VirusTotal statistics`,
              xaxis: { title: "Records over time" },
              yaxis: { title: "Value" },
            }}
            config={{ locale: "en-us" }}
            useResizeHandler
            responsive
            className="w-full h-full"
          />
        </>
      );
    default:
      return <Error message="Invalid behavior" />;
  }
};

export default Behavior;
