import { useState } from "react";

/**
 * Renders the main header of the page, containing the name of the project.
 * @returns {ReactNode}
 */
export default function Header({ setFeature }) {
  const title = "MoBAt";
  const featureTitle = "Select feature";
  const featureOptions = [
    "Gráficos de comportamento",
    "Mapeamento de features",
    "Clusters",
    "Seleção de características",
    "Importâncias para machine learning",
    "Score average mobat dos ips com maior variação",
    "Reputação por país",
    "Heatmap de ocorrência dos ips nos países",
    "Tabela de acurácia e tempo de treinamento dos modelos",
    "Gráfico de dispersão",
  ];

  function handleFeatureChange(event) {
    setFeature(event.target.value);
  }

  return (
    <header className="w-screen bg-gray-300">
      <div className="container flex flex-row mx-auto px-4 py-2 justify-between items-center">
        <a href="/" alt={title} className="w-fit">
          <h1 className="text-2xl">{title}</h1>
        </a>
        <form>
          <select
            id="header-select-feature"
            className="border-0 rounded-md"
            defaultValue={featureTitle}
            onChange={handleFeatureChange}
          >
            {[featureTitle, ...featureOptions].map((option, key) => (
              <option
                key={key}
                value={option}
                disabled={option === featureTitle}
              >
                {option}
              </option>
            ))}
          </select>
        </form>
      </div>
    </header>
  );
}
