import { useTranslation } from "react-i18next";

/**
 * Error component.
 * @param {Object} props Input properties for the component.
 * @param {string} [props.message = null] The error message.
 * @returns {React.JSX.Element} The content of the error page.
 */
const Error = ({ message = null }) => {
  const { t, i18n } = useTranslation();

  const errorMessage = message || t("error.message");

  return (
    <>
      <h2>{t("error.heading")}</h2>
      <p>{errorMessage}</p>
    </>
  );
};

export default Error;
