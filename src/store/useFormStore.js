import { create } from "zustand";
import { produce } from "immer";

const useFormStore = create((set) => ({
  visualization: null,
  cluster: { num: null },
  scatter: { x: null, y: null },
  behavior: { chart: null },
  importance: { model: null },
  reputation: { country: null },
  score: { num: null },
  selection: { technique: null },
  year: null,
  month: null,
  day: null,
  semester: null,
  ip: null,
  feature: null,

  setVisualization: (visualization) => set({ visualization }),
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
  setFeature: (feature) => set({ feature }),
}));

export default useFormStore;
