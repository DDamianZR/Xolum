import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import AnimatedCounter from '../components/AnimatedCounter';
import { impactMetrics } from '../data/mockData';

export default function ImpactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const comparisonItems = [
    {
      label: 'Cobertura Lumínica',
      before: { value: impactMetrics.before.cobertura, suffix: '%' },
      after: { value: impactMetrics.after.cobertura, suffix: '%' },
      icon: '💡',
    },
    {
      label: 'Nivel promedio',
      before: { value: impactMetrics.before.luxPromedio, suffix: ' lux', decimals: 1 },
      after: { value: impactMetrics.after.luxPromedio, suffix: ' lux', decimals: 1 },
      icon: '☀️',
    },
    {
      label: 'Senderos formales',
      before: { value: impactMetrics.before.senderos, suffix: '' },
      after: { value: impactMetrics.after.senderos, suffix: ' rutas' },
      icon: '🛤️',
    },
    {
      label: 'Costo de consultoría',
      before: { value: 1.25, suffix: 'M MXN', decimals: 2, prefix: '$' },
      after: { value: 0, suffix: ' MXN', prefix: '$' },
      icon: '💰',
    },
    {
      label: 'Tiempo de entrega',
      beforeText: '3-6 meses',
      afterText: 'Minutos',
      icon: '⏱️',
    },
  ];

  return (
    <SectionWrapper id="impacto">
      <div className="absolute top-20 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-[120px]" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="tag tag-green mb-4 inline-block">📈 Alto Impacto</span>
        <h2 className="section-title">
          Antes vs <span className="gradient-text-green">Después</span>
        </h2>
        <p className="section-subtitle mx-auto mt-4">
          Impacto directo y cuantificable para 8,500 habitantes.
          De planificación fragmentada a intervención integral en minutos.
        </p>
      </motion.div>

      {/* Counters Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
        {[
          { value: 8500, label: 'Habitantes beneficiados', suffix: '', icon: '👥' },
          { value: 96, label: 'Cobertura lumínica', suffix: '%', icon: '💡' },
          { value: 684000, label: 'Costo total (MXN)', prefix: '$', suffix: '', icon: '💰' },
          { value: 80, label: 'MXN por habitante', prefix: '$', suffix: '', icon: '🎯' },
        ].map((m, i) => (
          <GlassCard key={i} delay={i * 0.1} className="text-center">
            <div className="text-3xl mb-3">{m.icon}</div>
            <div className="text-3xl md:text-4xl font-display font-black gradient-text-green">
              <AnimatedCounter end={m.value} suffix={m.suffix} prefix={m.prefix || ''} />
            </div>
            <div className="text-xs text-slate-400 mt-2">{m.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Before vs After Table */}
      <GlassCard delay={0.3} hover={false}>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-0 items-stretch">
          {/* Header */}
          <div className="p-4 text-center">
            <span className="px-4 py-1.5 rounded-lg bg-red-500/15 text-red-400 text-sm font-semibold">
              ❌ Antes
            </span>
          </div>
          <div className="w-px bg-white/10" />
          <div className="p-4 text-center">
            <span className="px-4 py-1.5 rounded-lg bg-green-500/15 text-green-400 text-sm font-semibold">
              ✅ Con SUSVI
            </span>
          </div>

          {/* Rows */}
          {comparisonItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="contents"
            >
              <div className={`p-4 flex items-center justify-center ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-400">
                    {item.beforeText || (
                      <AnimatedCounter
                        end={item.before.value}
                        suffix={item.before.suffix}
                        prefix={item.before.prefix || ''}
                        decimals={item.before.decimals || 0}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={`flex flex-col items-center justify-center ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[0.65rem] text-slate-500 mt-1 text-center leading-tight">{item.label}</span>
              </div>
              <div className={`p-4 flex items-center justify-center ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">
                    {item.afterText || (
                      <AnimatedCounter
                        end={item.after.value}
                        suffix={item.after.suffix}
                        prefix={item.after.prefix || ''}
                        decimals={item.after.decimals || 0}
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </SectionWrapper>
  );
}
