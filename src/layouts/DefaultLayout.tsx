import { Outlet } from 'react-router-dom';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { AudioContextProvider } from '../contexts/CustomAudioContext';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';

export const DefaultLayout = () => {
    return (
        <>
            <AudioContextProvider>
                <div className='flex bg-black flex-col text-white h-screen'>
                    <div className='flex gap-x-2 p-2'>
                        <Sidebar />
                        <main className='flex-1 bg-base p-2 rounded-md h-[calc(100vh-5.5rem)] overflow-hidden'>
                            <div className='flex gap-x-2'>
                                <button className='rounded-full bg-base p-2'>
                                    <CaretLeft size={24} />
                                </button>
                                <button className='rounded-full bg-base p-2'>
                                    <CaretRight size={24} />
                                </button>
                            </div>
                            <Outlet />
                        </main>
                    </div>
                    <Footer />
                </div>
            </AudioContextProvider>
        </>
    );
};
