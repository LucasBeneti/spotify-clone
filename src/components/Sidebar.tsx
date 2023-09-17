import { useState } from 'react';
import { PlaylistItem } from './PlaylistItem';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {
    MagnifyingGlass,
    House,
    Playlist,
    Plus,
    ArrowRight,
} from '@phosphor-icons/react';
export const Sidebar = () => {
    const [selected, setSelected] = useState<'home' | 'search'>('home');
    const playlists = [
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
            pinned: true,
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
        {
            name: 'Liked songs',
            type: 'Playlist',
            author: 'Eu',
        },
    ];
    return (
        <aside className='flex flex-col gap-y-2 w-3/12 max-w-sm h-[calc(100vh-5.5rem)] rounded-md overflow-hidden'>
            <nav className='flex flex-col gap-y-4 bg-base rounded-md px-3 py-2'>
                <a
                    className='flex items-center px-3 py-1 cursor-pointer'
                    onClick={() => setSelected('home')}
                >
                    <House size={24} />
                    <p className='text-base font-bold ml-4 text-white'>Home</p>
                </a>
                <a
                    className='flex items-center px-3 py-1 cursor-pointer'
                    onClick={() => setSelected('search')}
                >
                    <MagnifyingGlass
                        size={24}
                        weight={selected === 'search' ? 'fill' : undefined}
                    />
                    <p className='text-base font-bold ml-4 text-white'>
                        Search
                    </p>
                </a>
            </nav>
            <div className='flex flex-col bg-base rounded-md px-3 py-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex px-3 py-2'>
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
                <nav className='flex'>
                    <ScrollArea.Root className='w-full'>
                        <ScrollArea.Viewport className='flex flex-1 flex-col gap-y-4 h-[calc(100vh-14rem)]'>
                            {playlists.map((el, index) => {
                                return (
                                    <PlaylistItem
                                        key={el.name + index}
                                        name={el.name}
                                        type={el.type}
                                        author={el.author}
                                        pinned={el.pinned}
                                    />
                                );
                            })}
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar orientation='vertical'>
                            <ScrollArea.Thumb />
                        </ScrollArea.Scrollbar>
                    </ScrollArea.Root>
                </nav>
            </div>
        </aside>
    );
};
