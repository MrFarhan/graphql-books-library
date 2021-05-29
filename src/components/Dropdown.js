import React from 'react';

export const Dropdown = () => {
    return (
        <span >
            <select >
                <option value="author">Author</option>
                <option value="book">Book</option>
            </select>
            <input type="text" />
            <button>Search</button>
        </span>
    )
}
