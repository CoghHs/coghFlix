import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./screens/Home";
import Popular from "./screens/Popular";
import ComingSoon from "./screens/ComingSoon";
import NowPlaying from "./screens/NowPlaying";
import MovieDetail from "./components/MovieDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "movies/:id",
        element: <Home />,
      },

      {
        path: "popular",
        element: <Popular />,
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
      },
    ],
  },
]);
