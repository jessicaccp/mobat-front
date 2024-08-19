import usePreferenceStore from "store/usePreferenceStore";

/**
 * Error component.
 * @param {Object} props Input properties for the component.
 * @param {string} [props.message = null] The error message.
 * @returns {React.JSX.Element} The content of the error page.
 */
const Error = ({ message = null }) => {
  // Language
  const language = usePreferenceStore((state) => state.language);

  // Error messages based on language
  const errorTitle = {
    EN: "Error",
    PT: "Erro",
  };
  const errorMessage = {
    EN: message ? message : "An error occurred",
    PT: message ? message : "Ocorreu um erro",
  };

  return (
    <>
      <h2>{errorTitle[language]}</h2>
      <p>{errorMessage[language]}</p>
    </>
  );
};

export default Error;
