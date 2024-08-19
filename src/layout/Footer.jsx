import React from "react";
import usePreferenceStore from "store/usePreferenceStore";

/**
 * Main footer of the application
 * @returns {React.JSX.Element} The footer tag, containing the credits message and language and color selectors.
 */
const Footer = () => {
  // Language variables
  const languages = { EN: "English", PT: "Português" };
  const language = usePreferenceStore((state) => state.language);
  const setLanguage = usePreferenceStore((state) => state.setLanguage);
  const languageHandler = (event) => {
    setLanguage(event.target.value);
  };

  // Color variables
  const colors = ["Light", "Dark"];
  const color = usePreferenceStore((state) => state.color);
  const setColor = usePreferenceStore((state) => state.setColor);
  const colorHandler = (event) => {
    setColor(event.target.value);
  };

  // Credits message variables
  const symbol = "\u00A9";
  const year = new Date().getFullYear();
  const larcesAnchor = (
    <a
      href="https://larces.uece.br"
      title="Laboratory of Computer Networks and Security"
      target="_blank"
      aria-label="Laboratory of Computer Networks and Security"
      className="hover:underline"
    >
      LARCES
    </a>
  );

  // Credits component
  const Credits = () => {
    const Message = () => {
      switch (language) {
        case "EN":
          return <>{import.meta.env.VITE_FOOTER_TEXT}</>;
        case "PT":
          return <>{import.meta.env.VITE_FOOTER_TEXT_PT}</>;
        default:
          return <>{import.meta.env.VITE_FOOTER_TEXT}</>;
      }
    };

    return (
      <div>
        <Message /> {larcesAnchor} {symbol} {year}
      </div>
    );
  };

  return (
    <>
      <footer className="text-xs w-full py-1 text-gray-800 bg-gray-300 flex justify-center gap-4">
        <div className="container flex justify-between gap-4">
          <Credits />
          <div className="flex gap-4">
            <select
              className="h-4 text-xs py-0 align-middle border-0"
              onChange={languageHandler}
              defaultValue={language}
            >
              {Object.keys(languages).map((option, key) => (
                <option key={key} value={option} selected={option === language}>
                  {languages[option]}
                </option>
              ))}
            </select>
            <select
              className="h-4 text-xs py-0 align-middle border-0"
              onChange={colorHandler}
              defaultValue={color}
            >
              {colors.map((option, key) => (
                <option key={key} value={option} selected={color === option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
