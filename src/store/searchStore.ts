import { create } from "zustand";
type SearchStore = {
  searchTerm: string;
  setSearchTerm: (t: string) => void;
};

export const useSearchStore = create<SearchStore>()((set) => ({
  searchTerm: "",
  setSearchTerm: (t) => set(() => ({ searchTerm: t })),
}));
