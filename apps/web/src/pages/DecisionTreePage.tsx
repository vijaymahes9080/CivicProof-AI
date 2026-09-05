import React from 'react';
import { DecisionTreeVisualizer } from '../components/DecisionTreeVisualizer';
import { Language } from '../types';

interface DecisionTreePageProps {
  language: Language;
}

export const DecisionTreePage: React.FC<DecisionTreePageProps> = ({ language }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DecisionTreeVisualizer language={language} />
    </div>
  );
};
