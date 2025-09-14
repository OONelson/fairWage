import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import Landing from "./../pages/Landing";
import NegotiationsList from "./../pages/NegotiationsList";
import NewNegotiation from "./../pages/NewNegotiation";
import NegotiationThread from "./../pages/NegotiationThread";
import AuthPage from "./../pages/Auth";

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

export default router;
