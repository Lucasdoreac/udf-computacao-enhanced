import { FiBook, FiCode, FiArrowRight } from 'react-icons/fi';
import PropTypes from 'prop-types';
import ProgressIndicator from './ProgressIndicator';

export default function SubjectCard({ 
  title, 
  description, 
  icon = 'book',
  progress,
  href,
  topics = [] 
}) {
  const icons = {
    book: FiBook,
    code: FiCode
  };

  const Icon = icons[icon] || FiBook;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {description}
        </p>

        {topics.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Tópicos Principais:
            </h4>
            <ul className="space-y-1">
              {topics.slice(0, 3).map((topic, index) => (
                <li 
                  key={index}
                  className="text-sm text-gray-600 dark:text-gray-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full mr-2" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        )}

        {progress && (
          <div className="mt-6">
            <ProgressIndicator
              completed={progress.completed}
              total={progress.total}
              label="Progresso da Disciplina"
            />
          </div>
        )}

        <div className="mt-6">
          <a
            href={href}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Acessar Conteúdo
            <FiArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

SubjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(['book', 'code']),
  progress: PropTypes.shape({
    completed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }),
  href: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.string)
};