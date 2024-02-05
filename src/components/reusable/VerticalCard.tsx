type VerticalCardProps = {
  title: string;
  subtitle?: string;
  coverSrc?: string;
};
export const VerticalCard = ({
  title,
  subtitle,
  coverSrc,
}: VerticalCardProps) => {
  return (
    <div className="flex flex-col bg-highlight items-start rounded-md w-48 min-w-[12rem] min-h-[16rem] p-4">
      <img className="object-cover w-40 rounded-md" src={coverSrc} />
      <div className="flex flex-col gap-y-2 mt-4">
        <p className="text-white font-bold text-base">{title}</p>
        {subtitle && <p className="text-subdued text-sm">{subtitle}</p>}
      </div>
    </div>
  );
};
