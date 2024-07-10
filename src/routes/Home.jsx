import { useEffect, useState } from "react";
import Form from "../components/Form";
import Graphic from "../components/Graphic";
import Header from "../components/Header";
import * as XLSX from "xlsx";
import File from "../components/File";

/**
 * Renders the Home page.
 * @returns {ReactNode}
 */
export default function Home() {
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

  const [feature, setFeature] = useState(null);
  const [period, setPeriod] = useState(null);
  const [ip, setIp] = useState(null);
  const [chartType, setChartType] = useState(null);
  const [columnMap, setColumnMap] = useState(null);
  const [columnCluster, setColumnCluster] = useState(null);
  const [numClusters, setNumClusters] = useState(null);
  const [technique, setTechnique] = useState(null);
  const [model, setModel] = useState(null);
  const [numIps, setNumIps] = useState(null);
  const [country, setCountry] = useState(null);
  const [columnX, setColumnX] = useState(null);
  const [columnY, setColumnY] = useState(null);

  const [data, setData] = useState(null);
  const [meanValues, setMeanValues] = useState(nullMeanValues);
  const [ipList, setIpList] = useState([]);
  const [files, setFiles] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Matches the period with the file name
  function getFileName(period) {
    switch (period) {
      case "1st semester":
        return "PrimeiroSemestre.xlsx";
      case "2nd semester":
        return "SegundoSemestre.xlsx";
      case "3rd semester":
        return "TerceiroSemestre.xlsx";
      default:
        return null;
    }
  }

  // Gets the content of the file when the period selected changes
  useEffect(() => {
    if (getFileName(period)) {
      setIsLoading(true);
      fetch(getFileName(period))
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
        .then(() => setIsLoading(false))
        .catch((error) => console.error(error));
      setMeanValues(nullMeanValues);
    }
  }, [period]);

  // Calculates the mean values when the data changes. Runs through the data rows twice.
  useEffect(() => {
    if (data && feature === "Gráficos de comportamento") {
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

  return (
    <>
      <Header setFeature={setFeature} />
      <main className="container flex items-center flex-col lg:flex-row justify-center p-4 gap-4 flex-grow">
        {feature ? (
          <Form
            isLoading={isLoading}
            feature={feature}
            setPeriod={setPeriod}
            setIp={setIp}
            ipList={ipList}
            setChartType={setChartType}
            setColumnMap={setColumnMap}
            setColumnCluster={setColumnCluster}
            setNumClusters={setNumClusters}
            setTechnique={setTechnique}
            setModel={setModel}
            setNumIps={setNumIps}
            setCountry={setCountry}
            setColumnX={setColumnX}
            setColumnY={setColumnY}
          />
        ) : null}
        <Graphic
          data={data}
          meanValues={meanValues}
          feature={feature}
          period={period}
          ip={ip}
          chartType={chartType}
          columnMap={columnMap}
          columnCluster={columnCluster}
          numClusters={numClusters}
          technique={technique}
          model={model}
          numIps={numIps}
          country={country}
          columnX={columnX}
          columnY={columnY}
        />
      </main>
    </>
  );
}
