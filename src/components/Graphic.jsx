import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { allowedColumns } from "../data";
import Clusters from "./graphics/Clusters";
import Comportamento from "./graphics/Comportamento";
import Dispersao from "./graphics/Dispersao";
import Heatmap from "./graphics/Heatmap";
import Importancias from "./graphics/Importancias";
import Mapeamento from "./graphics/Mapeamento";
import Reputacao from "./graphics/Reputacao";
import ScoreAverage from "./graphics/ScoreAverage";
import Selecao from "./graphics/Selecao";
import Tabela from "./graphics/Tabela";
import Upload from "./graphics/Upload";

// df_selected = trimestre escolhido
// ips = df_selected['IP'].apply(extract_ip).unique()

/**
 * Renders a graphic based on the inputs from the form.
 * @param {function} feature Function to share the feature state with Form through Main.
 * @param {function} period Function to share the period state with Form through Main.
 * @param {function} ip Function to share the ip state with Form through Main.
 * @param {function} numIps Function to share the numIps state with Form through Main.
 * @returns {ReactNode}
 */
export default function Graphic({
  feature,
  period,
  ip,
  numIps,
  chartType,
  setIpList,
}) {
  // Null state of meanValues
  const nullMeanValues = {
    abuseipdb_confidence_score: { num: 0, sum: 0, mean: null },
    abuseipdb_total_reports: { num: 0, sum: 0, mean: null },
    abuseipdb_num_distinct_users: { num: 0, sum: 0, mean: null },
    virustotal_reputation: { num: 0, sum: 0, mean: null },
    harmless: { num: 0, sum: 0, mean: null },
    malicious: { num: 0, sum: 0, mean: null },
    suspicious: { num: 0, sum: 0, mean: null },
    undetected: { num: 0, sum: 0, mean: null },
    IBM_score: { num: 0, sum: 0, mean: null },
    IBM_average_history_Score: { num: 0, sum: 0, mean: null },
    IBM_most_common_score: { num: 0, sum: 0, mean: null },
    score_average_Mobat: { num: 0, sum: 0, mean: null },
  };

  // States
  const [url, setUrl] = useState(getFileName(period));
  const [meanValues, setMeanValues] = useState(nullMeanValues);
  const [data, setData] = useState([]);
  // const [ipList, setIpList] = useState([]);

  // Updates the url with the filename for the respective period when it changes.
  useEffect(() => {
    setUrl(getFileName(period));
  }, [period]);

  /**
   * Matches the period with the respective filename.
   * @param {string} period The period of the data from the file.
   * @returns {string} The filename.
   */
  function getFileName(period) {
    switch (period) {
      case "jan-mar/2023":
        return "PrimeiroSemestre.xlsx";
      case "abr-jun/2023":
        return "SegundoSemestre.xlsx";
      case "jul-set/2023":
        return "TerceiroSemestre.xlsx";
      case "out-dez/2023":
        return "TerceiroSemestre.xlsx";
      default:
        return "SegundoSemestre.xlsx";
    }
  }

  // Fetches the data from the new url when the period changes and set the mean values to null, since they need to be recalculated.
  useEffect(() => {
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        let workbook = XLSX.read(new Uint8Array(data), {
          type: "array",
        });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);
        setData(sheetData);

        // Gets a list of unique IPs from the data
        setIpList([
          ...new Set(
            sheetData.map((item) => {
              const str = String(item.IP).split(" ")[0];
              if (str.charAt(str.length - 1) === "_") {
                return str.slice(0, str.length - 1);
              }
              return str;
            })
          ),
        ]);
      })
      .catch((error) => console.error(error));
    setMeanValues(nullMeanValues);
  }, [period]);

  // Calculates the mean values when the data changes. Runs through the data rows twice.
  useEffect(() => {
    if (data) {
      // First run to calculate the sum of the values
      data.forEach((row) => {
        let copyMeanValues = { ...meanValues };

        if (row.abuseipdb_confidence_score) {
          copyMeanValues.abuseipdb_confidence_score.num += 1;
          copyMeanValues.abuseipdb_confidence_score.sum += Number(
            row.abuseipdb_confidence_score
          );
        }
        if (row.abuseipdb_total_reports) {
          copyMeanValues.abuseipdb_total_reports.num += 1;
          copyMeanValues.abuseipdb_total_reports.sum += Number(
            row.abuseipdb_total_reports
          );
        }
        if (row.abuseipdb_num_distinct_users) {
          copyMeanValues.abuseipdb_num_distinct_users.num += 1;
          copyMeanValues.abuseipdb_num_distinct_users.sum += Number(
            row.abuseipdb_num_distinct_users
          );
        }
        if (row.virustotal_reputation) {
          copyMeanValues.virustotal_reputation.num += 1;
          copyMeanValues.virustotal_reputation.sum += Number(
            row.virustotal_reputation
          );
        }
        if (row.harmless) {
          copyMeanValues.harmless.num += 1;
          copyMeanValues.harmless.sum += Number(row.harmless);
        }
        if (row.malicious) {
          copyMeanValues.malicious.num += 1;
          copyMeanValues.malicious.sum += Number(row.malicious);
        }
        if (row.suspicious) {
          copyMeanValues.suspicious.num += 1;
          copyMeanValues.suspicious.sum += Number(row.suspicious);
        }
        if (row.undetected) {
          copyMeanValues.undetected.num += 1;
          copyMeanValues.undetected.sum += Number(row.undetected);
        }
        if (row.IBM_score) {
          copyMeanValues.IBM_score.num += 1;
          copyMeanValues.IBM_score.sum += Number(row.IBM_score);
        }
        if (row["IBM_average history Score"]) {
          copyMeanValues.IBM_average_history_Score.num += 1;
          copyMeanValues.IBM_average_history_Score.sum += Number(
            row["IBM_average history Score"]
          );
        }
        if (row["IBM_most common score"]) {
          copyMeanValues.IBM_most_common_score.num += 1;
          copyMeanValues.IBM_most_common_score.sum += Number(
            row["IBM_most common score"]
          );
        }
        if (row.score_average_Mobat) {
          copyMeanValues.score_average_Mobat.num += 1;
          copyMeanValues.score_average_Mobat.sum += Number(
            row.score_average_Mobat
          );
        }
        setMeanValues(copyMeanValues);
      });

      // Second run to calculate the mean values
      Object.keys(meanValues).forEach((key) => {
        let copyMeanValues = { ...meanValues };
        copyMeanValues[key].mean =
          copyMeanValues[key].sum / copyMeanValues[key].num;
        setMeanValues(copyMeanValues);
      });
    }
  }, [data]);

  const graphic = (feature) => {
    switch (feature) {
      case "Clusters":
        return <Clusters />;
      case "Gráficos de Comportamento":
        return <Comportamento data={data} ip={ip} chartType={chartType} />;
      case "Gráfico de Dispersão":
        return <Dispersao />;
      case "HeatMap de Ocorrência dos IPs nos países":
        return <Heatmap />;
      case "Importâncias para Machine Learning":
        return <Importancias />;
      case "Mapeamento das features":
        return <Mapeamento />;
      case "Reputação por País":
        return <Reputacao />;
      case "Score Average Mobat dos IPs com maior variação":
        return <ScoreAverage />;
      case "Seleção de Características":
        return <Selecao />;
      case "Tabela de Acurácia e Tempo de Treinamento dos Modelos":
        return <Tabela />;
      case "Upload da Tabela dos IPs do período":
        return <Upload />;
      default:
        return "Gráfico";
    }
  };

  return (
    <div className="w-full lg:w-2/3 lg:h-full flex items-center justify-center p-4 flex-grow bg-slate-100 flex-col">
      <div>{graphic(feature)}</div>
    </div>
  );
}
