import { useState } from 'react';
import { PlaylistItem } from './PlaylistItem';
import {
    MagnifyingGlass,
    House,
    Playlist,
    Plus,
    ArrowRight,
} from '@phosphor-icons/react';
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
            <div className='flex flex-col bg-base rounded-md px-3 py-2'>
                <div className='flex flex-1 items-center justify-between'>
                    <div className='flex px-3 py-1'>
                        <Playlist size={24} weight='fill' />
                        <p className='text-base font-bold text-white ml-4'>
                            Your library
                        </p>
                    </div>
                    <div className='flex gap-x-4'>
                        <Plus size={24} />
                        <ArrowRight size={24} />
                    </div>
                </div>
                <div>
                    <ul>
                        <li>
                            <PlaylistItem
                                name='Linked songs'
                                type='Playlist'
                                author='Eu'
                                pinned={true}
                            />
                        </li>
                        <li>
                            <PlaylistItem
                                name='Linked songs'
                                type='Playlist'
                                author='Eu'
                            />
                        </li>
                        <li>
                            <PlaylistItem
                                name='Linked songs'
                                type='Playlist'
                                author='Eu'
                            />
                        </li>
                        <li>
                            <PlaylistItem
                                name='Linked songs'
                                type='Playlist'
                                author='Eu'
                            />
                        </li>
                        <li>
                            <PlaylistItem
                                name='Linked songs'
                                type='Playlist'
                                author='Eu'
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};
