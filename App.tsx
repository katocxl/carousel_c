
import React, { useState, useEffect, useCallback } from 'react';
import Carousel3D from './components/Carousel3D';
import { generateThemeCards } from './services/geminiService';
import { CarouselCard, CarouselConfig, Theme } from './types';
import { 
  Settings2, 
  RefreshCw, 
  Sparkles, 
  Play, 
  Pause, 
  Maximize,
  Box,
  Palette
} from 'lucide-react';

const INITIAL_CARDS: CarouselCard[] = [
  { index: 0, color: '142, 249, 252', title: 'Cyan Drift', description: 'Crystal clear aesthetic of the future.' },
  { index: 1, color: '142, 252, 204', title: 'Mint Frost', description: 'Refreshing breeze in digital space.' },
  { index: 2, color: '142, 252, 157', title: 'Lime Glow', description: 'Energy radiating through neon light.' },
  { index: 3, color: '215, 252, 142', title: 'Lemon Burst', description: 'Zesty colors for a bright interface.' },
  { index: 4, color: '252, 252, 142', title: 'Sunshine', description: 'Warmth and clarity in every pixel.' },
  { index: 5, color: '252, 208, 142', title: 'Amber Wave', description: 'Rich golden tones of sunset.' },
  { index: 6, color: '252, 142, 142', title: 'Coral Peak', description: 'Soft red hues of mountain tops.' },
  { index: 7, color: '252, 142, 239', title: 'Magenta Sky', description: 'Mystical shades of the twilight hour.' },
  { index: 8, color: '204, 142, 252', title: 'Violet Fog', description: 'Ethereal purple mist around you.' },
  { index: 9, color: '142, 202, 252', title: 'Sky Blue', description: 'Infinite horizons in your display.' },
];

const DEFAULT_CONFIG: CarouselConfig = {
  quantity: 10,
  duration: 20,
  perspective: 1000,
  rotateX: -15,
  width: 140,
  height: 200,
  radiusOffset: 50,
};

const App: React.FC = () => {
  const [cards, setCards] = useState<CarouselCard[]>(INITIAL_CARDS);
  const [config, setConfig] = useState<CarouselConfig>(DEFAULT_CONFIG);
  const [theme, setTheme] = useState<Theme>(Theme.PASTEL);
  const [loading, setLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const handleRefreshTheme = async () => {
    setLoading(true);
    try {
      const newCards = await generateThemeCards(theme, config.quantity);
      if (newCards.length > 0) {
        setCards(newCards);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = (key: keyof CarouselConfig, value: number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
            <Box size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-600">
              Prism 3D
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Visualizer</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
            title={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>
          
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className={`p-2 rounded-full transition-all ${showConfig ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-slate-100 text-slate-600'}`}
            title="Toggle Settings"
          >
            <Settings2 size={20} />
          </button>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          <select 
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            {Object.values(Theme).map(t => (
              <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>
            ))}
          </select>

          <button 
            onClick={handleRefreshTheme}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-md shadow-indigo-100 active:scale-95"
          >
            {loading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
            {loading ? 'Generating...' : 'Regenerate'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex items-center justify-center p-8">
        {/* Background Decor */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-100/50 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-100/50 rounded-full blur-[100px]" />
        </div>

        <div className={`transition-all duration-700 ${isPaused ? '[--duration:0s]' : ''}`}>
          <Carousel3D cards={cards} config={config} />
        </div>

        {/* Floating Settings Sidebar */}
        <aside 
          className={`absolute right-6 top-1/2 -translate-y-1/2 glass rounded-2xl shadow-2xl border border-white/40 p-6 w-72 transition-all duration-500 transform ${
            showConfig ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Settings2 size={18} className="text-indigo-600" />
              Settings
            </h2>
            <button onClick={() => setShowConfig(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <RefreshCw size={16} className="rotate-45" />
            </button>
          </div>

          <div className="space-y-6">
            <ControlGroup label="Perspective" value={config.perspective} min={400} max={2000} onChange={(v) => updateConfig('perspective', v)} />
            <ControlGroup label="Rotation X" value={config.rotateX} min={-45} max={45} onChange={(v) => updateConfig('rotateX', v)} />
            <ControlGroup label="Duration (s)" value={config.duration} min={5} max={60} onChange={(v) => updateConfig('duration', v)} />
            <ControlGroup label="Radius Offset" value={config.radiusOffset} min={-100} max={300} onChange={(v) => updateConfig('radiusOffset', v)} />
            <ControlGroup label="Card Width" value={config.width} min={80} max={300} onChange={(v) => updateConfig('width', v)} />
            <ControlGroup label="Card Height" value={config.height} min={120} max={400} onChange={(v) => updateConfig('height', v)} />
          </div>

          <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
            <p className="text-[10px] text-indigo-600 uppercase font-bold tracking-widest mb-1">Tip</p>
            <p className="text-xs text-slate-600">Hover over the carousel to pause the rotation and focus on specific cards.</p>
          </div>
        </aside>
      </main>

      {/* Footer / Status */}
      <footer className="glass border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span>{cards.length} Cards active</span>
          <div className="h-1 w-1 bg-slate-300 rounded-full" />
          <span>Gemini-powered Themes</span>
        </div>
        <div className="flex items-center gap-2 text-indigo-600 font-medium">
          <Palette size={14} />
          Light Mode Visualization
        </div>
      </footer>
    </div>
  );
};

const ControlGroup: React.FC<{ label: string, value: number, min: number, max: number, onChange: (v: number) => void }> = ({ label, value, min, max, onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-tight">{label}</label>
      <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{value}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
    />
  </div>
);

export default App;
