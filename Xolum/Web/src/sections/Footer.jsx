import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GlassCard from '../components/GlassCard';
import { teamMembers } from '../data/mockData';

export default function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const conclusionPoints = [
    { icon: '✅', text: 'MVP claro y demostrable en 48 horas' },
    { icon: '🧠', text: 'IA generativa + cálculos de ingeniería reales' },
    { icon: '📊', text: 'Impacto social directo y cuantificable' },
    { icon: '🌎', text: 'Escalable a toda Latinoamérica' },
    { icon: '💸', text: 'Costo de desarrollo: $0' },
  ];

  return (
    <footer className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-dark-900 to-dark-900" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/10 rounded-full blur-[120px]" />

      <div className="section-container relative z-10">
        {/* Conclusion */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-6">
            ¿Por qué <span className="gradient-text">SUSVI</span> gana?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {conclusionPoints.map((point, i) => (
            <GlassCard key={i} delay={i * 0.1} className="text-center">
              <div className="text-3xl mb-3">{point.icon}</div>
              <div className="text-sm text-slate-300 leading-relaxed">{point.text}</div>
            </GlassCard>
          ))}
        </div>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="glass-accent p-10 md:p-14 text-center mb-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-purple-500/10" />
          <div className="relative z-10">
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              SUSVI transforma datos crudos en planes de acción concretos, reduciendo de
              <strong className="text-white"> 6 meses a minutos</strong> el tiempo para diseñar
              un espacio peatonal más seguro, más verde y más inteligente.
            </p>
            <a
              href="#mapa"
              className="inline-flex px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/30 transition-all hover:-translate-y-1"
            >
              Explorar el Demo →
            </a>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h3 className="text-xl font-display font-bold text-center text-white mb-8">
            Equipo XOLUM
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamMembers.map((member, i) => (
              <GlassCard key={i} delay={0.8 + i * 0.1} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 mx-auto mb-3 flex items-center justify-center text-white text-lg font-bold">
                  {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div className="text-sm font-semibold text-white mb-1">{member.name}</div>
                <div className="text-xs text-primary-400">{member.role}</div>
                <div className="text-[0.65rem] text-slate-500">{member.school}</div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="divider mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
              S
            </div>
            <span className="font-display font-semibold text-slate-400">SUSVI</span>
            <span className="text-slate-600">por XOLUM</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Talent Land 2026</span>
            <span>•</span>
            <span>Ciudades Resilientes</span>
            <span>•</span>
            <span>ESCOM - IPN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
