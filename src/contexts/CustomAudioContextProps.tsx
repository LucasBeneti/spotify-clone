import { MutableRefObject, createContext, useRef } from 'react';

interface CustomAudioContextProps {
    audioRef?: MutableRefObject<HTMLAudioElement | undefined>;
    currPlaying?: { title: string; author: string };
}

export const CustomAudioContext = createContext<CustomAudioContextProps>({});

interface AudioContextProviderProps {
    children: React.ReactNode;
}
export const AudioContextProvider = ({
    children,
}: AudioContextProviderProps) => {
    const audioRef = useRef();
    const currPlaying = { title: '', author: '' };
    return (
        <CustomAudioContext.Provider value={{ audioRef, currPlaying }}>
            {children}
        </CustomAudioContext.Provider>
    );
};
