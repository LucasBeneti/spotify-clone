import { useParams } from 'react-router-dom';
export const ArtistDetail = () => {
    const { artistId } = useParams();
    return (
        <>
            <header className='h-64 w-full bg-highlight'>
                <img
                    src=''
                    alt={`${artistId} Banner`}
                    className='absolute top-0 w-full'
                />
                <h1 className='text-8xl bold'>{artistId}</h1>
            </header>
            <h1>Astist {artistId}</h1>
        </>
    );
};
