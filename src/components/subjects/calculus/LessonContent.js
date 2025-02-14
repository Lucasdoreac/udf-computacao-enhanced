import React from 'react';
import PropTypes from 'prop-types';
import { FiCheckCircle, FiChevronRight } from 'react-icons/fi';

export default function LessonContent({
  title,
  content,
  sections,
  currentSection,
  isCompleted,
  onSectionChange,
  onComplete
}) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          {isCompleted && (
            <span className="flex items-center text-green-600 dark:text-green-400">
              <FiCheckCircle className="w-5 h-5 mr-2" />
              Concluído
            </span>
          )}
        </div>
        
        {/* Section Navigation */}
        <div className="mt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            {sections.map((section, index) => (
              <React.Fragment key={section.id}>
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={`hover:text-gray-900 dark:hover:text-white ${
                    currentSection === section.id
                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                      : ''
                  }`}
                >
                  {section.title}
                </button>
                {index < sections.length - 1 && (
                  <FiChevronRight className="w-4 h-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        {content}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between items-center border-t dark:border-gray-700 pt-4">
        <button
          onClick={() => {
            const currentIndex = sections.findIndex(s => s.id === currentSection);
            if (currentIndex > 0) {
              onSectionChange(sections[currentIndex - 1].id);
            }
          }}
          disabled={sections.findIndex(s => s.id === currentSection) === 0}
          className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Seção Anterior
        </button>

        {sections.findIndex(s => s.id === currentSection) === sections.length - 1 ? (
          <button
            onClick={onComplete}
            disabled={isCompleted}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCompleted ? 'Lição Concluída' : 'Marcar como Concluída'}
          </button>
        ) : (
          <button
            onClick={() => {
              const currentIndex = sections.findIndex(s => s.id === currentSection);
              if (currentIndex < sections.length - 1) {
                onSectionChange(sections[currentIndex + 1].id);
              }
            }}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Próxima Seção
          </button>
        )}
      </div>
    </div>
  );
}

LessonContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentSection: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onSectionChange: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};