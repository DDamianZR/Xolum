import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import { techStack } from '../data/mockData';

export default function TechSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const modules = [
    { id: 'M1', name: 'Ingesta', tech: 'Python, GeoPandas', color: '#22c55e' },
    { id: 'M2', name: 'Diagnóstico', tech: 'Watsonx AI', color: '#3b82f6' },
    { id: 'M3', name: 'Generación', tech: 'Watsonx + Python', color: '#8b5cf6' },
    { id: 'M4', name: 'Visualización', tech: 'React, Leaflet', color: '#f59e0b' },
  ];

  return (
    <SectionWrapper id="tecnologia">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px]" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="tag tag-blue mb-4 inline-block">🏗️ Arquitectura</span>
        <h2 className="section-title">
          Mérito <span className="gradient-text">Técnico</span>
        </h2>
        <p className="section-subtitle mx-auto mt-4">
          Arquitectura cloud-native serverless con 4 módulos independientes
          comunicados via APIs REST.
        </p>
      </motion.div>

      {/* Architecture Diagram */}
      <GlassCard delay={0.2} hover={false} className="mb-12 overflow-hidden">
        <div className="text-center mb-8">
          <h3 className="text-lg font-display font-semibold text-white">Flujo de Arquitectura</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {modules.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="relative"
            >
              <div
                className="p-5 rounded-2xl border text-center relative overflow-hidden"
                style={{ borderColor: `${m.color}30`, background: `${m.color}08` }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${m.color}, transparent 60%)` }}
                />
                <div className="relative z-10">
                  <div
                    className="inline-block px-3 py-1 rounded-lg text-xs font-mono font-bold mb-3"
                    style={{ background: `${m.color}20`, color: m.color }}
                  >
                    {m.id}
                  </div>
                  <div className="text-white font-display font-bold text-base mb-1">{m.name}</div>
                  <div className="text-xs text-slate-400">{m.tech}</div>
                </div>
              </div>

              {/* Arrow */}
              {i < modules.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 text-primary-400 text-xl">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {techStack.map((tech, i) => (
          <GlassCard key={i} delay={0.6 + i * 0.08} className="text-center">
            <div className="text-3xl mb-3">{tech.icon}</div>
            <div className="text-sm font-semibold text-white mb-1">{tech.name}</div>
            <div className="text-xs text-primary-400 font-mono mb-1">{tech.role}</div>
            <div className="text-[0.65rem] text-slate-500">{tech.desc}</div>
          </GlassCard>
        ))}
      </div>

      {/* Watsonx Agents */}
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard variant="accent" delay={0.8}>
          <div className="flex items-start gap-4">
            <span className="text-3xl flex-shrink-0">🔍</span>
            <div>
              <h4 className="text-base font-display font-bold text-white mb-2">Agente de Diagnóstico</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Recibe datos geoespaciales en GeoJSON y produce un reporte con índices cuantificados:
                riesgo peatonal, déficit lumínico, déficit verde y cobertura de vigilancia.
              </p>
              <span className="inline-block mt-3 px-3 py-1 rounded-lg bg-white/10 text-xs text-primary-300 font-mono">
                Granite 13B
              </span>
            </div>
          </div>
        </GlassCard>

        <GlassCard variant="accent" delay={0.9}>
          <div className="flex items-start gap-4">
            <span className="text-3xl flex-shrink-0">⚡</span>
            <div>
              <h4 className="text-base font-display font-bold text-white mb-2">Agente Generativo</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Toma el diagnóstico + restricciones técnicas (NOM-013-ENER) + resultados de optimización
                y genera escenarios de intervención con resolución de conflictos multicapa.
              </p>
              <span className="inline-block mt-3 px-3 py-1 rounded-lg bg-white/10 text-xs text-primary-300 font-mono">
                Llama 3.1 70B (opcional)
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}
