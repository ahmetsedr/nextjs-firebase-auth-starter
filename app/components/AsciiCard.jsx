import React from 'react';

const ASCIICard = ({ art, categories }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(art);
    alert("Copied to clipboard!");
    setTimeout(() => {
      alert("✅ Copied to clipboard!");
    }, 2000);
  };  

  return (
    <div className="bg-gray-800 rounded-md shadow-md mb-4 mx-auto sm:w-2/4 md:w-2/4">
  <div className="p-4 flex flex-col sm:flex-row items-center justify-between">
    <div className="flex items-center mb-2 sm:mb-0">
      <button onClick={copyToClipboard} className="bg-red-400 hover:bg-red-600 text-white font-medium py-1 px-3 md:px-4 rounded-full transition-colors duration-200 text-xs md:text-base ml-2">
        📰
      </button>
    </div>
    <div className="mt-2 sm:mt-0">
      <h4 className="font-semibold text-sm md:text-md text-white">Categories:</h4>
      <div className="flex flex-wrap mt-1">
      {categories.map((category, index) => (
          <span key={index} className="m-1 bg-white hover:bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-700 font-medium transition ease-in-out duration-200">
            {category}
          </span>
        ))}
      </div>
    </div>
  </div>
  <div className="bg-gray-200 p-4 rounded-md shadow-inner overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
    <pre className="text-center">{art}</pre>
  </div>
</div>
  );
};

export default ASCIICard;
