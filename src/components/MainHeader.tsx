import { useNavigate, useLocation } from "react-router-dom";
import { CaretRight, CaretLeft, Bell } from "@phosphor-icons/react";
import { useUser } from "@clerk/clerk-react";
import { SearchInput } from "./SearchInput";

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
          <CaretLeft size={22} />
        </button>
        <button
          className="rounded-full bg-black p-1 h-10 w-10 flex justify-center items-center"
          onClick={navigateForward}
        >
          <CaretRight size={20} />
        </button>
        {showSearchInput && <SearchInput />}
      </div>

      <div className="flex items-center gap-x-4">
        <button className="rounded-full bg-black p-2">
          <Bell size={24} />
        </button>
        <button className="bg-black rounded-full">
          <img
            src={user?.imageUrl}
            alt={`${user?.username} profile image`}
            title={`${user?.username}`}
            className="rounded-full h-6"
          />
        </button>
      </div>
    </header>
  );
};
