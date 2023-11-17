import { ClerkProvider } from "@clerk/clerk-react";
import { Router } from "./Router";
import { UserDataContextProvider } from "./contexts/UserDataContext";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("missing publishable key");
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <UserDataContextProvider>
        <Router />
      </UserDataContextProvider>
    </ClerkProvider>
  );
}

export default App;
