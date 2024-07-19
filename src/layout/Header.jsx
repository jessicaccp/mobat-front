const Header = () => {
  const title = "MoBAt";
  const subtitle = "Monitoramento e Análise de Dados de Bases de Ameaças";

  return (
    <>
      <header className="w-screen bg-gray-300">
        <div className="container flex flex-col mx-auto px-8 py-4 justify-center items-start">
          <h1 className="text-2xl">
            <a href="/" alt={title} className="w-fit">
              {title}
            </a>
          </h1>
          <small>
            <a href="/" alt={subtitle} className="w-fit">
              {subtitle}
            </a>
          </small>
        </div>
      </header>
    </>
  );
};

export default Header;
