import { RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "jotai";
import { instegramRouter } from "./router/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={instegramRouter} />
      </QueryClientProvider>
    </Provider>
  );
}
