import type { router } from "lib/router";
import { Providers } from "providers";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <Providers />;
}

export default App;
