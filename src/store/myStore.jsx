import { create } from "zustand";

const store = (set) => ({
  activeUser: JSON.parse(localStorage.getItem("loginInfo")),
  setActiveUser: (newValue) =>
    set((state) => ({
      activeUser: newValue,
    })),
});

const useStore = create(store);

export default useStore;
