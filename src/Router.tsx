import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { searchTermLoader } from "./components/SearchInput";
import { ArtistDetail } from "./pages/ArtistDetail";
import { PlaylistPage, playlistLoader } from "./pages/PlaylistPage";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/search",
          loader: searchTermLoader,
          element: <Search />,
        },
        {
          path: "/artist/:artistId",
          element: <ArtistDetail />,
        },
        {
          path: "/playlist/:id",
          loader: playlistLoader,
          element: <PlaylistPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
