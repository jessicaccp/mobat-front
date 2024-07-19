/**
 * Sidebar component of the application.
 * @returns {React.JSX.Element} The aside tag, containing all the inputs for filtering the data.
 */
const Sidebar = () => {
  return (
    <>
      <aside className="w-full lg:w-1/3 lg:h-full p-8 bg-gray-100 gap-4 flex items-center flex-col ">
        <form className="flex flex-row flex-wrap lg:flex-col gap-4 w-full items-center">
          <input
            className="border-0 rounded-md lg:w-full"
            placeholder="visualization type"
          />
          <input className="border-0 rounded-md lg:w-full" />
        </form>
      </aside>
    </>
  );
};

export default Sidebar;
