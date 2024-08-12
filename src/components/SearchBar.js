import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();  // Initialize the navigate function

    useEffect(() => {
        if (query.length > 1) {
            fetch(`http://localhost:5000/search_professor?query=${query}`)
                .then((response) => response.json())
                .then((data) => {
                    setSuggestions(data);
                })
                .catch((error) => console.error('Error fetching data:', error));
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.name);  // Fill the search bar with the selected name
        setSuggestions([]);  // Clear suggestions
        navigate(`/professor_public_profile/${suggestion.id}`);  // Navigate to professor's public profile
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search professor"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index} 
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.name} - {suggestion.department} ({suggestion.subjects})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
