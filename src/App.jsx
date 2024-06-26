import Graphic from "./components/Graphic";
import Input from "./components/Input";
import Selector from "./components/Selector";

export default function App() {
  const title = "MoBAt";
  const subtitle =
    "Uma Ferramenta de Monitoramento e Análise de Dados de Bases de Ameaças";
  return (
    <>
      <header className="w-screen bg-slate-300">
        <div className="container flex flex-col mx-auto px-4 py-2">
          <h1 className="text-2xl">{title}</h1>
        </div>
      </header>

      <main className="container flex items-center flex-col lg:flex-row justify-center p-4 gap-4 flex-grow">
        <div className="w-full lg:w-1/3 lg:h-full flex items-center flex-col justify-center p-4 flex-grow bg-slate-100 gap-4">
          <Selector />
          <Input />
        </div>

        <div className="w-full lg:w-2/3 lg:h-full flex items-center justify-center p-4 flex-grow bg-slate-100">
          <Graphic />
        </div>
      </main>
    </>
  );
}
