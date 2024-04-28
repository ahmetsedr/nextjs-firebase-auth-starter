"use client"
import React, { useState, useEffect } from 'react';
import ASCIICard from './components/ASCIICard';
import asciiArts from './asciiArts.jsx';
import SearchBox from './components/Searchbox';

const App = () => {
    const [filteredArts, setFilteredArts] = useState(asciiArts);
    const [randomCategories, setRandomCategories] = useState([]);

    useEffect(() => {
        const categories = [...new Set(asciiArts.flatMap(art => art.categories))];
        const randomCategories = categories.sort(() => Math.random() - 0.5).slice(0, 4);
        setRandomCategories(randomCategories);
    }, []); // Sadece bir kere çalışacak

    const handleSearch = (searchTerm) => {
        const filtered = asciiArts.filter(art =>
            art.categories.some(category =>
                category.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredArts(filtered);
    };

    const handleCategoryClick = (category) => {
        handleSearch(category); // Kategoriye tıklandığında arama yap
    };

    return (
        <div className="container mx-auto px-4">
            <SearchBox onSearch={handleSearch} />
            <div className="flex justify-center my-4">
                {randomCategories.map((category, index) => (
                    <button key={index} onClick={() => handleCategoryClick(category)} className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md mx-2">
                        {category}
                    </button>
                ))}
            </div>
            {filteredArts.map(art => (
                <ASCIICard key={art.id} art={art.art} categories={art.categories} />
            ))}
        </div>
    );
};

export default App;
