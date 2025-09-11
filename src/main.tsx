import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
