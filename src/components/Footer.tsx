import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { ArrowsOutSimple, SpeakerSimpleLow } from '@phosphor-icons/react';
import { MicIcon } from '../components/CustomIcons';
import { AudioPlayer } from './AudioPlayer';

const testTracks = [
    {
        title: 'Tokyo Lo-fi 1',
        artist: 'Unknown',
        color: 'purple',
        audioSrc: 'tvari-tokyo-cafe-159065.mp3',
    },
    {
        title: 'Tokyo Lo-fi 2',
        artist: 'Unknown',
        color: 'purple',
        audioSrc: 'tvari-tokyo-cafe-159065.mp3',
    },
    {
        title: 'Tokyo Lo-fi 3',
        artist: 'Unknown',
        color: 'purple',
        audioSrc: 'tvari-tokyo-cafe-159065.mp3',
    },
    {
        title: 'Tokyo Lo-fi 4',
        artist: 'Unknown',
        color: 'purple',
        audioSrc: 'tvari-tokyo-cafe-159065.mp3',
    },
];

export const Footer = () => {
    const [volume, setVolume] = useState<number[]>([0]);
    const handleVolumeChange = (value: number[]) => {
        setVolume(value);
        console.log('volume', volume);
    };
    return (
        <footer className='grid grid-cols-3 items-center h-20 bg-black w-screen fixed bottom-0'>
            <section className='justify-self-start pl-4'>
                <CurrentlyPlaying
                    songName='What you know'
                    author='Two Door Cinema Club'
                />
            </section>
            <section className='justify-self-center w-96'>
                <AudioPlayer tracks={testTracks} />
            </section>
            <section className='justify-self-end flex gap-x-2 pr-4'>
                <MicIcon stroke='#fff' className='h-6 w-6' />
                <SpeakerSimpleLow size={24} />
                <div className='w-24'>
                    <Slider.Root
                        value={volume}
                        onValueChange={handleVolumeChange}
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className='relative flex items-center w-24 h-5'
                    >
                        <Slider.Track className='bg-subdued relative flex-1 rounded-full h-1'>
                            <Slider.Range className='absolute bg-white rounded-full h-full' />
                        </Slider.Track>
                        <Slider.Thumb
                            aria-label='Volume'
                            className='block bg-white shadow-md rounded-lg'
                        />
                    </Slider.Root>
                </div>
                <ArrowsOutSimple size={24} />
            </section>
        </footer>
    );
};

interface CurrentlyPlayingProps {
    songName: string;
    author: string;
    album?: string;
}
const CurrentlyPlaying = ({ songName, author }: CurrentlyPlayingProps) => {
    return (
        <div className='flex gap-x-4 items-center'>
            <img
                src='https://i.scdn.co/image/ab67616d0000b273585f3d70dce678a5978a0941'
                alt='Album'
                className='object-cover w-14 rounded-md'
            />
            <div>
                <a
                    href='#'
                    className='text-sm block hover:underline hover:cursor-pointer'
                >
                    {songName}
                </a>
                <a
                    href='#'
                    className='text-xs block text-subdued hover:underline hover cursor-pointer'
                >
                    {author}
                </a>
            </div>
        </div>
    );
};
