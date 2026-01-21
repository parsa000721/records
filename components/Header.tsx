
import React from 'react';
import { FileTextIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
            प्रकरण फ़ाइल प्रबंधन प्रणाली
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
