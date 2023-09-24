import { Outlet, useLocation } from 'react-router-dom';
import { CaretLeft, CaretRight, Bell } from '@phosphor-icons/react';
import { AudioContextProvider } from '../contexts/CustomAudioContext';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { SearchInput } from '../components/SearchInput';

export const DefaultLayout = () => {
    const { pathname } = useLocation();

    const showSearchInput = pathname === '/search';
    return (
        <>
            <AudioContextProvider>
                <div className='flex bg-black flex-col text-white h-screen'>
                    <div className='flex gap-x-2 p-2'>
                        <Sidebar />
                        <main className='flex flex-col flex-1 bg-base p-2 rounded-md h-[calc(100vh-5.5rem)] overflow-hidden relative'>
                            <header
                                className='flex flex-1 w-full absolute top-0 justify-between pr-4 pt-4'
                                style={{ zIndex: 100 }}
                            >
                                <div className='flex gap-x-2'>
                                    <button className='rounded-full bg-black p-2'>
                                        <CaretLeft size={24} />
                                    </button>
                                    <button className='rounded-full bg-black p-2'>
                                        <CaretRight size={24} />
                                    </button>
                                    {showSearchInput && <SearchInput />}
                                </div>

                                <div className='flex items-center gap-x-4'>
                                    <button className='rounded-full bg-black p-2'>
                                        <Bell size={24} />
                                    </button>
                                    <button className='bg-black'>
                                        <img
                                            src='https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1043643305713997&height=50&width=50&ext=1697997576&hash=AeS9oR9BrKdb45NfpcM'
                                            alt='Profile photo'
                                            className='rounded-full h-6'
                                        />
                                    </button>
                                </div>
                            </header>
                            <Outlet />
                        </main>
                    </div>
                    <Footer />
                </div>
            </AudioContextProvider>
        </>
    );
};
