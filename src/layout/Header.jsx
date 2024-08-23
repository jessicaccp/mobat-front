import React from "react";

/**
 * Main header of the application.
 * @returns {React.JSX.Element} The header tag, containing title and subtitle, both linked to the root route.
 */
const Header = () => {
  const title = import.meta.env.VITE_APP_TITLE;
  const subtitle = import.meta.env.VITE_APP_SUBTITLE;

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
