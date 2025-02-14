import Layout from '../components/layout/Layout';
import SubjectCard from '../components/ui/SubjectCard';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import { FiBookOpen, FiClock, FiStar } from 'react-icons/fi';

// Mock data
const subjects = [
  {
    title: 'Cálculo 1',
    description: 'Fundamentos de cálculo diferencial e integral, incluindo limites, derivadas e integrais.',
    icon: 'book',
    progress: { completed: 12, total: 20 },
    href: '/calculo-1',
    topics: [
      'Funções e Gráficos',
      'Limites e Continuidade',
      'Derivadas e Aplicações'
    ]
  },
  {
    title: 'Sistema C&S',
    description: 'Desenvolvimento de sistemas web com foco em APIs REST e interfaces modernas.',
    icon: 'code',
    progress: { completed: 8, total: 15 },
    href: '/sistemas',
    topics: [
      'APIs REST',
      'Frontend Development',
      'Banco de Dados'
    ]
  }
];

const quickLinks = [
  { title: 'Material de Apoio', href: '/recursos', icon: FiBookOpen },
  { title: 'Cronograma', href: '/cronograma', icon: FiClock },
  { title: 'Projetos em Destaque', href: '/projetos', icon: FiStar }
];

export default function Home() {
  const overallProgress = {
    completed: 20,
    total: 35
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Bem-vindo ao seu Diário de Bordo
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Acompanhe seu progresso, acesse materiais e evolua em sua jornada acadêmica.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Seu Progresso Geral
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <ProgressIndicator
              completed={overallProgress.completed}
              total={overallProgress.total}
              label="Progresso Total do Curso"
            />
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Suas Disciplinas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.title} {...subject} />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Links Rápidos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.title}
                  href={link.href}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <span className="ml-3 text-gray-900 dark:text-white">
                    {link.title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}