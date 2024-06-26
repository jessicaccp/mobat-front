export default function Selector({ selectorOption }) {
  const options = [
    "Selecionar visualização",
    "Clusters",
    "Gráfico de Dispersão",
    "Gráficos de Comportamento",
    "HeatMap de Ocorrência dos IPs nos países",
    "Importâncias para Machine Learning",
    "Mapeamento das features",
    "Reputação por País",
    "Score Average Mobat dos IPs com maior variação",
    "Seleção de Características",
    "Tabela de Acurácia e Tempo de Treinamento dos Modelos",
    "Upload da Tabela dos IPs do período",
  ];

  function handleSelectChange(event) {
    childOption(event.target.value);
  }

  return (
    <>
      <select
        name="select-visualization"
        id="select-visualization"
        className="form-select w-full select-none border-0 rounded-md"
        onChange={handleSelectChange}
        defaultValue={options[0]}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="py-1"
            disabled={option === options[0]}
          >
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
