import { allowedColumns } from "../data";

// Mapeamento das Features: Mostra um mapeamento de todas as características presentes nos dados. Os gráficos gerados mostram no máximo os cinco valores mais recorrentes de cada característica. No final, pergunta se deseja exportar um arquivo excel com as características de todos os IPs mapeadas e quantificadas do período selecionado no Menu Principal.
// inputs: feature (abuseipdb_is_whitelisted, abuseipdb_confidence_score, abuseipdb_country_code, abuseipdb_isp, abuseipdb_domain, abuseipdb_total_reports, abuseipdb_num_distinct_users, abuseipdb_last_reported_at, virustotal_reputation, virustotal_regional_internet_registry, virustotal_as_owner, harmless, malicious, suspicious, undetected, IBM_score, IBM_average history Score, IBM_most common score, virustotal_asn, SHODAN_asn, SHODAN_isp, ALIENVAULT_reputation, ALIENVAULT_asn, score_average_Mobat)
export default function Mapeamento({ feature }) {
  return <>Mapeamento</>;
}
