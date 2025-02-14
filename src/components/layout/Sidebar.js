import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import SidebarSection from './SidebarSection';
import ProgressIndicator from '../ui/ProgressIndicator';

export default function Sidebar({ currentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigationContent = {
    'calculo-1': {
      title: 'Cálculo 1',
      sections: [
        {
          title: 'Funções',
          items: [
            { name: 'Conceitos Básicos', href: '/calculo-1/funcoes/conceitos' },
            { name: 'Domínio e Imagem', href: '/calculo-1/funcoes/dominio-imagem' },
            { name: 'Gráficos', href: '/calculo-1/funcoes/graficos' },
          ],
          progress: { completed: 2, total: 3 }
        },
        {
          title: 'Limites',
          items: [
            { name: 'Definição', href: '/calculo-1/limites/definicao' },
            { name: 'Propriedades', href: '/calculo-1/limites/propriedades' },
            { name: 'Cálculo de Limites', href: '/calculo-1/limites/calculo' },
          ],
          progress: { completed: 1, total: 3 }
        },
      ]
    },
    'sistemas': {
      title: 'Sistema C&S',
      sections: [
        {
          title: 'API REST',
          items: [
            { name: 'Introdução', href: '/sistemas/api/intro' },
            { name: 'Endpoints', href: '/sistemas/api/endpoints' },
            { name: 'Autenticação', href: '/sistemas/api/auth' },
          ],
          progress: { completed: 2, total: 3 }
        },
        {
          title: 'Frontend',
          items: [
            { name: 'Setup', href: '/sistemas/frontend/setup' },
            { name: 'Componentes', href: '/sistemas/frontend/components' },
            { name: 'Estado', href: '/sistemas/frontend/state' },
          ],
          progress: { completed: 1, total: 3 }
        },
      ]
    }
  };

  const content = navigationContent[currentPage];
  if (!content) return null;

  return (
    <>
      {/* Mobile toggle */}
      <div className="fixed bottom-4 right-4 sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          {isOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          
          {content.sections.map((section, index) => (
            <SidebarSection
              key={section.title}
              title={section.title}
              defaultExpanded={index === 0}
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <ProgressIndicator
                  completed={section.progress.completed}
                  total={section.progress.total}
                  label="Progresso da Seção"
                />
              </div>
            </SidebarSection>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}