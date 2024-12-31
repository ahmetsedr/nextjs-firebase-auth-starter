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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="p-5 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          {/* Copy Button */}
          <div className="flex items-center">
            <button 
              onClick={copyToClipboard} 
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-purple-500/30"
            >
              <span>📰</span>
              <span className="text-sm">Copy ASCII</span>
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Copy to clipboard
              </span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-col items-end">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Categories:</h4>
            <div className="flex flex-wrap gap-2 justify-end">
              {categories.map((category, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-400 border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-200"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ASCII Art Display */}
      <div className="relative group">
        <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-b-xl overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-gray-800/40">
          <pre className="text-center text-gray-300 font-mono selection:bg-purple-500/30 selection:text-white">
            {art}
          </pre>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-b-xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ASCIICard;
