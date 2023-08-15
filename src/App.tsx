import { CaretRight, CaretLeft } from '@phosphor-icons/react';
import { Sidebar } from './components/Sidebar';
import { RecentPlayedCard } from './components/RecentPlayedCard';
function App() {
    return (
        <>
            <div className='flex bg-black flex-col text-white h-screen'>
                <div className='flex'>
                    <Sidebar />
                    <main className='flex-1 bg-base my-2 p-2 rounded-md '>
                        <div className='flex gap-x-2'>
                            <button className='rounded-full bg-base p-2'>
                                <CaretLeft size={24} />
                            </button>
                            <button className='rounded-full bg-base p-2'>
                                <CaretRight size={24} />
                            </button>
                        </div>
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
                    </main>
                </div>
                <footer>player</footer>
            </div>
        </>
    );
}

export default App;
