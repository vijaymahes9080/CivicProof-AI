import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Award, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from '../locales/translations';

export const BenefitCalculatorPage: React.FC<{ language: Language }> = ({ language }) => {
  const t = useTranslation(language);

  const [courseDurationYears, setCourseDurationYears] = useState<number>(4);
  const [selectedScheme, setSelectedScheme] = useState<string>('scheme-tn-postmatric-scst');
  const [annualTuitionFee, setAnnualTuitionFee] = useState<number>(45000);
  const [isHosteller, setIsHosteller] = useState<boolean>(true);

  const calculateBenefits = () => {
    let yearlyTuitionWaiver = 0;
    let yearlyMaintenanceAllowance = 0;
    let schemeTitle = "";

    if (selectedScheme === 'scheme-tn-pudhumai-penn') {
      schemeTitle = "Moovalur Ramamirtham Pudhumai Penn Scheme";
      yearlyMaintenanceAllowance = 12000; // Rs 1,000 / month
      yearlyTuitionWaiver = 0;
    } else if (selectedScheme === 'scheme-nsp-csss') {
      schemeTitle = "Central Sector Scheme (NSP CSSS)";
      yearlyMaintenanceAllowance = courseDurationYears <= 3 ? 12000 : 20000;
      yearlyTuitionWaiver = 0;
    } else if (selectedScheme === 'scheme-aicte-pragati') {
      schemeTitle = "AICTE Pragati Scholarship for Girls";
      yearlyMaintenanceAllowance = 50000;
      yearlyTuitionWaiver = 0;
    } else if (selectedScheme === 'scheme-tn-postmatric-scst') {
      schemeTitle = "TN Post-Matric SC/ST Scholarship";
      yearlyTuitionWaiver = annualTuitionFee; // 100% compulsory fee waiver
      yearlyMaintenanceAllowance = isHosteller ? 14400 : 7200;
    } else {
      schemeTitle = "PM-YASASVI Scheme";
      yearlyMaintenanceAllowance = 75000;
      yearlyTuitionWaiver = 0;
    }

    const totalTuitionSavings = yearlyTuitionWaiver * courseDurationYears;
    const totalMaintenanceCash = yearlyMaintenanceAllowance * courseDurationYears;
    const totalBeneficiaryValue = totalTuitionSavings + totalMaintenanceCash;

    return {
      schemeTitle,
      yearlyTuitionWaiver,
      yearlyMaintenanceAllowance,
      totalTuitionSavings,
      totalMaintenanceCash,
      totalBeneficiaryValue
    };
  };

  const results = calculateBenefits();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-civic-600" />
          <span>{language === 'ta' ? 'நிதி உதவி மற்றும் பலன் கணக்கீட்டுக் கருவி' : 'Multi-Year Benefit Quantum & Cashflow Calculator'}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'ta'
            ? 'உங்கள் பட்டப்படிப்பு காலத்திற்கான முழு கல்விக் கட்டண தள்ளுபடி மற்றும் நேரடி மாதாந்திர உதவித்தொகையைக் கணக்கிடுங்கள்.'
            : 'Estimate total tuition fee waivers, monthly maintenance stipends, and total DBT disbursal across your entire degree.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
            Course & Scheme Parameters
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Scheme</label>
              <select
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:ring-2 focus:ring-civic-500"
              >
                <option value="scheme-tn-postmatric-scst">TN Post-Matric SC/ST (Full Tuition + Stipend)</option>
                <option value="scheme-tn-pudhumai-penn">Pudhumai Penn (₹1,000 / month)</option>
                <option value="scheme-aicte-pragati">AICTE Pragati (₹50,000 / year)</option>
                <option value="scheme-nsp-csss">NSP Central Sector (₹12,000 - ₹20,000 / year)</option>
                <option value="scheme-pm-yasasvi">PM-YASASVI (₹75,000 - ₹1,25,000 / year)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Course Duration (Years)</label>
              <select
                value={courseDurationYears}
                onChange={(e) => setCourseDurationYears(Number(e.target.value))}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:ring-2 focus:ring-civic-500"
              >
                <option value={2}>2 Years (Diploma / PG)</option>
                <option value={3}>3 Years (Arts / Science / Polytechnic)</option>
                <option value={4}>4 Years (B.E. / B.Tech / Agriculture)</option>
                <option value={5}>5 Years (Integrated PG / MBBS / Law)</option>
              </select>
            </div>

            {selectedScheme === 'scheme-tn-postmatric-scst' && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">Annual College Tuition Fee</label>
                    <span className="text-xs font-bold text-civic-700">₹{annualTuitionFee.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="150000"
                    step="5000"
                    value={annualTuitionFee}
                    onChange={(e) => setAnnualTuitionFee(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-civic-600"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={isHosteller}
                    onChange={(e) => setIsHosteller(e.target.checked)}
                    className="rounded border-slate-300 text-civic-600 focus:ring-civic-500"
                  />
                  <span>Hosteller (Entitled to Higher Maintenance Allowance)</span>
                </label>
              </>
            )}
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-civic-400 tracking-wider">
                Total Multi-Year Financial Value
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                100% Direct Benefit
              </span>
            </div>

            <div>
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                ₹{results.totalBeneficiaryValue.toLocaleString('en-IN')}
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Estimated total financial assistance over {courseDurationYears} years of study.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700">
                <span className="text-slate-400 text-xs block">Tuition Fee Waiver</span>
                <span className="text-lg font-bold text-emerald-400 mt-0.5 block">
                  ₹{results.totalTuitionSavings.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  (₹{results.yearlyTuitionWaiver.toLocaleString('en-IN')}/year)
                </span>
              </div>

              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700">
                <span className="text-slate-400 text-xs block">DBT Bank Disbursal</span>
                <span className="text-lg font-bold text-civic-300 mt-0.5 block">
                  ₹{results.totalMaintenanceCash.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  (₹{results.yearlyMaintenanceAllowance.toLocaleString('en-IN')}/year)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
