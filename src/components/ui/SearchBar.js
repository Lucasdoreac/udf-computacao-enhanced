import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  return (
    <div className="relative">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg transition-colors"
          aria-label="Open search"
        >
          <FiSearch className="h-5 w-5" />
        </button>
      ) : (
        <div className="absolute right-0 top-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Pesquisar..."
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="ml-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2"
              aria-label="Close search"
            >
              <FiX className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}