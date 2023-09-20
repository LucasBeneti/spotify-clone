import { createContext, useRef, useState, useEffect, useContext } from 'react';

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

type Track = {
    title: string;
    artist: string;
    color: string;
    img?: string;
    audioSrc: string;
};

type CustomAudioContextProps = {
    tracks: Track[];
    duration: number;
    isPlaying: boolean;
    trackProgress: number;
    toggleIsPlaying: () => void;
    toPreviousTrack: () => void;
    toNextTrack: () => void;
    currPlaying?: { title: string; author: string };
    onScrub: (n: number[]) => void;
    onScrubEnd: () => void;
};

export const CustomAudioContext = createContext<CustomAudioContextProps | null>(
    null
);

interface AudioContextProviderProps {
    children: React.ReactNode;
}
export const AudioContextProvider = ({
    children,
}: AudioContextProviderProps) => {
    const [tracks, setTrack] = useState(testTracks); // TODO used for adding/removing tracks to the queue
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const { audioSrc } = tracks[trackIndex];
    const audioRef = useRef(new Audio(audioSrc));
    const currPlaying = { title: '', author: '' };

    const intervalRef = useRef();
    const isReady = useRef(false);

    const { duration } = audioRef.current;

    const toggleIsPlaying = () => {
        setIsPlaying(!isPlaying);
    };

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
        <CustomAudioContext.Provider
            value={{
                tracks,
                duration,
                isPlaying,
                trackProgress,
                toNextTrack,
                toPreviousTrack,
                toggleIsPlaying,
                currPlaying,
                onScrub,
                onScrubEnd,
            }}
        >
            {children}
        </CustomAudioContext.Provider>
    );
};

export const useCustomAudioContext = () => {
    const context = useContext(CustomAudioContext);
    if (!context) {
        throw new Error(
            'useCustomAudioContext must be used within AudioContextProvider.'
        );
    }

    return context;
};
