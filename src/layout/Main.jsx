import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Error from "routes/Error";

const Main = () => {
  const errorMessage = "Page not found";

  return (
    <div className="w-full lg:w-2/3 lg:h-full flex items-center justify-center p-8 flex-grow bg-gray-200 flex-col">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error message={errorMessage} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Main;
