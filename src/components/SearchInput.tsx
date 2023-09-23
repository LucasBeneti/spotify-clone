import { useState } from 'react';
import { Form } from 'react-router-dom';

export const SearchInput = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = () => {
        console.log('');
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type='text' />
        </form>
    );
};
