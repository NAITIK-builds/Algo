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
import { OwlBot } from './components/assistant/OwlBot';

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
      <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-brand-primary/20 selection:text-brand-primary transition-colors duration-200 bg-canvas-pattern antialiased">
        <Navbar />
        <MainContent />
        <Footer />
        <OwlBot />
      </div>
    </VisualizerProvider>
  );
};

export default App;
