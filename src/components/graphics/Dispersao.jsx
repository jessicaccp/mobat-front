// Gráfico de Dispersão: Mostra um gráfico de dispersão de todas as características dos IPs. Caso não queira mais visualizar, é possível voltar ao Menu Principal.
// inputs: feature do eixo x, feature do eixo y
export default function Dispersao({ featureX, featureY }) {
  const allowedColumns = [
    "abuseipdb_is_whitelisted",
    "abuseipdb_confidence_score",
    "abuseipdb_total_reports",
    "abuseipdb_num_distinct_users",
    "virustotal_reputation",
    "harmless",
    "malicious",
    "suspicious",
    "undetected",
    "IBM_score",
    "IBM_average history Score",
    "IBM_most common score",
    "ALIENVAULT_reputation",
    "score_average_Mobat",
  ];
  return <>Dispersão</>;
}
