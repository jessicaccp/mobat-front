import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "layout/Home";
import Error from "layout/Error";
import React from "react";

/**
 * Content of the application.
 * @returns {React.JSX.Element} The main tag, calling all the routes.
 */
const Main = () => {
  const errorMessage = "Página não encontrada";

  return (
    <main className="w-full lg:w-2/3 h-1/2 lg:h-full flex items-center justify-center p-8 flex-grow bg-gray-200 flex-col">
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
