import Form from "../components/Form";
import Graphic from "../components/Graphic";

export default function Main() {
  return (
    <main className="container flex items-center flex-col lg:flex-row justify-center p-4 gap-4 flex-grow">
      <Form />
      <Graphic />
    </main>
  );
}
