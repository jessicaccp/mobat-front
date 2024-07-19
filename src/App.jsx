import { useEffect } from "react";
import Header from "layout/Header";
import Sidebar from "layout/Sidebar";
import Main from "layout/Main";

const App = () => {
  useEffect(() => {
    document.title = "MoBAt";
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row w-full h-full">
        <Sidebar />
        <Main />
      </div>
    </>
  );
};

export default App;
