import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  BellIcon,
} from "@radix-ui/react-icons";
import { useUser } from "@clerk/clerk-react";
import { SearchInput } from "../SearchInput";
import { UserAvatar } from "../user/UserAvatar";

export const MainHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const navigateBack = () => navigate(-1);
  const navigateForward = () => navigate(1);
  const showSearchInput = pathname === "/search";

  return (
    <header
      className="flex flex-1 w-full absolute top-0 justify-between pr-4 pl-4 pt-4"
      style={{ zIndex: 100 }}
    >
      <div className="flex gap-x-2 items-center">
        <button
          className="rounded-full bg-black p-1 h-10 w-10 flex justify-center items-center"
          onClick={navigateBack}
        >
          <ChevronLeftIcon className="scale-150" />
        </button>
        <button
          className="rounded-full bg-black p-1 h-10 w-10 flex justify-center items-center"
          onClick={navigateForward}
        >
          <ChevronRightIcon className="scale-150" />
        </button>
        {showSearchInput && <SearchInput />}
      </div>

      <div className="flex items-center gap-x-4">
        <button className="rounded-full bg-black p-2">
          <BellIcon className="transform-150" />
        </button>
        <UserAvatar username={user?.username} />
      </div>
    </header>
  );
};
