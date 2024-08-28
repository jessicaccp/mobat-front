import { create } from "zustand";
import { produce } from "immer";

const useFormStore = create((set) => ({
  visualization: null,
  cluster: { feature: null, num: null, ip: null },
  scatter: { x: null, y: null },
  behavior: { ip: null, chart: null },
  importance: { model: null },
  mapping: { feature: null },
  reputation: { country: null },
  score: { num: null },
  selection: { technique: null },
  year: null,
  month: null,
  day: null,
  semester: null,
  ip: null,

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
  setClusterIp: (ip) =>
    set(
      produce((state) => {
        state.cluster.ip = String(ip);
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
  setMonth: (month) => set({ month }),
  setDay: (day) => set({ day }),
  setSemester: (semester) => set({ semester }),
  setIp: (ip) => set({ ip }),
}));

export default useFormStore;
