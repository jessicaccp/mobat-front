import { useState } from "react";
import Form from "../components/Form";
import Graphic from "../components/Graphic";
import Header from "../components/Header";

/**
 * Renders the Home page.
 * @returns {ReactNode}
 */
export default function Home() {
  const [feature, setFeature] = useState(null);
  const [period, setPeriod] = useState(null);
  const [ip, setIp] = useState(null);
  const [numIps, setNumIps] = useState(null);
  const [chartType, setChartType] = useState(null);
  const [ipList, setIpList] = useState(null);

  return (
    <>
      <Header />
      <main className="container flex items-center flex-col lg:flex-row justify-center p-4 gap-4 flex-grow">
        <Form
          feature={feature}
          setFeature={setFeature}
          period={period}
          setPeriod={setPeriod}
          ip={ip}
          setIp={setIp}
          numIps={numIps}
          setNumIps={setNumIps}
          chartType={chartType}
          setChartType={setChartType}
          ipList={ipList}
        />
        <Graphic
          feature={feature}
          period={period}
          ip={ip}
          numIps={numIps}
          chartType={chartType}
          setIpList={setIpList}
        />
      </main>
    </>
  );
}
