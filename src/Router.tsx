import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { searchTermLoader } from './components/SearchInput';
import { ArtistDetail } from './pages/ArtistDetail';

export const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/search',
                    loader: searchTermLoader,
                    element: <Search />,
                },
                {
                    path: '/artist/:artistId',
                    element: <ArtistDetail />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
};
