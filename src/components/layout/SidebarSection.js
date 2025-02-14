import { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

export default function SidebarSection({ title, children, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </span>
        {isExpanded ? (
          <FiChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <FiChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800">
          {children}
        </div>
      )}
    </div>
  );
}