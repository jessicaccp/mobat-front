import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { iso31661 } from "iso-3166";

// Reputação por País: Visualiza o gráfico da reputação dos IPs por país.
// inputs: 46 países
export default function Reputacao({ data, period, country }) {
  const [score, setScore] = useState(null);
  const [mean, setMean] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const scores = [];
  let sum = 0;

  // console.log(data);
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

  // console.log(countryCode, score, mean);

  return <>Reputação</>;
}
