import Error from "layout/Error";
import Home from "layout/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/**
 * Main content of the application.
 * @returns {React.JSX.Element} The main tag, calling all the routes of the application.
 */
const Main = () => {
  // Message shown when the page is not found
  const errorMessage = "Página não encontrada";

  // Render the main content
  return (
    <main className="w-full lg:w-2/3 h-1/2 lg:h-full flex items-center justify-center lg:p-8 flex-grow bg-white flex-col max-h-[1400px]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error message={errorMessage} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Main;
