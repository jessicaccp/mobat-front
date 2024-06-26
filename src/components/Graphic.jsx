// mean values
// 'abuseipdb_confidence_score': df1['abuseipdb_confidence_score'].mean(),
//     'abuseipdb_total_reports': df1['abuseipdb_total_reports'].mean(),
//     'abuseipdb_num_distinct_users': df1['abuseipdb_num_distinct_users'].mean(),
//     'virustotal_reputation': df1['virustotal_reputation'].mean(),
//     'harmless': df1['harmless'].mean(),
//     'malicious': df1['malicious'].mean(),
//     'suspicious': df1['suspicious'].mean(),
//     'undetected': df1['undetected'].mean(),
//     'IBM_score': df1['IBM_score'].mean(),
//     'IBM_average history Score': df1['IBM_average history Score'].mean(),
//     'IBM_most common score': df1['IBM_most common score'].mean(),
//     'score_average_Mobat': df1['score_average_Mobat'].mean()

// df_selected = trimestre escolhido

// allowed_columns = [
//   'abuseipdb_is_whitelisted',
//   'abuseipdb_confidence_score',
//   'abuseipdb_country_code',
//   'abuseipdb_isp',
//   'abuseipdb_domain',
//   'abuseipdb_total_reports',
//   'abuseipdb_num_distinct_users',
//   'abuseipdb_last_reported_at',
//   'virustotal_reputation',
//   "virustotal_regional_internet_registry",
//   'virustotal_as_owner',
//   'harmless',
//   'malicious',
//   'suspicious',
//   'undetected',
//   'IBM_score',
//   'IBM_average history Score',
//   'IBM_most common score',
//   'virustotal_asn',
//   'SHODAN_asn',
//   'SHODAN_isp',
//   'ALIENVAULT_reputation',
//   'ALIENVAULT_asn',
//   'score_average_Mobat'
// ]

// ips = df_selected['IP'].apply(extract_ip).unique()

// 1. Gráficos de Comportamento
// plot_ip_data(df_selected, ip_escolhido, mean_values)
// input: selecionar ip de lista
// Gráficos de Comportamento: Visualiza o comportamento de IPs específicos. De acordo com a lista de IP, o usuário escolhe qual IP deseja visualizar e gerar os gráficos de comportamento. No final, pergunta se deseja exportar a tabela excel com os dados do IP específico.

// 2. Mapeamento das features
// plot_feature_mapping(df_selected)
// Mapeamento das Features: Mostra um mapeamento de todas as características presentes nos dados. Os gráficos gerados mostram no máximo os cinco valores mais recorrentes de cada característica. No final, pergunta se deseja exportar um arquivo excel com as características de todos os IPs mapeadas e quantificadas do período selecionado no Menu Principal.

// 3. Clusters
// plot_clusters(df_selected)
// Clusters: Visualização dos clusters identificados nos dados. É disponibilizada uma lista de características de reputação para selecionar  qual deseja visualizar os clusters. No final, pergunta se deseja exportar a tabela excel dos dados de todos clusters da característica da tabela selecionada no Menu Principal. Caso não queira mais visualizar, é possível voltar ao Menu Principal.

// 4. Seleção de Características
// plot_feature_selection(df_selected, allowed_columns)
// Seleção de Características: Visualiza a seleção de características feita dos dados.

// 5. Importâncias para Machine Learning
// plot_feature_importance(df_selected, allowed_columns)
// Importâncias para Machine Learning: Exibe a importância das características para modelos de machine learning.

// 6. Score Average Mobat dos IPs com maior variação
// plot_top_ips_score_average(df_selected, num_ips)
// input: quantidade de ips a serem exibidos
// Variação do Score Average Mobat dos IPs com maior ocorrência: Mostra o Score Average Mobat dos IPs com maior ocorrência. Pergunta quantos IPs deseja visualizar no gráfico. No final, pergunta se deseja exportar a tabela excel com os dados do gráfico.

// 7. Reputação por País
// plot_country_score_average(df_selected)
// Reputação por País: Visualiza o gráfico da reputação dos IPs por país.

// 8. Upload da Tabela dos Ips do período
// download_all_ip_data(df_selected)
// Upload da Tabela dos IPs do período: Permite exportar os dados dos IPs do período selecionado.

// 9. HeatMap de Ocorrência dos Ips nos países
// plot_country_heatmap(df_selected)
// HeatMap de Ocorrência dos IPs nos países: Mostra um mapa de calor da ocorrência dos IPs nos países. No final, pergunta se deseja exportar o arquivo excel com os dados do gráfico.

// 10. Tabela de Acurácia e Tempo de Treinamento dos Modelos
// plot_show_results_table(df_selected, allowed_columns)
// Tabela de Acurácia e Tempo de Treinamento dos Modelos: Exibe uma tabela com a acurácia e tempo de treinamento dos modelos. Permite exportar o arquivo excel da tabela.

// 11. Gráfico de Dispersão
// plot_dispersion_ip_reports(df_selected, treat_all_as_string=True)
// Gráfico de Dispersão: Mostra um gráfico de dispersão de todas as características dos IPs. Caso não queira mais visualizar, é possível voltar ao Menu Principal.

export default function Graphic() {
  return <p>Graphic</p>;
}
