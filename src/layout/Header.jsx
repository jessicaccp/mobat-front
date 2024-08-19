import React from "react";
import usePreferenceStore from "store/usePreferenceStore";

/**
 * Main header of the application.
 * @returns {React.JSX.Element} The header tag, containing title and subtitle, both linked to the root route.
 */
const Header = () => {
  const language = usePreferenceStore((state) => state.language);
  const title = import.meta.env.VITE_HEADER_TITLE;
  const Subtitle = () => {
    switch (language) {
      case "EN":
        return <>{import.meta.env.VITE_HEADER_SUBTITLE}</>;
      case "PT":
        return <>{import.meta.env.VITE_HEADER_SUBTITLE_PT}</>;
      default:
        return <>{import.meta.env.VITE_HEADER_SUBTITLE}</>;
    }
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
            <a href="/" alt={<Subtitle />} className="w-fit">
              {<Subtitle />}
            </a>
          </small>
        </div>
      </header>
    </>
  );
};

export default Header;
