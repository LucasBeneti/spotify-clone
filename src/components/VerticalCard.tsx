type VerticalCardProps = {
  title: string;
  subtitle?: string;
  coverSrc?: string;
};
export const VerticalCard = ({
  title,
  subtitle,
  coverSrc = "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
}: VerticalCardProps) => {
  return (
    <div className="flex flex-col bg-highlight items-start rounded-md w-48 min-w-[12rem] p-4">
      <img className="object-cover w-40 rounded-md" src={coverSrc} />
      <div className="flex flex-col gap-y-2 mt-4">
        <p className="text-white font-bold text-base">{title}</p>
        {subtitle && <p className="text-subdued text-sm">{subtitle}</p>}
      </div>
    </div>
  );
};
