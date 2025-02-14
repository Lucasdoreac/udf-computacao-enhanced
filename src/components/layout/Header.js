import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from '../ui/ThemeToggle';
import SearchBar from '../ui/SearchBar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Cálculo 1', href: '/calculo-1' },
    { name: 'Sistema C&S', href: '/sistemas' },
    { name: 'Progresso', href: '/progresso' },
  ];

  const handleSearch = (term) => {
    // TODO: Implement search functionality
    console.log('Searching for:', term);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                UDF Computação
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Search and Theme Toggle */}
            <div className="flex items-center ml-6 space-x-4">
              <SearchBar onSearch={handleSearch} />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-4 px-3 flex items-center space-x-4">
                <SearchBar onSearch={handleSearch} />
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}