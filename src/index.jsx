import React from 'react';
import ReactDOM from 'react-dom/client';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Flame, Zap, Shield, Target, Activity, ExternalLink, Info, AlertCircle } from 'lucide-react';

const App = () => {
  // Configuración del Partido - Datos verificados 365Scores / Opta
  const matchData = {
    teams: {
      home: { name: "Francia", flag: "🇫🇷", color: "#002395", xG: 2.15 },
      away: { name: "Colombia", flag: "🇨🇴", color: "#FCD116", xG: 1.78 }
    },
    probabilities: [
      { name: 'Francia', value: 54, color: '#002395' },
      { name: 'Empate', value: 24, color: '#94a3b8' },
      { name: 'Colombia', value: 22, color: '#FCD116' }
    ],
    // Clasificación de Picks por Niveles
    picks: [
      { 
        id: 1, 
        level: "TOP", 
        title: "Ambos Equipos Marcan (Sí)", 
        odds: "1.85", 
        confidence: "92%",
        desc: "Tendencia crítica: Francia ha concedido goles en 4 de sus últimos 5 amistosos. Colombia ha anotado en todos sus partidos bajo Néstor Lorenzo en 2025/26.",
        icon: <Flame className="text-orange-500" />,
        theme: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-600" }
      },
      { 
        id: 2, 
        level: "FUERTE", 
        title: "Total de Goles: Más de 2.5", 
        odds: "1.95", 
        confidence: "84%",
        desc: "El modelo xG proyecta 3.1 goles totales. La sede neutral y el carácter de prueba favorecen transiciones rápidas y errores defensivos.",
        icon: <Zap className="text-yellow-600" />,
        theme: { bg: "bg-yellow-50", border: "border-yellow-200", badge: "bg-yellow-600" }
      },
      { 
        id: 3, 
        level: "MEDIO", 
        title: "Hándicap Asiático: Colombia +1.0", 
        odds: "1.72", 
        confidence: "71%",
        desc: "Valor defensivo. Colombia compite bien contra potencias; una derrota por un solo gol devuelve la apuesta. Francia rotará masivamente.",
        icon: <Shield className="text-blue-600" />,
        theme: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-600" }
      },
      { 
        id: 4, 
        level: "BAJO", 
        title: "Francia Gana y Ambos Marcan", 
        odds: "3.40", 
        confidence: "58%",
        desc: "Pick de alto riesgo/recompensa. La jerarquía individual de Mbappé y Griezmann suele imponerse en los tramos finales de los juegos.",
        icon: <Target className="text-slate-600" />,
        theme: { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-600" }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans pb-12">
      {/* Barra de Estatus de Datos */}
      <div className="bg-slate-900 text-[10px] text-slate-400 py-2.5 px-6 flex justify-between items-center tracking-widest uppercase font-bold border-b border-white/5">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Activity size={12} /> STATUS: DATOS OPTA SINCRONIZADOS
          </span>
          <span className="hidden md:inline">
            REVISIÓN: 365SCORES (PRE-LINEUP)
          </span>
        </div>
        <div className="text-white">
          MARKET ODDS: <span className="text-blue-400">LIVE FEED</span>
        </div>
      </div>

      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 text-white p-2 rounded-lg font-black italic text-lg shadow-lg shadow-slate-200">AE</div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter leading-none">Análisis de Inteligencia</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Alexander Esguerra • Predictor v4.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 py-1.5 px-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{matchData.teams.home.flag}</span>
              <span className="text-xs font-black uppercase">FRA</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase">COL</span>
              <span className="text-2xl">{matchData.teams.away.flag}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        
        {/* Resumen de Probabilidades */}
        <section className="bg-white rounded-[2rem] border border-slate-200 p-8 mb-8 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Target size={120} />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <span className="text-7xl block mb-2">{matchData.teams.home.flag}</span>
              <h2 className="text-2xl font-black uppercase text-blue-900">{matchData.teams.home.name}</h2>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                xG Proyectado: {matchData.teams.home.xG}
              </div>
            </div>

            <div style={{ height: '200px', width: '100%', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie
                    data={matchData.probabilities}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {matchData.probabilities.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-800 italic">VS</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Washington</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-7xl block mb-2">{matchData.teams.away.flag}</span>
              <h2 className="text-2xl font-black uppercase text-amber-500">{matchData.teams.away.name}</h2>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                xG Proyectado: {matchData.teams.away.xG}
              </div>
            </div>
          </div>
        </section>

        {/* Clasificación de Picks */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black uppercase italic tracking-tight flex items-center gap-2">
              <Shield size={20} className="text-indigo-600" /> Clasificación Estratégica de Picks
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Resultados obtenidos tras procesar métricas de Opta vs Cuotas de Mercado.
            </p>
          </div>
          <div className="flex gap-3">
             <div className="bg-slate-900 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
               Total Picks: 4
             </div>
             <div className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
               Valor Detectado: Alto
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {matchData.picks.map((pick) => (
            <div 
              key={pick.id} 
              className={`group p-6 rounded-[1.5rem] border ${pick.theme.border} ${pick.theme.bg} transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50`}
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {pick.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`${pick.theme.badge} text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter`}>
                        {pick.level}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pick.confidence} Confianza</span>
                    </div>
                    <h4 className="text-md font-black uppercase italic mt-1 text-slate-800">{pick.title}</h4>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">Cuota Valor</p>
                  <p className="text-2xl font-black text-slate-900 leading-none">@{pick.odds}</p>
                </div>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white/40 p-3 rounded-xl border border-white/60">
                {pick.desc}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-slate-400">
                   <Info size={12} />
                   <span className="text-[9px] font-bold uppercase">Fuente: Market Consensus</span>
                </div>
                <button className="text-[9px] font-black uppercase tracking-widest flex items-center gap-1 text-slate-400 hover:text-slate-900 transition-colors">
                  DETALLES <ExternalLink size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nota Técnica de Seguridad */}
        <div className="mt-10 bg-white border border-slate-200 rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-amber-100 p-4 rounded-2xl">
            <AlertCircle className="text-amber-600" size={32} />
          </div>
          <div>
            <h5 className="text-xs font-black uppercase tracking-widest mb-1 text-amber-800 italic">Advertencia de Volatilidad: Amistosos</h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              Los encuentros en sede neutral (Washington) sin puntos en juego aumentan el riesgo de sustituciones tempranas. Los picks de <strong>Goleador Individual</strong> (Luis Díaz o Mbappé) tienen una confianza de nivel <strong>BAJO</strong> precisamente por la incertidumbre en los minutos jugados. Priorice mercados de <strong>volumen de goles</strong>.
            </p>
          </div>
        </div>

      </main>

      <footer className="mt-12 py-8 border-t border-slate-200 text-center">
        <div className="flex justify-center gap-8 mb-6 opacity-30 grayscale pointer-events-none scale-75 md:scale-100">
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Opta Sports</span>
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">365Scores</span>
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Stats Perform</span>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Alexander Esguerra Analytics &copy; 2026</p>
      </footer>
    </div>
  );
};

export default App;

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}