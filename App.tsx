
import React, { useState, useEffect, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import CaseList from './components/CaseList';
import CaseForm from './components/CaseForm';
import { type Case } from './types';

const App: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedCases = localStorage.getItem('cases');
      if (storedCases) {
        setCases(JSON.parse(storedCases));
      }
    } catch (error) {
      console.error("Failed to load cases from local storage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
        try {
            localStorage.setItem('cases', JSON.stringify(cases));
        } catch (error) {
            console.error("Failed to save cases to local storage", error);
        }
    }
  }, [cases, isInitialized]);

  const handleAddCase = useCallback(() => {
    setCurrentCase(null);
    setView('form');
  }, []);

  const handleEditCase = useCallback((caseToEdit: Case) => {
    setCurrentCase(caseToEdit);
    setView('form');
  }, []);

  const handleDeleteCase = useCallback((caseId: string) => {
    if (window.confirm('क्या आप वाकई इस प्रकरण को हटाना चाहते हैं?')) {
      setCases(prevCases => prevCases.filter(c => c.id !== caseId));
    }
  }, []);

  const handleSaveCase = useCallback((caseToSave: Omit<Case, 'id'> & { id?: string }) => {
    if (caseToSave.id) {
      // Update existing case
      setCases(prevCases => prevCases.map(c => c.id === caseToSave.id ? { ...c, ...caseToSave } as Case : c));
    } else {
      // Add new case
      const newCase: Case = { ...caseToSave, id: new Date().toISOString() };
      setCases(prevCases => [newCase, ...prevCases]);
    }
    setView('list');
    setCurrentCase(null);
  }, []);

  const handleCancel = useCallback(() => {
    setView('list');
    setCurrentCase(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {view === 'list' && (
          <CaseList 
            cases={cases}
            onAdd={handleAddCase}
            onEdit={handleEditCase}
            onDelete={handleDeleteCase}
          />
        )}
        {view === 'form' && (
          <CaseForm
            initialData={currentCase}
            onSave={handleSaveCase}
            onCancel={handleCancel}
          />
        )}
      </main>
      <Analytics />
    </div>
  );
};

export default App;
