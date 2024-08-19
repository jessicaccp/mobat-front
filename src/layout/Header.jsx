import React from "react";
import { useTranslation } from "react-i18next";

/**
 * Main header of the application.
 * @returns {React.JSX.Element} The header tag, containing title and subtitle, both linked to the root route.
 */
const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <header className="w-screen bg-gray-300">
        <div className="container flex flex-col mx-auto px-8 py-4 justify-center items-start">
          <h1 className="text-2xl">
            <a href="/" alt={t("header.title")} className="w-fit">
              {t("header.title")}
            </a>
          </h1>
          <small>
            <a href="/" alt={t("header.subtitle")} className="w-fit">
              {t("header.subtitle")}
            </a>
          </small>
        </div>
      </header>
    </>
  );
};

export default Header;
