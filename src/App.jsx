import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Pill, 
  ShieldAlert, 
  ArrowRightLeft, 
  Sparkles, 
  RotateCcw,
  Info,
  Activity,
  HeartPulse
} from 'lucide-react';

// Static Demo Data Definitions
const DEMO_PAIRS = [
  {
    drugs: ['warfarin', 'aspirin'],
    type: 'harmful',
    resultTitle: '⚠️ Potentially Harmful Interaction',
    message: 'These medicines can increase the risk of bleeding when used together. This is a simplified educational example.',
    severity: 'High',
    severityColor: 'red'
  },
  {
    drugs: ['amoxicillin', 'paracetamol'],
    type: 'no_major',
    resultTitle: '✅ No major interaction detected in this demo',
    message: 'This pair is included only as a simplified educational example and does not mean the combination is appropriate for every person.',
    severity: 'Low',
    severityColor: 'emerald'
  }
];

// Available suggested drug names for autocomplete / quick fill
const KNOWN_DRUGS = [
  'Warfarin',
  'Aspirin',
  'Amoxicillin',
  'Paracetamol',
  'Ibuprofen',
  'Metformin',
  'Lisinopril',
  'Atorvastatin'
];

export default function App() {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  const [hasChecked, setHasChecked] = useState(false);
  const [activeResult, setActiveResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheck = (e) => {
    if (e) e.preventDefault();

    const d1 = drug1.trim().toLowerCase();
    const d2 = drug2.trim().toLowerCase();

    if (!d1 || !d2) {
      setErrorMsg('Please enter both medicine names to check interactions.');
      setHasChecked(false);
      return;
    }

    setErrorMsg('');
    setHasChecked(true);

    // Normalize check (order-insensitive)
    const match = DEMO_PAIRS.find(pair => {
      const [itemA, itemB] = pair.drugs;
      return (d1 === itemA && d2 === itemB) || (d1 === itemB && d2 === itemA);
    });

    if (match) {
      setActiveResult(match);
    } else {
      setActiveResult({
        type: 'unknown',
        resultTitle: '⚠️ Interaction data not available in this demo.',
        message: 'Do NOT assume that an unknown pair is safe.',
        severity: 'Unknown',
        severityColor: 'amber'
      });
    }
  };

  const handlePresetSelect = (presetD1, presetD2) => {
    setDrug1(presetD1);
    setDrug2(presetD2);
    setErrorMsg('');
    
    // Auto trigger check for convenient learning test
    const d1 = presetD1.toLowerCase();
    const d2 = presetD2.toLowerCase();
    
    setHasChecked(true);
    const match = DEMO_PAIRS.find(pair => {
      const [itemA, itemB] = pair.drugs;
      return (d1 === itemA && d2 === itemB) || (d1 === itemB && d2 === itemA);
    });

    if (match) {
      setActiveResult(match);
    } else {
      setActiveResult({
        type: 'unknown',
        resultTitle: '⚠️ Interaction data not available in this demo.',
        message: 'Do NOT assume that an unknown pair is safe.',
        severity: 'Unknown',
        severityColor: 'amber'
      });
    }
  };

  const handleSwap = () => {
    const temp = drug1;
    setDrug1(drug2);
    setDrug2(temp);
    if (hasChecked) {
      // Clear checked state or keep as is
    }
  };

  const handleReset = () => {
    setDrug1('');
    setDrug2('');
    setHasChecked(false);
    setActiveResult(null);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-teal-100 selection:text-teal-900">
      
      {/* Top Banner Notice */}
      <header className="bg-gradient-to-r from-teal-700 via-teal-800 to-blue-900 text-white text-xs sm:text-sm py-2 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
            <span>
              <strong>Educational Prototype:</strong> For learning purposes only. Does not provide medical advice.
            </span>
          </div>
          <span className="hidden md:inline-block text-teal-200 text-xs bg-teal-900/60 px-2.5 py-0.5 rounded-full border border-teal-600/40">
            Frontend Demo (Static Data)
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-xl mx-auto space-y-6">

          {/* Centered Main Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8 md:p-10 transition-all duration-300">
            
            {/* Card Header & Title */}
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 text-teal-600 shadow-sm mb-1">
                <Pill className="w-7 h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Drug Interaction Checker
              </h1>
              <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Check whether two medicines have a potentially harmful interaction.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleCheck} className="space-y-5">
              
              {/* Field 1 */}
              <div className="space-y-1.5">
                <label htmlFor="drug1" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Drug 1
                </label>
                <div className="relative">
                  <input
                    id="drug1"
                    type="text"
                    value={drug1}
                    onChange={(e) => {
                      setDrug1(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="e.g. Warfarin, Amoxicillin"
                    className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
                  />
                  <Pill className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {drug1 && (
                    <button
                      type="button"
                      onClick={() => setDrug1('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1.5 py-0.5 rounded-md hover:bg-slate-200/60"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Swap Button Controls */}
              <div className="flex items-center justify-between px-1 py-0.5">
                <div className="h-px bg-slate-100 flex-1"></div>
                <button
                  type="button"
                  onClick={handleSwap}
                  title="Swap medicines"
                  className="mx-3 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 bg-slate-100 hover:bg-teal-50 px-3 py-1 rounded-full border border-slate-200/80 transition-all font-medium"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Swap</span>
                </button>
                <div className="h-px bg-slate-100 flex-1"></div>
              </div>

              {/* Field 2 */}
              <div className="space-y-1.5">
                <label htmlFor="drug2" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Drug 2
                </label>
                <div className="relative">
                  <input
                    id="drug2"
                    type="text"
                    value={drug2}
                    onChange={(e) => {
                      setDrug2(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="e.g. Aspirin, Paracetamol"
                    className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
                  />
                  <Pill className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {drug2 && (
                    <button
                      type="button"
                      onClick={() => setDrug2('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1.5 py-0.5 rounded-md hover:bg-slate-200/60"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Validation Error */}
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 animate-shake">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Check Button */}
              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Activity className="w-4 h-4" />
                  <span>Check Interaction</span>
                </button>
                
                {(drug1 || drug2 || hasChecked) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    title="Reset form"
                    className="px-4 py-3.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all text-sm font-medium flex items-center justify-center"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Quick Demo Preset Chips for Instant Testing */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                Quick Test Demo Pairs:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handlePresetSelect('Warfarin', 'Aspirin')}
                  className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/70 px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Warfarin + Aspirin
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('Amoxicillin', 'Paracetamol')}
                  className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/70 px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Amoxicillin + Paracetamol
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('Ibuprofen', 'Metformin')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  Unknown Pair (Custom)
                </button>
              </div>
            </div>

          </div>

          {/* Result Card */}
          {hasChecked && activeResult && (
            <div 
              className={`rounded-3xl p-6 sm:p-8 border shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
                activeResult.type === 'harmful'
                  ? 'bg-red-50/90 border-red-200 text-red-950 shadow-red-100/50'
                  : activeResult.type === 'no_major'
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950 shadow-emerald-100/50'
                  : 'bg-amber-50/90 border-amber-200 text-amber-950 shadow-amber-100/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                
                {/* Large Result Icon */}
                <div 
                  className={`p-3.5 rounded-2xl shrink-0 mt-0.5 ${
                    activeResult.type === 'harmful'
                      ? 'bg-red-100 text-red-600'
                      : activeResult.type === 'no_major'
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-amber-100 text-amber-600'
                  }`}
                >
                  {activeResult.type === 'harmful' ? (
                    <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10" />
                  ) : activeResult.type === 'no_major' ? (
                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10" />
                  )}
                </div>

                {/* Result Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                      {activeResult.resultTitle}
                    </h2>
                    <span 
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                        activeResult.type === 'harmful'
                          ? 'bg-red-100/80 text-red-800 border-red-300'
                          : activeResult.type === 'no_major'
                          ? 'bg-emerald-100/80 text-emerald-800 border-emerald-300'
                          : 'bg-amber-100/80 text-amber-800 border-amber-300'
                      }`}
                    >
                      {activeResult.type === 'harmful'
                        ? 'High Risk Warning'
                        : activeResult.type === 'no_major'
                        ? 'No Known Major Risk'
                        : 'Educational Data Unavailable'}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed opacity-90 font-normal">
                    {activeResult.message}
                  </p>

                  <div className="pt-2 text-xs opacity-75 border-t border-current/10 flex items-center justify-between gap-2">
                    <span>Evaluated pair: <strong>{drug1}</strong> + <strong>{drug2}</strong></span>
                    <span>Demo Dataset v1.0</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Educational Disclaimer Card */}
          <div className="bg-white/80 backdrop-blur rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <Info className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Educational & Learning Information</span>
            </div>
            <p className="leading-relaxed">
              This application is designed exclusively for programming and interface learning purposes. It operates strictly on a local static dataset containing only two demonstration drug pairs. Always consult a certified doctor or pharmacist for clinical advice.
            </p>
          </div>

        </div>
      </main>

      {/* Page Footer */}
      <footer className="py-4 px-6 text-center text-xs text-slate-400 border-t border-slate-200/60 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Drug Interaction Checker &bull; Learning Prototype</span>
          <span className="flex items-center gap-1">
            Built with React & Vite
          </span>
        </div>
      </footer>

    </div>
  );
}
