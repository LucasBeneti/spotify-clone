import { useRef } from 'react';
import { Form } from 'react-router-dom';

import { debounce } from '../utils';

export const SearchInput = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.value) {
            return;
        }
        formRef.current?.dispatchEvent(
            new Event('submit', { bubbles: true, cancelable: true })
        );
    };

    return (
        <Form method='get' action='/search' ref={formRef}>
            <input
                type='text'
                name='q'
                onChange={debounce(handleSearchInput, 2000)}
                className='active:border-2 active:border-white bg-highlight h-10 w-56 rounded-full py-2 pl-4'
                placeholder='O que você quer ouvir?'
            />
        </Form>
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
