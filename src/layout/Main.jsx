import { useState } from "react";
import Form from "../components/Form";
import Graphic from "../components/Graphic";

export default function Main({ page }) {
  if (page === "Error")
    return (
      <main className="container flex flex-col lg:flex-row p-4 gap-4 flex-grow">
        <h2>Page not found</h2>
      </main>
    );

  const [visualization, setVisualization] = useState(null);
  function formSelectVisualization(visualization) {
    setVisualization(visualization);
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
        formSelectVisualization={formSelectVisualization}
        formSelectPeriod={formSelectPeriod}
        formSelectIp={formSelectIp}
        formSelectNumIps={formSelectNumIps}
      />
      <Graphic
        visualization={visualization}
        period={period}
        ip={ip}
        numIps={numIps}
      />
    </main>
  );
}
