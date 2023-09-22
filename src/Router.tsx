import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { ArtistDetail } from './pages/ArtistDetail';
export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<DefaultLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/artist/:artistId' element={<ArtistDetail />} />
            </Route>
        </Routes>
    );
};
