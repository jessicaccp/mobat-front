import { create } from "zustand";

const usePreferenceStore = create((set) => ({
  // language options: "EN", "PT"
  language: "EN",
  setLanguage: (language) => set({ language }),

  // color options: "light", "dark"
  color: "Light",
  setColor: (color) => set({ color }),
}));

export default usePreferenceStore;
