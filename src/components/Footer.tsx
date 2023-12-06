import * as Slider from "@radix-ui/react-slider";
import { Link } from "react-router-dom";
import { ArrowsOutSimple } from "@phosphor-icons/react";
import { MicIcon } from "../components/CustomIcons";
import { AudioPlayer } from "./AudioPlayer";
import { useCustomAudioContext } from "../contexts/CustomAudioContext";
import { SpeakerButton } from "./SpeakerButton";

export const Footer = () => {
  const { volume, handleVolumeChange, currentlyPlaying } =
    useCustomAudioContext();

  return (
    <footer className="grid grid-cols-3 items-center h-20 bg-black w-screen fixed bottom-0">
      <section className="justify-self-start pl-4">
        <CurrentlyPlaying
          title={currentlyPlaying?.name}
          artist={currentlyPlaying?.artist_name}
        />
      </section>
      <section className="justify-self-center w-96">
        <AudioPlayer />
      </section>
      <section className="justify-self-end flex gap-x-2 pr-4">
        <MicIcon stroke="#fff" className="h-6 w-6" />
        <SpeakerButton />
        <div className="w-24">
          <Slider.Root
            value={volume}
            onValueChange={handleVolumeChange}
            defaultValue={[50]}
            min={0}
            max={100}
            step={1}
            className="relative flex items-center w-24 h-5"
          >
            <Slider.Track className="bg-subdued relative flex-1 rounded-full h-1">
              <Slider.Range className="absolute bg-white rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              aria-label="Volume"
              className="block bg-white shadow-md rounded-lg"
            />
          </Slider.Root>
        </div>
        <ArrowsOutSimple size={24} />
      </section>
    </footer>
  );
};

type CurrentlyPlayingProps = {
  title?: string;
  artist?: string;
  album?: string;
};

const CurrentlyPlaying = ({ title, artist }: CurrentlyPlayingProps) => {
  return (
    <div className="flex gap-x-4 items-center">
      <img
        src="https://i.scdn.co/image/ab67616d0000b273585f3d70dce678a5978a0941"
        alt="Album"
        className="object-cover w-14 rounded-md"
      />
      <div>
        <a
          href="#"
          className="text-sm block hover:underline hover:cursor-pointer"
        >
          {title ? title : ""}
        </a>
        <Link
          to={`/artist/${artist}`}
          className="text-xs block text-subdued hover:underline hover cursor-pointer"
        >
          {artist ? artist : ""}
        </Link>
      </div>
    </div>
  );
};
