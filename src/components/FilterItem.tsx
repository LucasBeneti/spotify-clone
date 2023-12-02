type FilterItemProps = {
  text: string;
  selected: boolean;
  onClickHandle: () => void;
};
export const FilterItem = ({
  text,
  selected,
  onClickHandle,
}: FilterItemProps) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-sm hover:cursor-pointer capitalize ${
        selected ? "bg-white  text-black" : "bg-highlight"
      }`}
      onClick={onClickHandle}
    >
      {text}
    </span>
  );
};
