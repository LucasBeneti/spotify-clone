import { useState } from 'react';
import { MagnifyingGlass, House } from '@phosphor-icons/react';
export const Sidebar = () => {
    const [selected, setSelected] = useState<'home' | 'search'>('home');
    return (
        <aside className='flex flex-col gap-y-2 w-3/12 m-2'>
            <ul className='bg-base rounded-md px-3 py-2'>
                <li
                    className='flex items-center px-3 py-1 h-10 cursor-pointer'
                    onClick={() => setSelected('home')}
                >
                    <House size={24} />
                    <p className='text-base font-bold ml-4 text-white'>Home</p>
                </li>

                <li
                    className='flex items-center px-3 py-1 h-10 cursor-pointer'
                    onClick={() => setSelected('search')}
                >
                    <MagnifyingGlass
                        size={24}
                        weight={selected === 'search' ? 'fill' : undefined}
                    />
                    <p className='text-base font-bold ml-4 text-white'>
                        Search
                    </p>
                </li>
            </ul>
            <div className='bg-base rounded-md '>playlists</div>
        </aside>
    );
};
