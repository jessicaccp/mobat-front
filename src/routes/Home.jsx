import useFormStore from "store/useFormStore";

const Home = () => {
  return (
    <>
      <p>{useFormStore((state) => state.visualization)}</p>
      <p>{useFormStore((state) => state.cluster.feature)}</p>
      <p>{useFormStore((state) => state.cluster.num)}</p>
      <p>{useFormStore((state) => state.dispersao.x)}</p>
      <p>{useFormStore((state) => state.dispersao.y)}</p>
      <p>{useFormStore((state) => state.comportamento.ip)}</p>
      <p>{useFormStore((state) => state.comportamento.chart)}</p>
      <p>{useFormStore((state) => state.importancias.model)}</p>
      <p>{useFormStore((state) => state.mapeamento.feature)}</p>
      <p>{useFormStore((state) => state.reputacao.country)}</p>
      <p>{useFormStore((state) => state.score.num)}</p>
      <p>{useFormStore((state) => state.selecao.technique)}</p>
    </>
  );
};

export default Home;
