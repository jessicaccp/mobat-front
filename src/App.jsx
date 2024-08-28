import Header from "layout/Header";
import Sidebar from "layout/Sidebar";
import Main from "layout/Main";

/**
 * Main component of the application.
 * @returns {React.JSX.Element} The layout components.
 */
const App = () => {
  return (
    <>
      <div class="h-screen w-screen min-h-screen min-w-screen max-h-screen max-w-screen flex flex-col bg-gray-200 items-center text-[#333333] text-base font-sans">
        <Header />
        <div className="container flex flex-col lg:flex-row w-full h-full">
          <Sidebar />
          <Main />
        </div>
      </div>
    </>
  );
};

export default App;
