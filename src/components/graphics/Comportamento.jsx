// Gráficos de Comportamento: Visualiza o comportamento de IPs específicos. De acordo com a lista de IP, o usuário escolhe qual IP deseja visualizar e gerar os gráficos de comportamento. No final, pergunta se deseja exportar a tabela excel com os dados do IP específico.

// location: abuseipdb_country_code, abuseipdb_isp, abuseipdb_domain, virustotal_as_owner, virustotal_asn, ALIENVAULT_asn
export default function Comportamento({ data, ip, chartType }) {
  const showChartType = (chartType) => {
    switch (chartType) {
      case "location":
        // ip_data: pra cada linha da planilha na coluna 'IP', se for igual ao ip passado
        return <>Location</>;
      case "reports":
        return <>Reports</>;
      case "score_average":
        return <>Score Average</>;
      case "last_report":
        return <>Last Report</>;
      case "time_period":
        return <>Time Period</>;
      case "ibm_scores":
        return <>IBM Scores</>;
      case "virustotal_stats":
        return <>Virustotal Stats</>;
      default:
        return <>Gráficos de Comportamento</>;
    }
  };

  return <>{showChartType(chartType)}</>;
}
