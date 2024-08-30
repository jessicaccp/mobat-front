import { create } from "zustand";
import { produce } from "immer";

/**
 * Create a store using Zustand to manage the form state.
 * @returns {Object} The form store object.
 */
const useFormStore = create((set) => ({
  // Initial state
  visualization: null,
  year: null,
  semester: null,
  month: null,
  day: null,
  ip: null,
  feature: null,
  cluster: { num: null },
  scatter: { x: null, y: null },
  behavior: { chart: null },
  importance: { model: null },
  reputation: { country: null },
  score: { num: null },
  selection: { technique: null },

  // Setters
  setVisualization: (visualization) => set({ visualization }),
  setYear: (year) => set({ year }),
  setSemester: (semester) => set({ semester }),
  setMonth: (month) => set({ month }),
  setDay: (day) => set({ day }),
  setIp: (ip) => set({ ip }),
  setFeature: (feature) => set({ feature }),
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
}));

export default useFormStore;
