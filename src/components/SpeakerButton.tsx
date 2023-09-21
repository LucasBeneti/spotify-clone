import {
    SpeakerSimpleLow,
    SpeakerSimpleHigh,
    SpeakerSimpleSlash,
} from '@phosphor-icons/react';
import { useCustomAudioContext } from '../contexts/CustomAudioContext';

export const SpeakerButton = () => {
    const { volume, toggleAudioMute } = useCustomAudioContext();

    return (
        <button onClick={toggleAudioMute}>
            {volume[0] < 5 ? (
                <SpeakerSimpleSlash size={24} />
            ) : volume[0] > 50 ? (
                <SpeakerSimpleHigh size={24} />
            ) : (
                <SpeakerSimpleLow size={24} />
            )}
        </button>
    );
};
