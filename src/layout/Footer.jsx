import React, { useEffect, useState } from "react";
import usePreferenceStore from "store/usePreferenceStore";
import Cookies from "js-cookie";
import i18n from "src/i18n";
import { useTranslation } from "react-i18next";

/**
 * Main footer of the application
 * @returns {React.JSX.Element} The footer tag, containing the credits message and language and color selectors.
 */
const Footer = () => {
  const { t, i18n } = useTranslation();

  // Viewport dimensions
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Language
  const languages = { en: "English", pt: "Português" };
  const language = usePreferenceStore((state) => state.language);
  const setLanguage = usePreferenceStore((state) => state.setLanguage);
  const languageHandler = (event) => {
    setLanguage(event.target.value);
    Cookies.set("language", event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  // Color
  const colors = ["Light", "Dark"];
  const color = usePreferenceStore((state) => state.color);
  const setColor = usePreferenceStore((state) => state.setColor);
  const colorHandler = (event) => {
    setColor(event.target.value);
    Cookies.set("color", event.target.value);
  };

  // Credits message
  const symbol = "\u00A9";
  const year = new Date().getFullYear();
  const larcesAnchor = (
    <a
      href="https://larces.uece.br"
      title={t("footer.larces")}
      target="_blank"
      aria-label={t("footer.larces")}
      className="hover:underline"
      rel="noreferrer noopener"
    >
      LARCES
    </a>
  );

  // Credits component
  const Credits = () => {
    return (
      <p>
        {width >= 640 && t("footer.message")} {larcesAnchor} {symbol} {year}
      </p>
    );
  };

  return (
    <>
      <footer className="text-xs w-full py-1 text-gray-800 bg-gray-300 flex justify-center gap-4">
        <div className="container flex justify-between gap-4 px-4">
          <Credits />
          <form className="flex gap-4">
            <select
              className="h-4 text-xs py-0 align-middle border-0"
              onChange={languageHandler}
              defaultValue={Cookies.get("language") || language}
            >
              {Object.keys(languages).map((option, key) => (
                <option key={key} value={option}>
                  {languages[option]}
                </option>
              ))}
            </select>
            <select
              className="h-4 text-xs py-0 align-middle border-0"
              onChange={colorHandler}
              defaultValue={Cookies.get("color") || color}
            >
              {colors.map((option, key) => (
                <option key={key} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </form>
        </div>
      </footer>
    </>
  );
};

export default Footer;
