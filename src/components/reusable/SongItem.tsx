import { useState } from "react";
import { Link } from "react-router-dom";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { Heart, Queue, Playlist, CaretRight } from "@phosphor-icons/react";
import { useCustomAudioContext } from "../../contexts/CustomAudioContext";
import { Song } from "../../contexts/AudioPlayerReducer";

type SongItemProps = {
  song: Song;
  explicit?: boolean;
  liked?: boolean;
  variant?: string;
};

export const SongItem = ({
  song,
  explicit = false,
  liked = false,
  variant = "default",
}: SongItemProps) => {
  const { addTrackToQueue } = useCustomAudioContext();

  const [isLiked, setIsLiked] = useState(liked);
  const isPlaylistVariant = variant === "playlist";
  const isSearchVariant = variant === "search";

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <li className="flex hover:bg-highlight justify-between transition-all">
          <span className="flex gap-x-2 items-center">
            <img
              src={song?.cover_art}
              alt="An album cover"
              className={isPlaylistVariant ? "w-8" : "w-12"}
            />
            <span className="flex flex-col">
              <p className="text-white text-sm">{song.name}</p>
              <span className="flex gap-x-1 items-center">
                {explicit && (
                  <span className="flex justify-center px-1 leading-4 bg-subdued rounded-sm text-black uppercase text-xs">
                    E
                  </span>
                )}
                {isPlaylistVariant || isSearchVariant ? (
                  <Link to={`/artist/${song.author_id}`}>
                    <p className="text-subdued text-sm hover:underline hover:text-white">
                      {song.artist_name}
                    </p>
                  </Link>
                ) : null}
              </span>
            </span>
          </span>
          {isSearchVariant ? (
            <span className="flex items-center px-2">
              <button onClick={() => setIsLiked(!isLiked)}>
                <Heart
                  fill="#1ed760"
                  size={24}
                  weight={isLiked ? "fill" : "bold"}
                />
              </button>
            </span>
          ) : null}
        </li>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="bg-highlight text-white min-w-[14em] rounded-md flex flex-col gap-y-2 overflow-hidden">
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger
              className="flex items-center justify-between text-sm hover:bg-elevated px-4 py-2 hover:cursor-pointer"
              onClick={() => {
                console.log("Add to playlist");
              }}
            >
              Add to playlist
              <CaretRight size={16} weight="fill" fill="white" />
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className="flex flex-col gap-y-2 rounded-md bg-highlight"
                sideOffset={2}
              >
                <ContextMenu.Item className="flex gap-x-2 hover:bg-elevated px-4 py-2 hover:cursor-pointer text-sm text-white">
                  <Playlist size={16} weight="fill" />
                  Alguyma playlist
                </ContextMenu.Item>
                <ContextMenu.Item className="flex gap-x-2 hover:bg-elevated px-4 py-2 hover:cursor-pointer text-sm text-white">
                  <Playlist size={16} weight="fill" />
                  Alguyma playlist
                </ContextMenu.Item>
                <ContextMenu.Item className="flex gap-x-2 hover:bg-elevated px-4 py-2 hover:cursor-pointer text-sm text-white">
                  <Playlist size={16} weight="fill" />
                  Alguyma playlist
                </ContextMenu.Item>
                <ContextMenu.Separator className="ContextMenuSeparator" />
                <ContextMenu.Item className="flex gap-x-2 hover:bg-elevated px-4 py-2 hover:cursor-pointer text-sm text-white">
                  Developer Tools
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
          <ContextMenu.Item
            className="flex gap-x-2 items-center text-sm hover:bg-elevated px-4 py-2  hover:cursor-pointer hover:border-none"
            disabled
            onClick={() => {
              console.log("Save to liked songs");
            }}
          >
            <Queue size={16} />
            Save to liked songs
          </ContextMenu.Item>
          <ContextMenu.Item
            className="flex gap-x-2 items-center text-sm hover:bg-elevated px-4 py-2 hover:cursor-pointer hover:border-none"
            disabled
            onClick={() => addTrackToQueue(song)}
          >
            <Queue size={16} fill="white" />
            Add to queue
          </ContextMenu.Item>
          <ContextMenu.Separator className="h-[1px] rounded-sm bg-elevated mx-2" />
          <ContextMenu.Item
            className="flex gap-x-2 items-center text-sm hover:bg-elevated px-4 pb-2 hover:cursor-pointer hover:border-none"
            disabled
          >
            <Link
              to={`/artist/${song.author_id}`}
              className="flex gap-x-2 items-center"
            >
              <Queue size={16} fill="white" />
              Go to artist
            </Link>
          </ContextMenu.Item>
          <ContextMenu.Item
            className=" text-sm hover:bg-elevated px-4 py-2 hover:cursor-pointer hover:border-none"
            disabled
          >
            <Link
              to={`/album/${song.album_id}`}
              className="flex gap-x-2 items-center"
            >
              <Queue size={16} fill="white" />
              Go to album
            </Link>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
