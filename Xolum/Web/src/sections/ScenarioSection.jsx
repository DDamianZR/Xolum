import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import AnimatedCounter from '../components/AnimatedCounter';
import { scenarios } from '../data/mockData';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const comparisonData = {
  labels: ['Luminarias', 'Cobertura (%)', 'Senderos', 'Costo (×10⁴)'],
  datasets: [
    {
      label: 'Costo',
      data: [24, 78, 2, 43.2],
      backgroundColor: 'rgba(34, 197, 94, 0.6)',
      borderColor: '#22c55e',
      borderWidth: 2,
      borderRadius: 6,
    },
    {
      label: 'Equilibrado',
      data: [38, 96, 3, 68.4],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: '#3b82f6',
      borderWidth: 2,
      borderRadius: 6,
    },
    {
      label: 'Seguridad',
      data: [52, 100, 4, 93.6],
      backgroundColor: 'rgba(245, 158, 11, 0.6)',
      borderColor: '#f59e0b',
      borderWidth: 2,
      borderRadius: 6,
    },
  ],
};

const comparisonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#94a3b8',
        font: { family: 'Inter', size: 12 },
        usePointStyle: true,
        pointStyle: 'rectRounded',
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 22, 41, 0.95)',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      titleFont: { family: 'Inter' },
      bodyFont: { family: 'Inter' },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#94a3b8', font: { family: 'Inter' } },
    },
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } },
    },
  },
};

export default function ScenarioSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper id="escenarios">
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="tag tag-blue mb-4 inline-block">⚖️ Escenarios</span>
        <h2 className="section-title">
          3 propuestas, <span className="gradient-text">una decisión</span>
        </h2>
        <p className="section-subtitle mx-auto mt-4">
          Watsonx genera automáticamente tres escenarios con trade-offs diferentes para
          que la autoridad municipal elija con datos.
        </p>
      </motion.div>

      {/* Scenario Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {scenarios.map((sc, i) => (
          <GlassCard
            key={sc.id}
            delay={i * 0.15}
            className={`relative overflow-hidden ${sc.recommended ? 'ring-2 ring-primary-500/50' : ''}`}
          >
            {sc.recommended && (
              <div className="absolute top-4 right-4">
                <span className="tag tag-blue text-[0.6rem]">✨ Recomendado</span>
              </div>
            )}

            <div
              className="absolute inset-0 opacity-10"
              style={{ background: `radial-gradient(circle at 50% 0%, ${sc.color}, transparent 60%)` }}
            />

            <div className="relative z-10">
              <div className="text-4xl mb-3">{sc.icon}</div>
              <h3 className="text-lg font-display font-bold text-white mb-4">{sc.name}</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                  <span className="text-sm text-slate-400">Luminarias</span>
                  <span className="text-sm font-bold text-white">{sc.metrics.luminarias}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                  <span className="text-sm text-slate-400">Cobertura</span>
                  <span className="text-sm font-bold" style={{ color: sc.color }}>
                    <AnimatedCounter end={sc.metrics.cobertura} suffix="%" />
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                  <span className="text-sm text-slate-400">Senderos</span>
                  <span className="text-sm font-bold text-white">
                    {sc.metrics.senderos} ({sc.metrics.distanciaTotal} km)
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                  <span className="text-sm text-slate-400">Consumo</span>
                  <span className="text-sm font-bold text-white">
                    {sc.metrics.consumo.toLocaleString()} kWh/año
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1">Costo Estimado</div>
                    <div className="text-2xl font-display font-black" style={{ color: sc.color }}>
                      ${sc.metrics.costo.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500">MXN</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Comparison Chart */}
      <GlassCard delay={0.5} hover={false}>
        <h3 className="text-lg font-display font-semibold text-center text-white mb-6">
          Comparación de Escenarios
        </h3>
        <div className="h-72">
          <Bar data={comparisonData} options={comparisonOptions} />
        </div>
      </GlassCard>
    </SectionWrapper>
  );
}
