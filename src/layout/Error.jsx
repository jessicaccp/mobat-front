import { useTranslation } from "react-i18next";

/**
 * Error component.
 * @param {Object} props Input properties for the component.
 * @param {string} [props.message = null] The error message.
 * @returns {React.JSX.Element} The content of the error page.
 */
const Error = ({ message = null }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <h2>{t("error.heading")}</h2>
      <p>{t("error.message")}</p>
    </>
  );
};

export default Error;
