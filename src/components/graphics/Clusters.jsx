// Clusters: Visualização dos clusters identificados nos dados. É disponibilizada uma lista de características de reputação para selecionar  qual deseja visualizar os clusters. No final, pergunta se deseja exportar a tabela excel dos dados de todos clusters da característica da tabela selecionada no Menu Principal. Caso não queira mais visualizar, é possível voltar ao Menu Principal.
// inputs: feature, quantidade de clusters
export default function Clusters({ feature, numClusters }) {
  const allowedColumns = [
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
  return <></>;
}
