import Header from "./layout/Header";
import Main from "./layout/Main";

export default function App() {
  const title = "MoBAt";

  return (
    <>
      <Header title={title} />
      <Main />
    </>
  );
}
