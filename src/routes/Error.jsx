/**
 * Error component.
 * @param {Object} props Input properties for the component.
 * @param {string} [props.message = "An error occurred"] The error message.
 * @returns {React.JSX.Element} The content of the error page.
 */
const Error = ({ message = "An error occurred." }) => {
  return (
    <>
      <h2>Error</h2>
      <p>{message}</p>
    </>
  );
};

export default Error;
