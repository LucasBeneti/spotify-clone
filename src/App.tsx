import { ClerkProvider } from "@clerk/clerk-react";
import { Router } from "./Router";
import { UserDataContextProvider } from "./contexts/UserDataContext";
import { CookiesProvider } from "react-cookie";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("missing publishable key");
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <CookiesProvider>
        <UserDataContextProvider>
          <Router />
        </UserDataContextProvider>
      </CookiesProvider>
    </ClerkProvider>
  );
}

export default App;
