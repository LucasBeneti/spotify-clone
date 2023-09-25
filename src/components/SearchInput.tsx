import { useRef, useState } from 'react';
import { Form } from 'react-router-dom';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

import { debounce } from '../utils';

export const SearchInput = () => {
    const [inputFocus, setInputFocus] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef(null);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.value) {
            return;
        }
        formRef.current?.dispatchEvent(
            new Event('submit', { bubbles: true, cancelable: true })
        );
    };
    function clearSearchInput() {
        inputRef.current.value = '';
    }

    return (
        <span
            className={`grid grid-flow-col items-center rounded-full border-2 border-transparent bg-highlight h-12 w-80 px-2 ${
                inputFocus && 'border-white'
            }`}
        >
            <MagnifyingGlass size={20} />
            <Form method='get' action='/search' ref={formRef}>
                <input
                    type='text'
                    name='q'
                    onChange={debounce(handleSearchInput, 400)}
                    className='h-10 w-56 py-2 pl-4 bg-transparent outline-none'
                    placeholder='O que você quer ouvir?'
                    ref={inputRef}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                />
            </Form>
            <button onClick={clearSearchInput} className='justify-self-end'>
                <X size={20} className='hover:cursor-pointer' />
            </button>
        </span>
    );
};

// TODO look further to understand more about this loader functions and
// if it is a good idea to use it (would be cool to find limitations)
export const searchTermLoader = async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('q');
    if (!searchTerm) return null;
    const res = await fetch(`https://swapi.dev/api/planets/${searchTerm}`);
    return await res.json();
};
