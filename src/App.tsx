import React from 'react';
import { VisualizerProvider, useVisualizer } from './context/VisualizerContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ControlPanel } from './components/controls/ControlPanel';
import { GridVisualizer } from './components/visualizer/GridVisualizer';
import { ComparisonView } from './components/visualizer/ComparisonView';
import { MultiStopView } from './components/visualizer/MultiStopView';
import { CityMapView } from './components/visualizer/CityMapView';
import { SortingView } from './components/visualizer/SortingView';

const MainContent: React.FC = () => {
  const { mode } = useVisualizer();

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 transition-all">
      {mode === 'grid' && (
        <div className="space-y-4 animate-fade-in">
          <ControlPanel />
          <GridVisualizer />
        </div>
      )}
      {mode === 'comparison' && (
        <div className="animate-fade-in">
          <ComparisonView />
        </div>
      )}
      {mode === 'multistop' && (
        <div className="animate-fade-in">
          <MultiStopView />
        </div>
      )}
      {mode === 'citymap' && (
        <div className="animate-fade-in">
          <CityMapView />
        </div>
      )}
      {mode === 'sorting' && (
        <div className="animate-fade-in">
          <SortingView />
        </div>
      )}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <VisualizerProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-800 dark:text-slate-100 flex flex-col selection:bg-brand-cyan/30 selection:text-brand-cyan overflow-hidden transition-colors duration-300">
        {/* Background ambient lighting orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-brand-indigo/10 dark:bg-brand-indigo/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 right-10 w-[500px] h-[450px] bg-brand-cyan/10 dark:bg-brand-cyan/15 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-brand-emerald/10 dark:bg-brand-emerald/15 rounded-full blur-[150px] pointer-events-none -z-10"></div>

        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </VisualizerProvider>
  );
};

export default App;
