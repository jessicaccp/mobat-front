import { create } from "zustand";
import Cookies from "js-cookie";

const usePreferenceStore = create((set) => ({
  // language options: "EN", "PT"
  language: Cookies.get("language") || "EN",
  setLanguage: (language) => set({ language }),

  // color options: "Light", "Dark"
  color: Cookies.get("color") || "Light",
  setColor: (color) => set({ color }),
}));

export default usePreferenceStore;
