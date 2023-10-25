import { Dot, PushPin } from "@phosphor-icons/react";

interface PaylistItemProps {
  name: string;
  type: string;
  author: string;
  pinned?: boolean;
}
export const PlaylistItem = ({
  name,
  type,
  author,
  pinned,
}: PaylistItemProps) => {
  return (
    <div className="flex gap-x-4 p-3 rounded-md hover:bg-highlight cursor-pointer">
      <img
        className="rounded-md"
        src="https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80"
        alt=""
        style={{ objectFit: "cover", width: "60px" }}
      />
      <div>
        <p className="text-lg font-bold">{name}</p>
        <div className="flex gap-x-1 items-center">
          {pinned ? <PushPin weight="fill" fill="#1ed760" /> : null}
          <p className="text-subdued">{type}</p>
          <Dot size={24} fill="#a7a7a7" />
          <p className="text-subdued">{author}</p>
        </div>
      </div>
    </div>
  );
};
