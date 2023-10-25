type RecentPodcastsProps = {
  title: string;
  subtitle: string;
  coverSrc: string;
};
export const RecentPodcast = ({
  title,
  subtitle,
  coverSrc,
}: RecentPodcastsProps) => {
  return (
    <div className="flex flex-col bg-highlight items-center rounded-md w-48 p-6">
      <img className="object-cover w-40" src={coverSrc} />
      <div className="flex flex-col gap-y-4 mt-4">
        <p className="text-white font-bold text-base">{title}</p>
        <p className="text-subdued text-sm">{subtitle}</p>
      </div>
    </div>
  );
};
