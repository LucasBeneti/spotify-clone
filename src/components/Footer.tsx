import { useState, useRef } from "react";
import * as Slider from "@radix-ui/react-slider";
import { Link } from "react-router-dom";
import { ArrowsOutSimple } from "@phosphor-icons/react";
import { MicIcon } from "../components/CustomIcons";
import { AudioPlayer } from "./AudioPlayer";
import { useCustomAudioContext } from "../contexts/CustomAudioContext";
import { SpeakerButton } from "./SpeakerButton";

export const Footer = () => {
  const [volume, setVolume] = useState([0]);
  const { currentSong } = useCustomAudioContext();
  const audioRef = useRef(new Audio(currentSong?.audioSrc));
  // audioRef.current.src

  const handleVolumeChange = (value: number[]) => {
    const volumeValue = value[0] > 1 ? value[0] / 100 : value[0];
    audioRef.current.volume = volumeValue;
    setVolume(value);
  };

  const toggleAudioMute = () => {
    console.log("song volume", audioRef.current.volume);
    if (audioRef.current.volume === 0) {
      audioRef.current.volume = volume[0] / 100;
      // TODO need to figure out how to set the volume to previous value
      // to the value that it was right before muting
      /* One idea is to save the volume on localStorage when muting, this way we can
              recover it further on */
    } else {
      audioRef.current.volume = 0;
    }
  };

  return (
    <footer className="grid grid-cols-3 items-center h-20 bg-black w-screen fixed bottom-0">
      <section className="justify-self-start pl-4">
        <CurrentlyPlaying
          title={currentSong?.title}
          artist={currentSong?.artist}
        />
      </section>
      <section className="justify-self-center w-96">
        <AudioPlayer audioRef={audioRef} />
      </section>
      <section className="justify-self-end flex gap-x-2 pr-4">
        <MicIcon stroke="#fff" className="h-6 w-6" />
        <SpeakerButton handleClick={toggleAudioMute} volumeValue={volume} />
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
