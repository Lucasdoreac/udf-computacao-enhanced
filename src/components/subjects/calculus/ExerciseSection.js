import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiCheck, FiX, FiArrowRight, FiHelpCircle } from 'react-icons/fi';
import MathVisualization from './MathVisualization';

// Helper components
const FeedbackMessage = ({ type, message }) => {
  const styles = {
    success: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    error: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
  };

  return (
    <div className={`p-3 rounded-md ${styles[type]}`}>
      {type === 'success' && <FiCheck className="inline-block mr-2" />}
      {type === 'error' && <FiX className="inline-block mr-2" />}
      {type === 'info' && <FiHelpCircle className="inline-block mr-2" />}
      {message}
    </div>
  );
};

const StepByStepSolution = ({ steps }) => (
  <div className="space-y-3">
    {steps.map((step, index) => (
      <div
        key={index}
        className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
      >
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
          {index + 1}
        </span>
        <div className="flex-grow">
          <p className="text-gray-700 dark:text-gray-300">{step.explanation}</p>
          {step.formula && (
            <code className="mt-1 block bg-white dark:bg-gray-900 p-2 rounded text-sm font-mono">
              {step.formula}
            </code>
          )}
        </div>
      </div>
    ))}
  </div>
);

const MathInput = ({ value, onChange, placeholder, error }) => (
  <div className="space-y-1">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white
        ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
        focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
    {error && (
      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
    )}
  </div>
);

export default function ExerciseSection({
  exercises,
  onComplete,
  showVisualization = true,
}) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [completed, setCompleted] = useState([]);

  const exercise = exercises[currentExercise];

  const validateAnswer = (answer) => {
    // Basic validation - should be expanded based on exercise type
    return answer.trim().toLowerCase() === exercise.answer.toLowerCase();
  };

  const handleSubmit = () => {
    const isCorrect = validateAnswer(userAnswer);
    setAttempts(prev => prev + 1);

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: 'Correto! Muito bem!'
      });
      setCompleted([...completed, currentExercise]);
      
      // Wait a bit before moving to next exercise
      setTimeout(() => {
        if (currentExercise < exercises.length - 1) {
          setCurrentExercise(prev => prev + 1);
          setUserAnswer('');
          setFeedback(null);
          setShowSolution(false);
          setAttempts(0);
        } else {
          onComplete?.();
        }
      }, 2000);
    } else {
      setFeedback({
        type: 'error',
        message: attempts >= 2 
          ? 'Que tal ver a solução passo a passo?'
          : 'Tente novamente!'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Exercício {currentExercise + 1} de {exercises.length}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {completed.length} concluídos
        </span>
      </div>

      {/* Exercise Content */}
      <div className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">
          {exercise.question}
        </p>

        {/* Visualization */}
        {showVisualization && exercise.visualization && (
          <div className="mt-4">
            <MathVisualization
              type={exercise.visualization.type}
              initialState={exercise.visualization.state}
            />
          </div>
        )}

        {/* Answer Input */}
        <div className="mt-4">
          <MathInput
            value={userAnswer}
            onChange={setUserAnswer}
            placeholder="Digite sua resposta..."
            error={feedback?.type === 'error' ? feedback.message : null}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setShowSolution(true)}
            disabled={attempts < 2}
            className="text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ver solução
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Verificar
            <FiArrowRight className="inline-block ml-2" />
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="mt-4">
            <FeedbackMessage type={feedback.type} message={feedback.message} />
          </div>
        )}

        {/* Solution */}
        {showSolution && (
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Solução Passo a Passo
            </h4>
            <StepByStepSolution steps={exercise.solution} />
          </div>
        )}
      </div>
    </div>
  );
}

ExerciseSection.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
      solution: PropTypes.arrayOf(
        PropTypes.shape({
          explanation: PropTypes.string.isRequired,
          formula: PropTypes.string,
        })
      ).isRequired,
      visualization: PropTypes.shape({
        type: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  onComplete: PropTypes.func,
  showVisualization: PropTypes.bool,
};

FeedbackMessage.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
  message: PropTypes.string.isRequired,
};

StepByStepSolution.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      explanation: PropTypes.string.isRequired,
      formula: PropTypes.string,
    })
  ).isRequired,
};

MathInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};