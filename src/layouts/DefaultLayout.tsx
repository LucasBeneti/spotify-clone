import { Outlet, useLocation } from "react-router-dom";
import { CaretLeft, CaretRight, Bell } from "@phosphor-icons/react";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import { AudioContextProvider } from "../contexts/CustomAudioContext";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { SearchInput } from "../components/SearchInput";

export const DefaultLayout = () => {
  const { pathname } = useLocation();
  const { user } = useUser();

  const showSearchInput = pathname === "/search";
  return (
    <>
      <SignedIn>
        <AudioContextProvider>
          <div className="flex bg-black flex-col text-white h-screen">
            <div className="flex gap-x-2 p-2">
              <Sidebar />
              <main className="flex flex-col flex-1 bg-base rounded-md h-[calc(100vh-5.5rem)] overflow-hidden relative">
                <header
                  className="flex flex-1 w-full absolute top-0 justify-between pr-4 pl-4 pt-4"
                  style={{ zIndex: 100 }}
                >
                  <div className="flex gap-x-2">
                    <button className="rounded-full bg-black p-2">
                      <CaretLeft size={24} />
                    </button>
                    <button className="rounded-full bg-black p-2">
                      <CaretRight size={24} />
                    </button>
                    {showSearchInput && <SearchInput />}
                  </div>

                  <div className="flex items-center gap-x-4">
                    <button className="rounded-full bg-black p-2">
                      <Bell size={24} />
                    </button>
                    <button className="bg-black">
                      <img
                        src={user?.imageUrl}
                        alt={`${user?.username} profile image`}
                        title={`${user?.username}`}
                        className="rounded-full h-6"
                      />
                    </button>
                  </div>
                </header>
                <Outlet />
              </main>
            </div>
            <Footer />
          </div>
        </AudioContextProvider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};
