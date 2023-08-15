import { RecentPlayedCard } from '../components/RecentPlayedCard';

export const Home = () => {
    return (
        <section>
            <h1 className='text-4xl font-bold'>Boa noite</h1>
            <section className='flex flex-1 flex-wrap gap-x-6 gap-y-4 mt-4'>
                <RecentPlayedCard
                    currentlyPlaying
                    name='Liked songs'
                    imgSrc='https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80'
                />
                <RecentPlayedCard
                    name='Liked songs'
                    imgSrc='https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80'
                />
                <RecentPlayedCard
                    name='Liked songs'
                    imgSrc='https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80'
                />
                <RecentPlayedCard
                    name='Liked songs'
                    imgSrc='https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80'
                />
                <RecentPlayedCard
                    name='Liked songs'
                    imgSrc='https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80'
                />
                <RecentPlayedCard
                    name='Liked songs'
                    imgSrc='https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80'
                />
            </section>
        </section>
    );
};
