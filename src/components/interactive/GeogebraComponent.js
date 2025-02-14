import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Script from 'next/script';

export default function GeogebraComponent({
  id,
  width = '100%',
  height = '400px',
  materialId = '',
  appletOnLoad,
  showMenuBar = false,
  showToolBar = true,
  showAlgebraInput = true,
  onSave,
}) {
  const appletRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.GGBApplet) {
      const ggbApp = new window.GGBApplet(
        {
          id,
          width,
          height,
          showMenuBar,
          showToolBar,
          showAlgebraInput,
          materialId,
          appletOnLoad: () => {
            setIsLoading(false);
            appletOnLoad?.();
          },
          errorCallback: (err) => {
            setError(err);
            setIsLoading(false);
          },
          theme: theme === 'dark' ? 'dark' : 'light',
        },
        true
      );

      // Clear previous instance if it exists
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      try {
        ggbApp.inject(containerRef.current);
        appletRef.current = ggbApp;
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
  }, [id, width, height, materialId, showMenuBar, showToolBar, showAlgebraInput, theme]);

  // Auto-save feature
  useEffect(() => {
    if (!isLoading && !error && appletRef.current && onSave) {
      const saveInterval = setInterval(() => {
        try {
          const state = appletRef.current.getAppletObject()?.getXML();
          if (state) {
            onSave(state);
          }
        } catch (err) {
          console.error('Failed to save GeoGebra state:', err);
        }
      }, 30000); // Save every 30 seconds

      return () => clearInterval(saveInterval);
    }
  }, [isLoading, error, onSave]);

  return (
    <div className="relative">
      <Script
        src="https://www.geogebra.org/apps/deployggb.js"
        strategy="beforeInteractive"
        onError={(e) => {
          setError('Failed to load GeoGebra script');
          setIsLoading(false);
        }}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900">
          <div className="text-red-600 dark:text-red-200 text-center p-4">
            <p className="font-semibold">Error loading GeoGebra</p>
            <p className="text-sm">{error.toString()}</p>
          </div>
        </div>
      )}
      
      <div
        ref={containerRef}
        className={`w-full ${isLoading || error ? 'invisible' : ''}`}
        style={{ height }}
      />
    </div>
  );
}