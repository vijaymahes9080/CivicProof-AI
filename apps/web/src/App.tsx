import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DiscoveryChatPage } from './pages/DiscoveryChatPage';
import { EligibilityWizardPage } from './pages/EligibilityWizardPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { SourceRegistryPage } from './pages/SourceRegistryPage';
import { UpdateHistoryPage } from './pages/UpdateHistoryPage';
import { AdminReviewPage } from './pages/AdminReviewPage';
import { ComparePage } from './pages/ComparePage';
import { FraudScannerPage } from './pages/FraudScannerPage';
import { DeadlinesPage } from './pages/DeadlinesPage';
import { BenefitCalculatorPage } from './pages/BenefitCalculatorPage';
import { IntegrityCheckPage } from './pages/IntegrityCheckPage';
import { InstitutionValidatorPage } from './pages/InstitutionValidatorPage';

export const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [plainLanguage, setPlainLanguage] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <Navbar
          language={language}
          onLanguageChange={setLanguage}
          plainLanguage={plainLanguage}
          onTogglePlainLanguage={() => setPlainLanguage(!plainLanguage)}
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage language={language} plainLanguage={plainLanguage} />} />
            <Route path="/chat" element={<DiscoveryChatPage language={language} plainLanguage={plainLanguage} />} />
            <Route path="/eligibility" element={<EligibilityWizardPage language={language} />} />
            <Route path="/checklist" element={<ChecklistPage language={language} />} />
            <Route path="/sources" element={<SourceRegistryPage language={language} />} />
            <Route path="/updates" element={<UpdateHistoryPage language={language} />} />
            <Route path="/compare" element={<ComparePage language={language} />} />
            <Route path="/fraud-check" element={<FraudScannerPage language={language} />} />
            <Route path="/deadlines" element={<DeadlinesPage language={language} />} />
            <Route path="/calculator" element={<BenefitCalculatorPage language={language} />} />
            <Route path="/doc-verify" element={<IntegrityCheckPage language={language} />} />
            <Route path="/institutions" element={<InstitutionValidatorPage language={language} />} />
            <Route path="/admin" element={<AdminReviewPage language={language} />} />
          </Routes>
        </main>
        <Footer language={language} />
      </div>
    </Router>
  );
};

export default App;
