import { Play } from "@phosphor-icons/react";
type BigPlayButtonProps = {
  onClickHandle: () => void;
};
export const BigPlayButton = ({ onClickHandle }: BigPlayButtonProps) => {
  return (
    <button
      onClick={onClickHandle}
      className="p-4 rounded-full bg-primary hover:scale-105 hover:cursor-pointer transition delay-75"
    >
      <Play size={20} fill="#000" weight="fill" />
    </button>
  );
};
