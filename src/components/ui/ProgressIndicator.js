import { FiCheckCircle, FiCircle } from 'react-icons/fi';

export default function ProgressIndicator({ completed, total, label }) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {completed}/{total}
        </span>
      </div>
      <div className="relative">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between">
          {Array.from({ length: total }).map((_, index) => (
            <div key={index} className="flex-1 flex justify-center">
              {index < completed ? (
                <FiCheckCircle className="h-4 w-4 text-blue-500" />
              ) : (
                <FiCircle className="h-4 w-4 text-gray-300 dark:text-gray-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}