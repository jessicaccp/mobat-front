import Header from "../layout/Header";
import Main from "../layout/Main";

/**
 * Renders the Home page.
 * @returns {ReactNode}
 */
export default function Home() {
  return (
    <>
      <Header />
      <Main page="Home" />
    </>
  );
}
