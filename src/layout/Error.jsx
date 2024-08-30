/**
 * Error component.
 * @param {string} [props.message = "Ocorreu um erro"] The error message.
 * @returns {React.JSX.Element} The content of the error page.
 */
const Error = ({ message = "Ocorreu um erro" }) => {
  // Render the error message
  return (
    <>
      <h2>Erro</h2>
      <p>{message}</p>
    </>
  );
};

export default Error;
