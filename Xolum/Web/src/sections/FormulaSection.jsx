import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import { formulaDefaults } from '../data/mockData';

export default function FormulaSection() {
  const [phi, setPhi] = useState(formulaDefaults.phi);
  const [cu, setCu] = useState(formulaDefaults.cu);
  const [fm, setFm] = useState(formulaDefaults.fm);
  const [emin, setEmin] = useState(formulaDefaults.emin);
  const [a, setA] = useState(formulaDefaults.a);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const d = useMemo(() => {
    return (phi * cu * fm) / (emin * a);
  }, [phi, cu, fm, emin, a]);

  const luminariasPerKm = useMemo(() => Math.ceil(1000 / d), [d]);
  const consumoAnual = useMemo(() => (60 * luminariasPerKm * 12 * 365) / 1000, [luminariasPerKm]);

  const sliders = [
    { label: 'Φ — Flujo Luminoso', value: phi, set: setPhi, min: 3000, max: 15000, step: 100, unit: 'lm', desc: 'Lúmenes de la luminaria' },
    { label: 'CU — Coef. Utilización', value: cu, set: setCu, min: 0.2, max: 0.7, step: 0.01, unit: '', desc: 'Eficiencia óptica' },
    { label: 'FM — Factor Mantenimiento', value: fm, set: setFm, min: 0.5, max: 1.0, step: 0.01, unit: '', desc: 'Depreciación luminosa' },
    { label: 'Emin — Iluminancia Mínima', value: emin, set: setEmin, min: 3, max: 20, step: 0.5, unit: 'lux', desc: 'Requerida por NOM-013' },
    { label: 'A — Ancho del Sendero', value: a, set: setA, min: 1.5, max: 10, step: 0.5, unit: 'm', desc: 'Ancho de la vía peatonal' },
  ];

  // Generate visual lights for the pathway visualization
  const pathwayLights = useMemo(() => {
    const count = Math.min(Math.ceil(300 / d), 30); // Scale to fit visualization
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(i);
    }
    return arr;
  }, [d]);

  return (
    <SectionWrapper id="formula">
      <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px]" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="tag tag-orange mb-4 inline-block">📐 Cálculo Luminotécnico</span>
        <h2 className="section-title">
          Fórmula <span className="gradient-text">NOM-013-ENER</span>
        </h2>
        <p className="section-subtitle mx-auto mt-4">
          Ajusta los parámetros y visualiza en tiempo real cómo cambia el espaciamiento
          entre luminarias según la norma mexicana.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formula + Sliders */}
        <div className="space-y-6">
          {/* Formula Display */}
          <GlassCard variant="accent" delay={0.2} hover={false}>
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-3 uppercase tracking-wider">Fórmula Principal</div>
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                d = <span className="text-primary-400">(Φ × CU × FM)</span> / <span className="text-yellow-400">(E<sub>min</sub> × A)</span>
              </div>
              <div className="text-sm text-slate-500 mt-2">
                d = distancia entre luminarias (metros)
              </div>
            </div>
          </GlassCard>

          {/* Sliders */}
          <GlassCard delay={0.3} hover={false}>
            <div className="space-y-5">
              {sliders.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-300">{s.label}</label>
                    <span className="text-sm font-mono font-bold text-primary-400">
                      {typeof s.value === 'number' && s.step < 1 ? s.value.toFixed(2) : s.value} {s.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.value}
                    onChange={(e) => s.set(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>{s.min} {s.unit}</span>
                    <span className="text-slate-500">{s.desc}</span>
                    <span>{s.max} {s.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Results + Visualization */}
        <div className="space-y-6">
          {/* Result */}
          <GlassCard delay={0.4} hover={false} className="text-center">
            <div className="text-sm text-slate-400 mb-2 uppercase tracking-wider">Resultado</div>
            <div className="text-6xl font-display font-black gradient-text mb-2">
              {d.toFixed(1)}
            </div>
            <div className="text-lg text-slate-300">metros entre luminarias</div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-3 rounded-xl bg-white/5">
                <div className="text-xl font-bold text-white">{luminariasPerKm}</div>
                <div className="text-xs text-slate-400">lum/km</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <div className="text-xl font-bold text-yellow-400">{consumoAnual.toLocaleString()}</div>
                <div className="text-xs text-slate-400">kWh/año/km</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5">
                <div className="text-xl font-bold text-green-400">${(luminariasPerKm * 18000).toLocaleString()}</div>
                <div className="text-xs text-slate-400">MXN/km</div>
              </div>
            </div>
          </GlassCard>

          {/* Visual Pathway */}
          <GlassCard delay={0.5} hover={false} className="overflow-hidden">
            <div className="text-sm text-slate-400 mb-4 uppercase tracking-wider text-center">
              Simulación Visual del Sendero
            </div>
            <div className="relative h-48 bg-gradient-to-b from-dark-700 to-dark-800 rounded-xl overflow-hidden">
              {/* Pathway */}
              <div className="absolute bottom-6 left-0 right-0 h-6 bg-slate-700/50 rounded" />

              {/* Lights */}
              <div className="absolute bottom-6 left-4 right-4 flex justify-between items-end">
                {pathwayLights.map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    {/* Light glow */}
                    <div
                      className="w-8 h-16 rounded-t-full opacity-30"
                      style={{
                        background: `radial-gradient(ellipse at bottom center, #fde047 0%, transparent 70%)`,
                      }}
                    />
                    {/* Pole */}
                    <div className="w-0.5 h-8 bg-slate-500" />
                    {/* Light head */}
                    <div className="w-3 h-1.5 bg-yellow-400 rounded-sm shadow-lg shadow-yellow-400/50" />
                  </div>
                ))}
              </div>

              {/* Distance label */}
              {pathwayLights.length >= 2 && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  <div className="text-xs text-primary-400 font-mono bg-dark-900/80 px-2 py-0.5 rounded">
                    ← {d.toFixed(1)}m →
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionWrapper>
  );
}
