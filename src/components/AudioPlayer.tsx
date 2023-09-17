import { useState, useRef, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Play, Pause, SkipBack, SkipForward } from '@phosphor-icons/react';

interface Track {
    title: string;
    artist: string;
    color: string;
    img?: string;
    audioSrc: string;
}

interface PlayerProps {
    tracks: Track[];
}

export const AudioPlayer = ({ tracks }: PlayerProps) => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const { audioSrc } = tracks[trackIndex];
    const audioRef = useRef(new Audio(audioSrc));

    const intervalRef = useRef();
    const isReady = useRef(false);

    const { duration } = audioRef.current;

    const toPreviousTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    };

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    };

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    };

    const onScrub = (value: number[]) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = Number(value[0]);
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        const currAudioRef = audioRef.current;
        const currIntervalRef = intervalRef.current;
        return () => {
            currAudioRef.pause();
            clearInterval(currIntervalRef);
        };
    }, []);

    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
    }, [trackIndex, audioSrc]);

    return (
        <div className='flex flex-col'>
            <AudioControls
                isPlaying={isPlaying}
                onPlayPauseClick={setIsPlaying}
                onPreviousClick={toPreviousTrack}
                onNextClick={toNextTrack}
            />
            <div className='w-full'>
                <Slider.Root
                    value={[trackProgress]}
                    onValueChange={onScrub}
                    step={1}
                    min={0}
                    max={duration}
                    onPointerUp={onScrubEnd}
                    className='relative flex items-center w-full h-5'
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
        </div>
    );
};

interface AudioControlsProps {
    isPlaying: boolean;
    onPlayPauseClick: React.Dispatch<React.SetStateAction<boolean>>;
    onPreviousClick: () => void;
    onNextClick: () => void;
}

const AudioControls = ({
    isPlaying,
    onPlayPauseClick,
    onPreviousClick,
    onNextClick,
}: AudioControlsProps) => {
    return (
        <div className='flex gap-x-6 justify-center'>
            <button className='p-2' onClick={onPreviousClick}>
                <SkipBack size={24} weight='fill' color='white' />
            </button>
            <button className='p-2'>
                {isPlaying ? (
                    <Pause
                        size={24}
                        weight='fill'
                        color='white'
                        onClick={() => onPlayPauseClick(false)}
                    />
                ) : (
                    <Play
                        size={24}
                        weight='fill'
                        color='white'
                        onClick={() => onPlayPauseClick(true)}
                    />
                )}
            </button>
            <button className='p-2' onClick={onNextClick}>
                <SkipForward size={24} weight='fill' color='white' />
            </button>
        </div>
    );
};
