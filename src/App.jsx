import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Error from "./routes/Error";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
