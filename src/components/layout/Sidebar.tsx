import { useState } from "react";
import { Link } from "react-router-dom";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  MagnifyingGlass,
  House,
  Playlist,
  Plus,
  ArrowRight,
} from "@phosphor-icons/react";
import { PlaylistItem } from "@components/playlist/PlaylistItem";
import { useUserDataContext } from "@contexts/UserDataContext";
import { CreateNewPlaylistModal } from "@components/playlist/CreateNewPlaylistModal";
import { type Playlist as PlaylistInfo } from "@services/playlistServices";

export const Sidebar = () => {
  const [selected, setSelected] = useState<"home" | "search">("home");
  const [showModal, setShowModal] = useState(false);

  const { playlists } = useUserDataContext();

  return (
    <>
      <aside className="flex flex-col gap-y-2 w-3/12 max-w-sm h-[calc(100vh-5.5rem)] rounded-md overflow-hidden">
        <nav className="flex flex-col gap-y-4 bg-base rounded-md px-3 py-2">
          <Link
            to="/"
            className="flex items-center px-3 py-1 cursor-pointer"
            onClick={() => setSelected("home")}
          >
            <House size={24} />
            <p className="text-base font-bold ml-4 text-white">Home</p>
          </Link>
          <Link
            to="/search"
            className="flex items-center px-3 py-1 cursor-pointer"
            onClick={() => setSelected("search")}
          >
            <MagnifyingGlass
              size={24}
              weight={selected === "search" ? "fill" : undefined}
            />
            <p className="text-base font-bold ml-4 text-white">Search</p>
          </Link>
        </nav>
        <div className="flex flex-col bg-base rounded-md px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex px-3 py-2">
              <Playlist size={24} weight="fill" />
              <p className="text-base font-bold text-white ml-4">
                Your library
              </p>
            </div>
            <div className="flex gap-x-4">
              <button onClick={() => setShowModal(true)}>
                <Plus size={24} />
              </button>
              <ArrowRight size={24} />
            </div>
          </div>
          <nav className="flex">
            <ScrollArea.Root className="w-full">
              <ScrollArea.Viewport className="flex flex-1 flex-col gap-y-4 h-[calc(100vh-14rem)]">
                {!playlists ? (
                  <h2>Loading...</h2>
                ) : (
                  playlists?.map((el: PlaylistInfo) => {
                    return (
                      <Link to={`/playlist/${el.id}`} key={el.name + el.id}>
                        <PlaylistItem
                          name={el.name}
                          type={el.type}
                          author={el.author_username}
                        />
                      </Link>
                    );
                  })
                )}
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </nav>
        </div>
      </aside>
      {showModal && (
        <CreateNewPlaylistModal handleClose={() => setShowModal(false)} />
      )}
    </>
  );
};
