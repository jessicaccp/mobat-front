import React, { useState } from "react";
import Form from "../components/Form";
import Graphic from "../components/Graphic";

/**
 * Renders the main content of the page.
 * @param {string} page The type of page, "Home" or "Error".
 * @returns  {ReactNode}
 */
export default function Main({ page }) {
  // If the page is "Error", renders an error message.
  if (page === "Error")
    return (
      <main className="container flex flex-col lg:flex-row p-4 gap-4 flex-grow">
        <h2>Página não encontrada</h2>
      </main>
    );

  // Else, renders the form and the graphic, sharing the inputs' states through functions via props.
  const [feature, setFeature] = useState(null);
  const [period, setPeriod] = useState(null);
  const [ip, setIp] = useState(null);
  const [numIps, setNumIps] = useState(null);

  function formSelectFeature(feature) {
    setFeature(feature);
  }
  function formSelectPeriod(period) {
    setPeriod(period);
  }
  function formSelectIp(ip) {
    setIp(ip);
  }
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
