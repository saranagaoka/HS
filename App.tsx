import { NavProvider } from "./NavContext";
import { CardProvider } from "./CardContext";
import { AuthProvider } from "./AuthContext";
import Application from "./Application";
import { LocationProvider } from "./LocationContext";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavProvider>
          <CardProvider>
            <LocationProvider>
              <Application />
            </LocationProvider>
          </CardProvider>
        </NavProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
