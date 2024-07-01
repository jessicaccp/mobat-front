import { useState } from "react";
import Form from "../components/Form";
import Graphic from "../components/Graphic";

export default function Main({ page }) {
  if (page === "Error")
    return (
      <main className="container flex flex-col lg:flex-row p-4 gap-4 flex-grow">
        <h2>Página não encontrada</h2>
      </main>
    );

  const [feature, setFeature] = useState(null);
  function formSelectFeature(feature) {
    setFeature(feature);
  }

  const [period, setPeriod] = useState(null);
  function formSelectPeriod(period) {
    setPeriod(period);
  }

  const [ip, setIp] = useState(null);
  function formSelectIp(ip) {
    setIp(ip);
  }

  const [numIps, setNumIps] = useState(null);
  function formSelectNumIps(numIps) {
    setNumIps(numIps);
  }

  return (
    <main className="container flex items-center flex-col lg:flex-row justify-center p-4 gap-4 flex-grow">
      <Form
        formSelectFeature={formSelectFeature}
        formSelectPeriod={formSelectPeriod}
        formSelectIp={formSelectIp}
        formSelectNumIps={formSelectNumIps}
      />
      <Graphic feature={feature} period={period} ip={ip} numIps={numIps} />
    </main>
  );
}
