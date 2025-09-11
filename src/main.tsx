import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.tsx";
import Landing from "./pages/Landing";
import NegotiationsList from "./pages/NegotiationsList";
import NewNegotiation from "./pages/NewNegotiation";
import NegotiationThread from "./pages/NegotiationThread";
import AuthPage from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "negotiations", element: <NegotiationsList /> },
      { path: "negotiations/:id", element: <NegotiationThread /> },
      { path: "new", element: <NewNegotiation /> },
      { path: "auth", element: <AuthPage /> },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </StrictMode>
);
