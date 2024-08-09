import { create } from "zustand";
import { produce } from "immer";

const useFormStore = create((set) => ({
  visualization: null,
  cluster: { feature: null, num: null },
  scatter: { x: null, y: null },
  behavior: { ip: null, chart: null },
  importance: { model: null },
  mapping: { feature: null },
  reputation: { country: null },
  score: { num: null },
  selection: { technique: null },
  year: null,

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
  setScatterX: (x) =>
    set(
      produce((state) => {
        state.scatter.x = x;
      })
    ),
  setScatterY: (y) =>
    set(
      produce((state) => {
        state.scatter.y = y;
      })
    ),
  setBehaviorIp: (ip) =>
    set(
      produce((state) => {
        state.behavior.ip = ip;
      })
    ),
  setBehaviorChart: (chart) =>
    set(
      produce((state) => {
        state.behavior.chart = chart;
      })
    ),
  setImportanceModel: (model) =>
    set(
      produce((state) => {
        state.importance.model = model;
      })
    ),
  setMappingFeature: (feature) =>
    set(
      produce((state) => {
        state.mapping.feature = feature;
      })
    ),
  setReputationCountry: (country) =>
    set(
      produce((state) => {
        state.reputation.country = country;
      })
    ),
  setScoreNum: (num) =>
    set(
      produce((state) => {
        state.score.num = Number(num);
      })
    ),
  setSelectionTechnique: (technique) =>
    set(
      produce((state) => {
        state.selection.technique = technique;
      })
    ),
  setYear: (year) => set({ year }),
}));

export default useFormStore;
