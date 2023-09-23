import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Search = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        console.log('pathname', pathname);
    }, [pathname]);

    return <section className='mt-20'>Search content</section>;
};
