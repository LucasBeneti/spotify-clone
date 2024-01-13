import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Avatar from "boring-avatars";

type UserAvatarProps = {
  imageUrl?: string | null | undefined;
  username?: string | null | undefined;
};

export const UserAvatar = ({ imageUrl, username }: UserAvatarProps) => {
  const { signOut } = useClerk();
  const [, , removeCookie] = useCookies(["user_jwt"]);
  const navigate = useNavigate();
  const handleLogOut = () => {
    removeCookie("user_jwt", { path: "/" });
    signOut(() => navigate("/"));
  };

  // TODO need to implement the profile page and navigation
  // TODO need to implement the settings page and its navigation

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <span className="bg-black rounded-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${username} profile image`}
              title={`${username}`}
              className="rounded-full h-6"
            />
          ) : (
            <Avatar
              size="24px"
              name="John Doe"
              variant="marble"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          )}
        </span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-highlight text-white min-w-[14em] rounded-md flex flex-col gap-y-2 overflow-hidden p-1 -translate-x-5"
          sideOffset={5}
          side={"bottom"}
        >
          <DropdownMenu.Item
            className="text-sm px-4 py-2 rounded-sm hover:bg-elevated transition-all hover:cursor-pointer"
            disabled
          >
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="text-sm px-4 py-2 rounded-sm hover:bg-elevated transition-all hover:cursor-pointer"
            disabled
          >
            Settings
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] rounded-sm bg-elevated mx-2" />
          <DropdownMenu.Item
            onClick={handleLogOut}
            className="text-sm px-4 py-2 rounded-sm hover:bg-elevated transition-all hover:cursor-pointer"
            disabled
          >
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
