import { ClerkProvider } from "@clerk/clerk-react";
import { Router } from "./Router";
import { CookiesProvider } from "react-cookie";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { UserDataContextProvider } from "@contexts/UserDataContext";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("missing publishable key");
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const queryClient = new QueryClient();

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider>
          <UserDataContextProvider>
            <Router />
          </UserDataContextProvider>
        </CookiesProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
