import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { ArtistDetailsPage } from "./pages/ArtistDetailsPage";
import { PlaylistPage } from "./pages/PlaylistPage";
import { AlbumPage } from "./pages/AlbumPage";

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
          element: <Search />,
        },
        {
          path: "/artist/:artistId",
          element: <ArtistDetailsPage />,
        },
        {
          path: "/album/:id",
          element: <AlbumPage />,
        },
        {
          path: "/playlist/:id",
          element: <PlaylistPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
