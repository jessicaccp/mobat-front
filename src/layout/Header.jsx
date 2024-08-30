/**
 * Main header of the application.
 * @returns {React.JSX.Element} The header tag, containing title and subtitle, both linked to the root route.
 */
const Header = () => {
  // Get the title and subtitle from the environment variables
  const title = import.meta.env.VITE_APP_TITLE;
  const subtitle = import.meta.env.VITE_APP_SUBTITLE;

  // Render the page header
  return (
    <>
      <header className="w-screen bg-gray-300">
        <div className="container flex flex-col px-4 lg:px-8 py-4 items-start mx-auto justify-center">
          <h1 className="text-xl lg:text-2xl">
            <a href="/" alt={title} className="w-fit">
              {title}
            </a>
          </h1>
          <div className="text-xs lg:text-sm">
            <a href="/" alt={subtitle} className="w-fit">
              {subtitle}
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
