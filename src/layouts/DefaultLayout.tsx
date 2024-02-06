import { Outlet } from "react-router-dom";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { AudioContextProvider } from "@contexts/CustomAudioContext";
import { Footer, MainHeader, Sidebar } from "@components/layout";

export const DefaultLayout = () => {
  return (
    <>
      <SignedIn>
        <AudioContextProvider>
          <div className="flex bg-black flex-col text-white h-screen">
            <div className="flex gap-x-2 p-2">
              <Sidebar />
              <main className="flex flex-col flex-1 bg-base rounded-md h-[calc(100vh-5.5rem)] overflow-hidden relative">
                <MainHeader />
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
