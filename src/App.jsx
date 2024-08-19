import { useEffect } from "react";
import Header from "layout/Header";
import Sidebar from "layout/Sidebar";
import Main from "layout/Main";
import Footer from "layout/Footer";

/**
 * Main component of the application.
 * @returns {React.JSX.Element} The layout components.
 */
const App = () => {
  useEffect(() => {
    document.title = "MoBAt";
  }, []);

  return (
    <>
      <Header />
      <div className="container flex flex-col lg:flex-row w-full h-full">
        <Sidebar />
        <Main />
      </div>
      <Footer />
    </>
  );
};

export default App;
