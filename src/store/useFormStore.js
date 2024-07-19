import { create } from "zustand";
import { produce } from "immer";

const useFormStore = create((set) => ({
  visualization: null,
  cluster: { feature: null, num: null },
  dispersao: { x: null, y: null },
  comportamento: { ip: null, chart: null },
  importancias: { model: null },
  mapeamento: { feature: null },
  reputacao: { country: null },
  score: { num: null },
  selecao: { technique: null },

  setVisualization: (visualization) => set({ visualization }),
  setClusterFeature: (feature) =>
    set(
      produce((state) => {
        state.cluster.feature = feature;
      })
    ),
  setClusterNum: (num) =>
    set(
      produce((state) => {
        state.cluster.num = Number(num);
      })
    ),
  setDispersaoX: (x) =>
    set(
      produce((state) => {
        state.dispersao.x = x;
      })
    ),
  setDispersaoY: (y) =>
    set(
      produce((state) => {
        state.dispersao.y = y;
      })
    ),
  setComportamentoIp: (ip) =>
    set(
      produce((state) => {
        state.comportamento.ip = ip;
      })
    ),
  setComportamentoChart: (chart) =>
    set(
      produce((state) => {
        state.comportamento.chart = chart;
      })
    ),
  setImportanciasModel: (model) =>
    set(
      produce((state) => {
        state.importancias.model = model;
      })
    ),
  setMapeamentoFeature: (feature) =>
    set(
      produce((state) => {
        state.mapeamento.feature = feature;
      })
    ),
  setReputacaoCountry: (country) =>
    set(
      produce((state) => {
        state.reputacao.country = country;
      })
    ),
  setScoreNum: (num) =>
    set(
      produce((state) => {
        state.score.num = Number(num);
      })
    ),
  setSelecaoTechnique: (technique) =>
    set(
      produce((state) => {
        state.selecao.technique = technique;
      })
    ),
}));

export default useFormStore;
