import { useParams } from 'react-router-dom';
export const ArtistDetail = () => {
    const { artistId } = useParams();
    return (
        <>
            <header className='h-64 w-full bg-highlight absolute top-2 '>
                <img
                    src='https://images.unsplash.com/photo-1549834125-82d3c48159a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
                    alt={`${artistId} Banner`}
                    className='h-72 w-full object-cover overflow-hidden rounded'
                />
                <h1 className='text-8xl font-bold font-display'>{artistId}</h1>
            </header>
            <h1>Astist {artistId}</h1>
        </>
    );
};
