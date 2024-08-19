import React from "react";
import usePreferenceStore from "store/usePreferenceStore";

/**
 * Main header of the application.
 * @returns {React.JSX.Element} The header tag, containing title and subtitle, both linked to the root route.
 */
const Header = () => {
  // Language
  const language = usePreferenceStore((state) => state.language);

  // Title and subtitle based on the language
  const title = import.meta.env.VITE_HEADER_TITLE;
  const subtitle = {
    EN: import.meta.env.VITE_HEADER_SUBTITLE,
    PT: import.meta.env.VITE_HEADER_SUBTITLE_PT,
  };

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
            <a href="/" alt={subtitle[language]} className="w-fit">
              {subtitle[language]}
            </a>
          </small>
        </div>
      </header>
    </>
  );
};

export default Header;
