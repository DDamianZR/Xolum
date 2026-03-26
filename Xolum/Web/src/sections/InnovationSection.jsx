import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import { odsData, scalabilityTimeline } from '../data/mockData';

export default function InnovationSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const innovationItems = [
    { method: 'Cálculo luminotécnico', current: 'DIALux / Relux (manual)', susvi: 'Automatizado en MVP', icon: '💡' },
    { method: 'Ubicación de cámaras', current: 'Decisión manual post-incidente', susvi: 'Algoritmo Shapely (capa 4)', icon: '📹' },
    { method: 'Senderos peatonales', current: 'Consultorías ($500K–$2M)', susvi: 'Minutos, costo $0', icon: '🛤️' },
    { method: 'Integración de capas', current: 'No existe', susvi: 'Motor Watsonx', icon: '🔗' },
  ];

  return (
    <SectionWrapper id="innovacion">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="tag tag-blue mb-4 inline-block">🚀 Innovación</span>
        <h2 className="section-title">
          Lo que hoy cuesta <span className="gradient-text">$2M y 6 meses</span>
          <br />SUSVI lo hace en minutos
        </h2>
      </motion.div>

      {/* Innovation Comparison */}
      <div className="grid sm:grid-cols-2 gap-5 mb-20">
        {innovationItems.map((item, i) => (
          <GlassCard key={i} delay={i * 0.12} className="relative overflow-hidden">
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">{item.icon}</span>
              <div>
                <h3 className="text-base font-display font-bold text-white mb-3">{item.method}</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 text-sm mt-0.5">✗</span>
                    <span className="text-sm text-slate-400">{item.current}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 text-sm mt-0.5">✓</span>
                    <span className="text-sm text-green-300 font-medium">{item.susvi}</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* ODS Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-20"
      >
        <h3 className="text-2xl font-display font-bold text-center text-white mb-8">
          Alineación con los ODS
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {odsData.map((ods, i) => (
            <GlassCard key={i} delay={0.5 + i * 0.08} className="text-center group">
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold transition-transform group-hover:scale-110"
                style={{ background: ods.color }}
              >
                {ods.number}
              </div>
              <div className="text-xs font-semibold text-white mb-1">{ods.name}</div>
              <div className="text-[0.65rem] text-slate-400 leading-snug">{ods.contribution}</div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Scalability Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="text-2xl font-display font-bold text-center text-white mb-8">
          Escalabilidad
        </h3>
        <div className="relative max-w-3xl mx-auto">
          {/* Line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {scalabilityTimeline.map((item, i) => (
              <GlassCard key={i} delay={0.7 + i * 0.15} className="text-center relative">
                {/* Dot */}
                <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary-400 shadow shadow-primary-400/50" />

                <div className="text-3xl mb-2 mt-2">{item.icon}</div>
                <div className="text-sm font-display font-bold text-white mb-1">{item.phase}</div>
                <div className="text-xs text-primary-400 font-mono mb-2">{item.period}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{item.scope}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
