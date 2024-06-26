// Gráficos de Comportamento: Visualiza o comportamento de IPs específicos. De acordo com a lista de IP, o usuário escolhe qual IP deseja visualizar e gerar os gráficos de comportamento. No final, pergunta se deseja exportar a tabela excel com os dados do IP específico.

// Mapeamento das Features: Mostra um mapeamento de todas as características presentes nos dados. Os gráficos gerados mostram no máximo os cinco valores mais recorrentes de cada característica. No final, pergunta se deseja exportar um arquivo excel com as características de todos os IPs mapeadas e quantificadas do período selecionado no Menu Principal.

// Clusters: Visualização dos clusters identificados nos dados. É disponibilizada uma lista de características de reputação para selecionar  qual deseja visualizar os clusters. No final, pergunta se deseja exportar a tabela excel dos dados de todos clusters da característica da tabela selecionada no Menu Principal. Caso não queira mais visualizar, é possível voltar ao Menu Principal.

// Seleção de Características: Visualiza a seleção de características feita dos dados.

// Importâncias para Machine Learning: Exibe a importância das características para modelos de machine learning.

// Variação do Score Average Mobat dos IPs com maior ocorrência: Mostra o Score Average Mobat dos IPs com maior ocorrência. Pergunta quantos IPs deseja visualizar no gráfico. No final, pergunta se deseja exportar a tabela excel com os dados do gráfico.

// Reputação por País: Visualiza o gráfico da reputação dos IPs por país.

// Upload da Tabela dos IPs do período: Permite exportar os dados dos IPs do período selecionado.

// HeatMap de Ocorrência dos IPs nos países: Mostra um mapa de calor da ocorrência dos IPs nos países. No final, pergunta se deseja exportar o arquivo excel com os dados do gráfico.

// Tabela de Acurácia e Tempo de Treinamento dos Modelos: Exibe uma tabela com a acurácia e tempo de treinamento dos modelos. Permite exportar o arquivo excel da tabela.

// Gráfico de Dispersão: Mostra um gráfico de dispersão de todas as características dos IPs. Caso não queira mais visualizar, é possível voltar ao Menu Principal.

export default function Graphic() {
  return <p>Graphic</p>;
}
