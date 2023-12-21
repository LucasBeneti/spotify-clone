import { create } from "zustand";
import { useRef } from "react";

type Song = {
  id: number;
  name: string;
  album_id: number;
  album_name: string;
  position_on_album: string;
  source_link: string;
  times_played: number;
};

type SongPlayerStoreType = {
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  currentSong: Song | null;
  tracksQueue: Song[] | [];
  setCurrentSong: (song: Song) => void;
};

export const SongPlayerStore = create<SongPlayerStoreType>()((set) => ({
  audioRef: useRef(new Audio()),
  currentSong: null,
  tracksQueue: [],
  setCurrentSong: (song) => {
    if (song) {
      set(() => ({ currentSong: { ...song } }));
    }
  },
}));
