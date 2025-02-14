import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiZoomIn, FiZoomOut, FiRotateCcw, FiDownload, FiHelpCircle, FiX } from 'react-icons/fi';
import GeogebraComponent from '../../interactive/GeogebraComponent';

const VISUALIZATION_PRESETS = {
  function: {
    algebraInput: true,
    showGrid: true,
    showAxes: true,
    defaultState: 'f(x) = x^2',
  },
  derivative: {
    algebraInput: true,
    showGrid: true,
    showAxes: true,
    defaultState: 'f(x) = x^2\nf\'(x)',
  },
  integral: {
    algebraInput: true,
    showGrid: true,
    showAxes: true,
    defaultState: 'f(x) = x^2\nIntegral[f, x]',
  },
};

export default function MathVisualization({
  type = 'function',
  initialState,
  onStateChange,
  showControls = true,
  showHelp = true,
}) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [appletInstance, setAppletInstance] = useState(null);
  const preset = VISUALIZATION_PRESETS[type] || VISUALIZATION_PRESETS.function;

  const handleZoomIn = () => {
    if (appletInstance) {
      const zoom = Math.min(zoomLevel + 20, 200);
      appletInstance.setZoom(zoom / 100);
      setZoomLevel(zoom);
    }
  };

  const handleZoomOut = () => {
    if (appletInstance) {
      const zoom = Math.max(zoomLevel - 20, 50);
      appletInstance.setZoom(zoom / 100);
      setZoomLevel(zoom);
    }
  };

  const handleReset = () => {
    if (window.confirm('Deseja resetar a visualização?')) {
      if (appletInstance) {
        appletInstance.reset();
        onStateChange?.(preset.defaultState);
      }
    }
  };

  const handleDownload = () => {
    if (appletInstance) {
      const canvas = appletInstance.getCanvas();
      if (canvas) {
        const link = document.createElement('a');
        link.download = `math-visualization-${type}.png`;
        link.href = canvas.toDataURL();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const HelpContent = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Como usar esta visualização
          </h3>
          <button
            onClick={() => setShowHelpModal(false)}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <ul className="list-disc pl-5 space-y-2">
            <li>Use o campo de entrada para digitar funções matemáticas</li>
            <li>Arraste para mover o gráfico</li>
            <li>Use a roda do mouse ou os botões de zoom para ajustar a escala</li>
            <li>Clique duas vezes para criar pontos</li>
            {type === 'derivative' && (
              <li>A derivada será mostrada automaticamente em vermelho</li>
            )}
            {type === 'integral' && (
              <li>A área sob a curva será destacada em azul</li>
            )}
          </ul>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Comandos úteis:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><code>f(x) = x^2</code> - Define uma função</li>
              <li><code>Derivative[f]</code> - Calcula a derivada</li>
              <li><code>Integral[f]</code> - Calcula a integral</li>
              <li><code>Point[(1,2)]</code> - Cria um ponto</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomIn}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="Aumentar zoom"
            >
              <FiZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="Diminuir zoom"
            >
              <FiZoomOut className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {zoomLevel}%
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleReset}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="Resetar visualização"
            >
              <FiRotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="Baixar visualização"
            >
              <FiDownload className="w-5 h-5" />
            </button>
            {showHelp && (
              <button
                onClick={() => setShowHelpModal(true)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                title="Ajuda"
              >
                <FiHelpCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* GeoGebra Component */}
      <GeogebraComponent
        id={`math-vis-${type}`}
        width="100%"
        height="400px"
        materialId=""
        showMenuBar={false}
        showToolBar={true}
        showAlgebraInput={preset.algebraInput}
        appletOnLoad={(api) => {
          setAppletInstance(api);
          api.setAxisLabels(1, "x", "y");
          api.setGridVisible(preset.showGrid);
          api.setAxesVisible(preset.showAxes);
          
          if (initialState) {
            api.evalCommand(initialState);
          } else {
            api.evalCommand(preset.defaultState);
          }
        }}
        onSave={(state) => {
          onStateChange?.(state);
        }}
      />

      {/* Help Modal */}
      {showHelpModal && <HelpContent />}
    </div>
  );
}

MathVisualization.propTypes = {
  type: PropTypes.oneOf(['function', 'derivative', 'integral']),
  initialState: PropTypes.string,
  onStateChange: PropTypes.func,
  showControls: PropTypes.bool,
  showHelp: PropTypes.bool,
};