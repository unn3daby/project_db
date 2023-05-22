import React from 'react';
import './SearchBar.scss';
const SearchBar = ({placeholder, value, setValue}) => {
    return (
        <input autoComplete = 'off' className = 'searchbar' value = {value} onChange = {(e) => setValue(e.target.value)} type="text" name="text" placeholder={placeholder}/>
    );
};

export default SearchBar;