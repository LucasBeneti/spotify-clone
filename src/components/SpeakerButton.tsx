import {
  SpeakerSimpleLow,
  SpeakerSimpleHigh,
  SpeakerSimpleSlash,
} from "@phosphor-icons/react";

type SpeakerButtonProps = {
  volumeValue: number[];
  handleClick: () => void;
};

export const SpeakerButton = ({
  volumeValue,
  handleClick,
}: SpeakerButtonProps) => {
  return (
    <button onClick={handleClick}>
      {volumeValue[0] < 5 ? (
        <SpeakerSimpleSlash size={24} />
      ) : volumeValue[0] > 50 ? (
        <SpeakerSimpleHigh size={24} />
      ) : (
        <SpeakerSimpleLow size={24} />
      )}
    </button>
  );
};
