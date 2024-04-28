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
    <div className='flex items-center justify-center p-3 mb-2'>
        <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Kategoriye göre ara..."
        value={searchTerm}
        onChange={handleChange}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md ml-2">
  Ara
</button>

    </form>
    </div>
  );
};

export default SearchBox;
