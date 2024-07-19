// Gráficos de Comportamento: Visualiza o comportamento de IPs específicos. De acordo com a lista de IP, o usuário escolhe qual IP deseja visualizar e gerar os gráficos de comportamento. No final, pergunta se deseja exportar a tabela excel com os dados do IP específico.

// location: abuseipdb_country_code, abuseipdb_isp, abuseipdb_domain, virustotal_as_owner, virustotal_asn, ALIENVAULT_asn
export default function Comportamento({ data, period, ip, chartType }) {
  return (
    <>
      {!chartType ? "No chart type selected" : null}
      {chartType === "location" ? <>Location</> : null}
      {chartType === "reports" ? <>Reports</> : null}
      {chartType === "score_average" ? <>Score average</> : null}
      {chartType === "last_report" ? <>Last report</> : null}
      {chartType === "time_period" ? <>Time period</> : null}
      {chartType === "ibm_scores" ? <>IBM scores</> : null}
      {chartType === "virustotal_stats" ? <>VirusTotal stats</> : null}
    </>
  );
}
