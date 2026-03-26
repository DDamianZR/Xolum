import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import { flowSteps } from '../data/mockData';

export default function FlowSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper id="flujo">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px]" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="tag tag-blue mb-4 inline-block">⚙️ Pipeline</span>
        <h2 className="section-title">
          De datos crudos a <span className="gradient-text">planes de acción</span>
        </h2>
        <p className="section-subtitle mx-auto mt-4">
          5 pasos automatizados que transforman información urbana abierta en propuestas ejecutables.
        </p>
      </motion.div>

      {/* Pipeline Steps */}
      <div className="relative max-w-4xl mx-auto">
        {/* Connecting Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-primary-400/30 to-primary-500/50 hidden md:block" />
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-primary-400/30 to-primary-500/50 md:hidden" />

        {flowSteps.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className={`relative flex items-center mb-8 last:mb-0 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Step number - centered on line for desktop */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary-500/30">
                {step.step}
              </div>
            </div>

            {/* Card */}
            <div className={`ml-16 md:ml-0 md:w-[44%] ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
              <GlassCard delay={i * 0.2} className="relative">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{step.icon}</div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">{step.description}</p>
                    <span className="inline-block px-3 py-1 rounded-lg bg-primary-500/10 text-primary-300 text-xs font-mono">
                      {step.tech}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Spacer for the other side */}
            <div className="hidden md:block md:w-[44%]" />
          </motion.div>
        ))}
      </div>

      {/* Output Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-20"
      >
        <h3 className="text-xl font-display font-semibold text-center text-white mb-8">
          Outputs del MVP
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🗺️', title: 'Plano Interactivo', desc: '2 capas superpuestas con activación/desactivación' },
            { icon: '📊', title: 'Panel de Métricas', desc: 'Cobertura, luminarias, consumo y costo' },
            { icon: '⚖️', title: '3 Escenarios', desc: 'Costo, seguridad y equilibrado por Watsonx' },
            { icon: '📄', title: 'Reporte PDF', desc: 'Plan de intervención con fundamento normativo' },
          ].map((o, i) => (
            <GlassCard key={i} delay={1.2 + i * 0.1} className="text-center">
              <div className="text-3xl mb-3">{o.icon}</div>
              <h4 className="text-sm font-semibold text-white mb-2">{o.title}</h4>
              <p className="text-xs text-slate-400">{o.desc}</p>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
