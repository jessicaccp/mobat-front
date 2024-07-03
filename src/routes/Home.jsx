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
  const [ipList, setIpList] = useState([]);

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
  function formSelectChartType(chartType) {
    setChartType(chartType);
  }
  function formIpList(ipList) {
    setIpList(ipList);
  }
  return (
    <>
      <Header />
      <main className="container flex items-center flex-col lg:flex-row justify-center p-4 gap-4 flex-grow">
        <Form
          formSelectFeature={formSelectFeature}
          formSelectPeriod={formSelectPeriod}
          formSelectIp={formSelectIp}
          formSelectNumIps={formSelectNumIps}
          formSelectChartType={formSelectChartType}
          ipList={ipList}
        />
        <Graphic
          feature={feature}
          period={period}
          ip={ip}
          numIps={numIps}
          chartType={chartType}
          formIpList={formIpList}
        />
      </main>
    </>
  );
}
