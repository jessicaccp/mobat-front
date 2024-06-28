import Form from "../components/Form";
import Graphic from "../components/Graphic";

export default function Main({ page }) {
  if (page === "Error")
    return (
      <main className="container flex flex-col lg:flex-row p-4 gap-4 flex-grow">
        <h2>Page not found</h2>
      </main>
    );

  return (
    <main className="container flex items-center flex-col lg:flex-row justify-center p-4 gap-4 flex-grow">
      <Form />
      <Graphic />
    </main>
  );
}
