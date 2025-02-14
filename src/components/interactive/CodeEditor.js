import { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { FiPlay, FiSave, FiRotateCcw, FiCode } from 'react-icons/fi';

const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
];

const LANGUAGE_TEMPLATES = {
  javascript: '// Seu código JavaScript aqui\n\n',
  python: '# Seu código Python aqui\n\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        // Seu código Java aqui\n    }\n}\n',
  html: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Página</title>\n</head>\n<body>\n    <!-- Seu código HTML aqui -->\n</body>\n</html>\n',
  css: '/* Seu código CSS aqui */\n\n',
};

export default function CodeEditor({
  initialLanguage = 'javascript',
  initialCode = '',
  height = '400px',
  onSave,
  onRun,
}) {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode || LANGUAGE_TEMPLATES[initialLanguage]);
  const { theme } = useTheme();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (!initialCode && LANGUAGE_TEMPLATES[language]) {
      setCode(LANGUAGE_TEMPLATES[language]);
    }
  }, [language, initialCode]);

  // Auto-save feature
  useEffect(() => {
    if (isEditorReady && onSave) {
      const saveInterval = setInterval(() => {
        onSave(code);
        setStatusMessage('Código salvo automaticamente');
        setTimeout(() => setStatusMessage(''), 3000);
      }, 30000); // Save every 30 seconds

      return () => clearInterval(saveInterval);
    }
  }, [code, isEditorReady, onSave]);

  const handleEditorDidMount = () => {
    setIsEditorReady(true);
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar o código?')) {
      setCode(LANGUAGE_TEMPLATES[language]);
      setStatusMessage('Código resetado');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    if (code === LANGUAGE_TEMPLATES[language]) {
      // If current code is template, switch to new template
      setCode(LANGUAGE_TEMPLATES[newLanguage]);
    } else if (window.confirm('Mudar a linguagem irá resetar o código. Continuar?')) {
      setCode(LANGUAGE_TEMPLATES[newLanguage]);
    } else {
      return;
    }
    setLanguage(newLanguage);
    setStatusMessage(`Linguagem alterada para ${newLanguage}`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(code);
      setStatusMessage('Código salvo');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const handleRun = () => {
    if (onRun) {
      onRun(code);
      setStatusMessage('Executando código...');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FiCode className="text-gray-500" />
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            title="Reset código"
          >
            <FiRotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleSave}
            className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            title="Salvar código"
          >
            <FiSave className="w-4 h-4" />
          </button>
          <button
            onClick={handleRun}
            className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            title="Executar código"
          >
            <FiPlay className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <Editor
        height={height}
        language={language}
        value={code}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        onChange={(value) => setCode(value)}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          suggestOnTriggerCharacters: true,
        }}
      />

      {/* Status Bar */}
      <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
        <span>{statusMessage}</span>
        <span>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
      </div>
    </div>
  );
}