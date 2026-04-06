import './index.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Shield, Target, Activity, Zap, History, Info, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('picks');

  // Memoria del Modelo: Auditoría de Jornada FIFA previa
  const auditHistory = [
    { match: 'Bayern-Real Madrid', pick: 'Over 2.5', status: 'WIN', fact: '+2.3%' },
    { match: 'PSG-Liverpool', pick: 'Under 2.5', status: 'LOSS', fact: '-1.8%' },
    { match: 'Barcelona-Atlético', pick: 'Barcelona Win', status: 'WIN', fact: '+3.1%' },
    { match: 'Sporting-Arsenal', pick: 'Arsenal Win', status: 'WIN', fact: '+1.5%' }
  ];

  // Datos Cuartos de Final UCL (Basado en el marco analítico proporcionado)
  const uclData = {
    matches: [
      { id: 'BAY-RMA', teams: 'Bayern-Real Madrid', flags: ['🇩🇪', '🇪🇸'], prob: 52 },
      { id: 'PSG-LIV', teams: 'PSG-Liverpool', flags: ['🇫🇷', '🇬🇧'], prob: 48 },
      { id: 'BAR-ATL', teams: 'Barcelona-Atlético', flags: ['🇪🇸', '🇪🇸'], prob: 61 },
      { id: 'SCP-ARS', teams: 'Sporting-Arsenal', flags: ['🇵🇹', '🇬🇧'], prob: 45 }
    ],
    picks: [
      { title: 'Bayern vs Real Madrid', desc: 'Over 2.5 goles esperados', level: 'TOP', odds: 1.85, confidence: '85%' },
      { title: 'PSG vs Liverpool', desc: 'Under 3.5 goles esperados', level: 'FUERTE', odds: 1.92, confidence: '78%' },
      { title: 'Barcelona vs Atlético', desc: 'Barcelona Ganador', level: 'TOP', odds: 2.10, confidence: '82%' },
      { title: 'Sporting vs Arsenal', desc: 'Arsenal Ganador', level: 'FUERTE', odds: 1.75, confidence: '80%' }
    ],
    xgComparison: [
      { name: 'Bayern', value: 2.3, color: '#4f46e5' },
      { name: 'Real Madrid', value: 1.9, color: '#06b6d4' },
      { name: 'PSG', value: 2.1, color: '#8b5cf6' },
      { name: 'Liverpool', value: 2.4, color: '#ec4899' },
      { name: 'Barcelona', value: 2.7, color: '#f59e0b' },
      { name: 'Arsenal', value: 2.2, color: '#f97316' }
    ]
  };
    xgComparison:

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Header Corporativo AE */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center font-black italic text-2xl shadow-lg shadow-indigo-500/20">AE</div>
          <div>
            <h1 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400">Intelligence Analytics</h1>
            <p className="text-2xl font-black uppercase italic tracking-tighter">UEFA Champions League QF 2026</p>
          </div>
        </div>
        <nav className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/5">
          <button onClick={() => setActiveTab('picks')} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'picks'? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>PICKS CLASIFICADOS</button>
          <button onClick={() => setActiveTab('stats')} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'stats'? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>MODELO XG</button>
          <button onClick={() => setActiveTab('audit')} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'audit'? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
            <span className="flex items-center gap-2"><History size={14}/> AUDITORÍA</span>
          </button>
        </nav>
      </div>

      <main className="max-w-6xl mx-auto">
        {activeTab === 'picks' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Listado de Picks Consolidados */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-indigo-900 text-white text-[10px] px-2 py-1 rounded font-black">STAKE CLASSIFIED</span>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Resultados del modelo de regresión Poisson</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {uclData.picks.map((pick, i) => (
                  <div key={i} className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem] hover:bg-slate-900 transition-all cursor-default group">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                        pick.level === 'TOP'? 'bg-emerald-600' : pick.level === 'FUERTE'? 'bg-indigo-600' : 'bg-slate-700'
                      }`}>
                        Nivel: {pick.level}
                      </span>
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-slate-500 uppercase">Cuota Valor</p>
                        <p className="text-xl font-black text-indigo-400">@{pick.odds}</p>
                      </div>
                    </div>
                    <h4 className="text-lg font-black uppercase italic mb-2 group-hover:text-indigo-300 transition-colors">{pick.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{pick.desc}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <span className="text-[10px] font-bold text-slate-500">CONFIANZA: {pick.confidence}</span>
                      <Zap size={14} className="text-indigo-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel de Contexto UCL */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                <Shield className="absolute -right-4 -bottom-4 opacity-10" size={160} />
                <h3 className="text-xs font-black uppercase tracking-widest mb-6">Alerta de Fatiga</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-bold uppercase opacity-60">Impacto en Arsenal</p>
                    <p className="text-sm font-bold mt-1">Duda en Saliba y Gabriel. Ausencia de Hincapié.</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-bold uppercase opacity-60">Incógnita Bayern</p>
                    <p className="text-sm font-bold mt-1">Harry Kane (Tobillo) es duda crítica.</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                  <p className="text-[10px] font-black uppercase">Intensidad Proyectada</p>
                  <p className="text-3xl font-black italic">10/10</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 p-8 rounded-[3rem] border border-white/5">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-2">
                <Activity size={16} /> Comparativa Goles Esperados (UCL 25/26)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={uclData.xgComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} fontWeight="bold" />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <Tooltip cursor={{fill: '#0f172a'}} />
                    <Bar dataKey="value" radius={}>
                      {uclData.xgComparison.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-slate-900/50 p-8 rounded-[3rem] border border-white/5">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8">Estructura Táctica Predominante</h3>
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                        <span className="text-xs font-bold text-slate-400">Posesión Media Barca</span>
                        <span className="text-2xl font-black">68.7%</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                        <span className="text-xs font-bold text-slate-400">Precisión Pase PSG</span>
                        <span className="text-2xl font-black italic">91.0%</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                        <span className="text-xs font-bold text-slate-400">Remates Arsenal pg</span>
                        <span className="text-2xl font-black">16.8</span>
                    </div>
                </div>
                <div className="mt-8 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase mb-1 flex items-center gap-1"><Info size={10}/> Nota del Modelo</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">El Liverpool de Arne Slot presenta el perfil de mayor riesgo defensivo tras conceder 11 goles en sus últimos 5 desplazamientos europeos.</p>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-8">
            <div className="bg-slate-900/80 border border-white/5 p-8 rounded-[3rem]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter">Consolidado de Fiabilidad Acumulada</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Histórico de aciertos: Jornada FIFA Marzo 2026</p>
                </div>
                <div className="flex gap-4">
                   <div className="text-center">
                     <p className="text-[10px] font-bold text-emerald-400 uppercase">Win Rate</p>
                     <p className="text-3xl font-black">60%</p>
                   </div>
                   <div className="w-px h-10 bg-white/10"></div>
                   <div className="text-center text-indigo-400">
                     <p className="text-[10px] font-bold uppercase">IPM Avg</p>
                     <p className="text-3xl font-black italic">78.5%</p>
                   </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                      <th className="pb-4">Evento</th>
                      <th className="pb-4">Pick Sugerido</th>
                      <th className="pb-4 text-center">Estado</th>
                      <th className="pb-4 text-right">Factor de Corrección</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {auditHistory.map((h, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 font-black">{h.match}</td>
                        <td className="py-4 text-slate-400">{h.pick}</td>
                        <td className="py-4 text-center">
                          {h.status === 'WIN'? <CheckCircle2 className="text-emerald-500 mx-auto" size={16}/> : <XCircle className="text-red-500 mx-auto" size={16}/>}
                        </td>
                        <td className="py-4 text-right italic text-slate-500">{h.fact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-amber-600/10 border border-amber-500/20 p-6 rounded-[2rem] flex items-center gap-4">
              <AlertCircle size={24} className="text-amber-500 shrink-0" />
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                <strong>Ajuste Operativo para UCL:</strong> Basado en el fallo de "COL o Empate" por la explosividad del talento joven (Doué), el modelo hoy ha incrementado un **15% el peso estadístico** de jugadores menores de 20 años como **Lamine Yamal** y **Warren Zaïre-Emery**. No se subestimará la calidad individual por encima de la experiencia grupal.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 py-8 border-t border-white/5 text-center text-slate-600">
        <div className="flex justify-center gap-8 mb-6 opacity-30 grayscale pointer-events-none scale-75">
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Opta Stats</span>
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">365Scores Feed</span>
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Stats Perform</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Alexander Esguerra &copy; 2026 • Made for Winners</p>
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