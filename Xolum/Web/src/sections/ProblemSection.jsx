import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';
import AnimatedCounter from '../components/AnimatedCounter';
import { problemStats } from '../data/mockData';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = {
  labels: ['Inseguridad', 'Violencia\nde Género', 'Déficit\nAlumbrado', 'Áreas\nVerdes'],
  datasets: [
    {
      label: 'Nivel del Problema (%)',
      data: [67.4, 60, 40, 56],
      backgroundColor: [
        'rgba(239, 68, 68, 0.6)',
        'rgba(236, 72, 153, 0.6)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(34, 197, 94, 0.6)',
      ],
      borderColor: [
        'rgb(239, 68, 68)',
        'rgb(236, 72, 153)',
        'rgb(245, 158, 11)',
        'rgb(34, 197, 94)',
      ],
      borderWidth: 2,
      borderRadius: 8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(15, 22, 41, 0.95)',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      titleFont: { family: 'Inter' },
      bodyFont: { family: 'Inter' },
      cornerRadius: 8,
      padding: 12,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#94a3b8', font: { family: 'Inter', size: 12 } },
    },
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8', font: { family: 'Inter', size: 11 } },
    },
  },
};

export default function ProblemSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper id="problema">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-[100px]" />

      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <span className="tag tag-orange mb-4 inline-block">⚠️ La Problemática</span>
        <h2 className="section-title">
          Una crisis <span className="gradient-text">silenciosa</span> en
          <br />los espacios peatonales
        </h2>
        <p className="section-subtitle mt-4">
          Inseguridad, iluminación deficiente, ausencia de áreas verdes y vigilancia fragmentada
          se retroalimentan en un ciclo que expone a los grupos más vulnerables.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {problemStats.map((stat, i) => (
          <GlassCard key={stat.id} delay={i * 0.1} className="text-center relative overflow-hidden">
            {/* Glow background */}
            <div
              className="absolute inset-0 opacity-10 rounded-2xl"
              style={{ background: `radial-gradient(circle at 50% 0%, ${stat.color}, transparent 70%)` }}
            />
            <div className="relative z-10">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-display font-black mb-2" style={{ color: stat.color }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-slate-300 font-medium mb-2">{stat.description}</div>
              <div className="text-xs text-slate-500">Fuente: {stat.source}</div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Chart + Key Insight */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Chart */}
        <GlassCard delay={0.3} className="lg:col-span-3">
          <h3 className="text-lg font-display font-semibold mb-6 text-white">
            Nivel del Problema por Dimensión
          </h3>
          <div className="h-72">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </GlassCard>

        {/* Key Insight */}
        <GlassCard variant="accent" delay={0.5} className="lg:col-span-2 flex flex-col justify-center">
          <div className="text-3xl mb-4">🔗</div>
          <h3 className="text-xl font-display font-bold text-white mb-4">
            El Problema de Fondo
          </h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Las cuatro dimensiones — senderos, vegetación, iluminación y vigilancia — se
            planifican de forma <strong className="text-white">aislada</strong> por dependencias distintas.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Árboles que bloquean cámaras, luminarias insuficientes para que los sensores funcionen,
            y senderos diseñados sin considerar el riesgo real.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-300 font-medium">
              No existe en México una herramienta que optimice estas cuatro dimensiones simultáneamente.
            </p>
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}
