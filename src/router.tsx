import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Landing from "./pages/Landing";
import NegotiationsList from "./pages/NegotiationsList";
import NewNegotiation from "./pages/NewNegotiation";
import NegotiationThread from "./pages/NegotiationThread";
import AuthPage from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/auth", element: <AuthPage /> },
      {
        path: "/negotiations",
        element: (
          <ProtectedRoute>
            <NegotiationsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/negotiations/:id",
        element: (
          <ProtectedRoute>
            <NegotiationThread />
          </ProtectedRoute>
        ),
      },
      {
        path: "/new",
        element: (
          <ProtectedRoute>
            <NewNegotiation />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
