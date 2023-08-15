import { Outlet } from 'react-router-dom';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Sidebar } from '../components/Sidebar';

export const DefaultLayout = () => {
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
                        <Outlet />
                    </main>
                </div>
                <footer>player</footer>
            </div>
        </>
    );
};
