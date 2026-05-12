import React from 'react';

const EngineeringDataViz = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 pt-12 border-t border-white/5">

            {/* 1. FEA Strain Distribution Map (Mechanical Engineering Side) */}
            <div className="p-6 border border-white/5 bg-slate-950/50 rounded-2xl relative overflow-hidden group">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Analysis_Type: FEA_Static_Load</span>
                    <span className="text-[10px] text-slate-600 tabular-nums font-mono italic">0.44s Latency</span>
                </div>

                {/* Simulated Engineering Part (SVG) */}
                <div className="relative h-48 flex items-center justify-center">
                    <svg viewBox="0 0 200 100" className="w-full h-full opacity-80">
                        {/* The "Machine Part" with a Heatmap Gradient */}
                        <defs>
                            <radialGradient id="stressGradient" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                            </radialGradient>
                        </defs>
                        <path
                            d="M20,20 L180,20 L180,80 L140,80 C120,50 80,50 60,80 L20,80 Z"
                            fill="url(#stressGradient)"
                            stroke="#ffffff22"
                            strokeWidth="0.5"
                        />
                        {/* Dynamic Stress Points */}
                        <circle cx="100" cy="45" r="3" fill="#ef4444" className="animate-ping" />
                        <line x1="100" y1="45" x2="130" y2="25" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2" />
                    </svg>

                    {/* HUD Overlay */}
                    <div className="absolute top-0 left-0 text-[9px] font-mono text-slate-500 bg-black/40 p-2">
                        MAX_STRESS: 412.5 MPa<br />
                        SAFETY_FACTOR: 1.2
                    </div>
                </div>
                <h4 className="text-white text-xs font-bold mt-4 uppercase tracking-tighter">Structural Fatigue Mapping</h4>
            </div>

            {/* 2. Neural Network Architecture (AI/ML Side) */}
            <div className="p-6 border border-white/5 bg-slate-950/50 rounded-2xl relative overflow-hidden group">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Model: LSTM_T-Series_V2</span>
                    <span className="text-[10px] text-slate-600 tabular-nums font-mono italic">Epoch 452/500</span>
                </div>

                {/* Neural Network Flow */}
                <div className="flex justify-around items-center h-48 py-4">
                    {[1, 2, 3].map((layer, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            {[1, 2, 3, 4].map((node, j) => (
                                <div
                                    key={j}
                                    className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-slate-800'} 
                  ${j % 2 === 0 ? 'animate-pulse' : ''}`}
                                ></div>
                            ))}
                        </div>
                    ))}
                    {/* Connection Lines (Abstracted with CSS) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                    </div>
                </div>

                <h4 className="text-white text-xs font-bold mt-4 uppercase tracking-tighter">Predictive Failure Logic</h4>
            </div>
        </div>
    );
};

export default EngineeringDataViz;