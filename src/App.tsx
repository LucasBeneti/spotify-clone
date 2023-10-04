import { ClerkProvider } from '@clerk/clerk-react';
import { Router } from './Router';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    throw new Error('missing publishable key');
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
    return (
        <ClerkProvider publishableKey={clerkPubKey}>
            <Router />
        </ClerkProvider>
    );
}

export default App;
