import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { iso31661 } from "iso-3166";
import useFormStore from "store/useFormStore";
import api from "services/api";
import Error from "routes/Error";

const Reputacao = () => {
  const country = useFormStore((state) => state.reputacao.country);
  const errorMessage = "País não selecionado";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (country) {
      setLoading(true);
      fetch(api)
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error(`Failed to fetch data: ${response}`);
        })
        .then((data) => setData(data))
        .then(() => setLoading(false))
        .catch((error) => setError(error));
    }
  }, [country]);

  const [score, setScore] = useState(null);
  const [mean, setMean] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const scores = [];
  let sum = 0;

  useEffect(() => {
    if (data && countryCode) {
      sum = 0;
      data.map((item) => {
        if (item.abuseipdb_country_code === countryCode) {
          scores.push(Number(item.score_average_Mobat));
          sum += Number(item.score_average_Mobat);
          console.log(item, sum);
        }
      });
      setScore(scores);
      setMean(sum / (scores.length || 1));
    }
  }, [data]);

  useEffect(() => {
    if (country) {
      let alpha2 = iso31661.filter((item) => item.name === country);
      console.log(country, alpha2);
      // if (alpha2) setCountryCode(alpha2);
    }
  }, [country]);

  if (!country) return <Error message={errorMessage} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <Error message={error?.message || error} />;
  if (!data) return <Error message="No data" />;

  return (
    <>
      <Plot
        divId="chart"
        data={[{}]}
        layout={{
          autosize: true,
          title: "Reputação por País",
          xaxis: { title: "" },
          yaxis: { title: "" },
        }}
        config={{ locale: "pt-br" }}
        useResizeHandler
        responsive
        className="w-full h-full"
      />
    </>
  );
};
