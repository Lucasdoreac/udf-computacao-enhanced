import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children, currentPage }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="flex">
        <Sidebar currentPage={currentPage} />
        
        <main className="flex-1 sm:ml-64 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}