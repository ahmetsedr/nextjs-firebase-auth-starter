import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center justify-center mt-9 p-4 mb-4 shadow-sm">
      <form onSubmit={handleSubmit} className="mt-9 w-full max-w-md">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Kategoriye göre ara..."
            value={searchTerm}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
          />
          <button 
            type="submit" 
            className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-md hover:shadow-lg"
          >
            Ara
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;