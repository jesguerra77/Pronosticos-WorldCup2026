import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Flame, Zap, Shield, Target, Activity, ExternalLink, Info, AlertCircle } from 'lucide-react';

const App = () => {
  // Configuración del Partido - Basado en Marco Analítico UCL 25/26
  const matchData = {
    teams: {
      home: { name: "Real Madrid", flag: "🇪🇸", color: "#1e3a8a", xG: 2.13 },
      away: { name: "Bayern München", flag: "🇩🇪", color: "#dc2626", xG: 2.58 }
    },
    probabilities: [
      { name: 'Real Madrid', value: 31, color: '#1e3a8a' },
      { name: 'Empate', value: 29, color: '#94a3b8' },
      { name: 'Bayern München', value: 40, color: '#dc2626' }
    ],
    picks: [
      { 
        id: 1, 
        level: "TOP", 
        title: "Más de 3.0 Goles (Asiático)", 
        odds: "1.98", 
        confidence: "91%",
        desc: "Duelo de xG más alto de la jornada (4.71 combinado). La inconsistencia defensiva del Madrid (Arbeloa) y el poder ofensivo de Kompany garantizan verticalidad.",
        icon: <Flame className="text-orange-500" />,
        theme: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-600" }
      },
      { 
        id: 2, 
        level: "FUERTE", 
        title: "Ambos Equipos Anotan: SÍ", 
        odds: "1.55", 
        confidence: "88%",
        desc: "7 de los últimos 7 enfrentamientos directos cumplieron esta premisa. El Madrid ha concedido goles en sus últimos 4 encuentros oficiales.",
        icon: <Zap className="text-yellow-600" />,
        theme: { bg: "bg-yellow-50", border: "border-yellow-200", badge: "bg-yellow-600" }
      },
      { 
        id: 3, 
        level: "MEDIO", 
        title: "Resultado Exacto: 2-2", 
        odds: "12.00", 
        confidence: "42%",
        desc: "Cálculo basado en Poisson (λ RM: 2.13 / λ BM: 2.58). Es el marcador con mayor probabilidad estadística dada la dependencia mutua de Mbappé y Kane.",
        icon: <Target className="text-blue-600" />,
        theme: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-600" }
      },
      { 
        id: 4, 
        level: "BAJO", 
        title: "Hándicap: Bayern München -0.5", 
        odds: "2.45", 
        confidence: "54%",
        desc: "Valor condicionado a la titularidad de Kane. El Bayern llega con un ratio de victorias del 86% frente al 72% de un Madrid en transición institucional.",
        icon: <TrendingUp className="text-slate-600" />,
        theme: { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-600" }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans pb-12">
      {/* Status Bar */}
      <div className="bg-slate-900 text-[10px] text-slate-400 py-2.5 px-6 flex justify-between items-center tracking-widest uppercase font-bold border-b border-white/5">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Activity size={12} /> STATUS: MODELO MAE v4.1 ACTIVADO
          </span>
          <span className="hidden md:inline italic">
            MARCO: UCL QUARTER-FINALS LABORATORY
          </span>
        </div>
        <div className="text-white">
          PRECISION POISSON: <span className="text-blue-400">OPTIMAL</span>
        </div>
      </div>

      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 text-white p-2 rounded-lg font-black italic text-lg shadow-lg">AE</div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter leading-none">Intelligence Report: UCL</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Alexander Esguerra • Analytics Specialist</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 py-1.5 px-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase">RMA</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-300 text-slate-300 italic text-[10px] flex items-center px-2 font-bold">VS</div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase">BAY</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        
        {/* Probabilidades de Resultado */}
        <section className="bg-white rounded-[2rem] border border-slate-200 p-8 mb-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <span className="text-7xl block mb-2">{matchData.teams.home.flag}</span>
              <h2 className="text-2xl font-black uppercase text-blue-900">{matchData.teams.home.name}</h2>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                xG Local: {matchData.teams.home.xG}
              </div>
            </div>

            <div style={{ height: '200px', width: '100%', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
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
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-800 italic">UCL</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Bernabéu</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-7xl block mb-2">{matchData.teams.away.flag}</span>
              <h2 className="text-2xl font-black uppercase text-red-600">{matchData.teams.away.name}</h2>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                xG Visitante: {matchData.teams.away.xG}
              </div>
            </div>
          </div>
        </section>

        {/* Picks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {matchData.picks.map((pick) => (
            <div key={pick.id} className={`p-6 rounded-[1.5rem] border ${pick.theme.border} ${pick.theme.bg} transition-all`}>
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">{pick.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`${pick.theme.badge} text-white text-[9px] font-black px-2 py-0.5 rounded uppercase`}>{pick.level}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{pick.confidence} Confianza</span>
                    </div>
                    <h4 className="text-md font-black uppercase italic mt-1 text-slate-800">{pick.title}</h4>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Cuota</p>
                  <p className="text-2xl font-black text-slate-900">@{pick.odds}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-white/40 p-3 rounded-xl border border-white/60">
                {pick.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Nota Técnica */}
        <div className="mt-10 bg-white border border-slate-200 rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-blue-100 p-4 rounded-2xl">
            <AlertCircle className="text-blue-600" size={32} />
          </div>
          <div>
            <h5 className="text-xs font-black uppercase tracking-widest mb-1 text-blue-800 italic">Alerta de Variabilidad de Alineación</h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              La probabilidad de victoria del Bayern München cae de 40% a 22% si se confirma la baja de <strong>Harry Kane</strong> por problemas de tobillo. El modelo recomienda esperar confirmación de XI oficial antes de entrar en mercados de 1X2.
            </p>
          </div>
        </div>
      </main>
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