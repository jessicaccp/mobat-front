import Header from "../components/Header";

/**
 * Renders the Error page.
 * @returns {ReactNode}
 */
export default function Error() {
  return (
    <>
      <Header />
      <main className="container flex flex-col lg:flex-row p-4 gap-4 flex-grow">
        <h2>Página não encontrada</h2>
      </main>
    </>
  );
}
