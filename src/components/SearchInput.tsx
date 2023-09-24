import { useState } from 'react';
import { Form } from 'react-router-dom';

export const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                onChange={(e) => console.log('', e.target.value)}
            />
        </form>
    );
};
