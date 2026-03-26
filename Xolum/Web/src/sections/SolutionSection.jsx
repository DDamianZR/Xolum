import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '../components/SectionWrapper';
import GlassCard from '../components/GlassCard';

export default function SolutionSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const layers = [
    {
      number: '01',
      title: 'Senderos Peatonales Seguros',
      desc: 'Trazado automático de rutas óptimas sobre la red vial real (OSMnx/NetworkX), conectando escuelas, clínicas, mercados y transporte público.',
      tag: 'MVP',
      tagColor: 'tag-green',
      features: ['Multi-criterio: distancia + riesgo + caminabilidad', 'Datos de incidencia delictiva SNSP', 'Red vial OpenStreetMap'],
      icon: '🛤️',
      color: '#22c55e',
    },
    {
      number: '02',
      title: 'Iluminación Pública Inteligente',
      desc: 'Cálculo luminotécnico completo según NOM-013-ENER-2013: luminarias, potencia, flujo, espaciamiento, consumo y costo.',
      tag: 'MVP',
      tagColor: 'tag-green',
      features: ['Fórmula NOM-013-ENER', 'LED estándar + LED solar', 'Consumo anual y costo estimado'],
      icon: '💡',
      color: '#f59e0b',
    },
    {
      number: '03',
      title: 'Áreas Verdes Estratégicas',
      desc: 'Ubicación de arbolado y jardines lineales. Verificación de que la vegetación no obstruya cámaras futuras.',
      tag: 'Futuro',
      tagColor: 'tag-orange',
      features: ['Análisis NDVI satelital', 'Islas de calor', 'Conflicto árbol-cámara'],
      icon: '🌳',
      color: '#16a34a',
    },
    {
      number: '04',
      title: 'Videovigilancia Optimizada',
      desc: 'Ubicación óptima de cámaras C4/C5 con modelado geométrico del campo de visión y algoritmo set cover.',
      tag: 'Futuro',
      tagColor: 'tag-orange',
      features: ['Polígonos de visión (Shapely)', 'Maximización de cobertura', 'Línea de vista con edificios'],
      icon: '📹',
      color: '#8b5cf6',
    },
  ];

  return (
    <SectionWrapper id="solucion">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px]" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="tag tag-green mb-4 inline-block">✨ La Solución</span>
        <h2 className="section-title">
          <span className="gradient-text">SUSVI</span> integra todo
          <br />en una sola plataforma
        </h2>
        <p className="section-subtitle mx-auto mt-4">
          Plataforma de IA generativa que genera planes de intervención integrales
          a partir de datos urbanos abiertos.
        </p>
      </motion.div>

      {/* 4 Layer Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {layers.map((layer, i) => (
          <GlassCard key={layer.number} delay={i * 0.15} className="relative overflow-hidden group">
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"
              style={{ background: layer.color }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{layer.icon}</span>
                  <div>
                    <span className={`tag ${layer.tagColor} text-[0.65rem] mb-1`}>{layer.tag}</span>
                    <div className="text-xs text-slate-500 font-mono">Capa {layer.number}</div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">{layer.title}</h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">{layer.desc}</p>
              <div className="space-y-2">
                {layer.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: layer.color }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Integration highlight */}
      <GlassCard variant="accent" delay={0.6} className="text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            IBM Watsonx como Motor de Razonamiento Urbano
          </h3>
          <p className="text-slate-300 leading-relaxed mb-6">
            La IA generativa no es un chatbot — es un motor que evalúa trade-offs entre capas,
            genera múltiples escenarios y sintetiza datos geoespaciales en decisiones ejecutables.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Conflictos cualitativos', icon: '🔄' },
              { label: '3+ escenarios', icon: '📊' },
              { label: 'Síntesis para no técnicos', icon: '📄' },
              { label: 'Contexto local', icon: '📍' },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="p-3 rounded-xl bg-white/5 text-center"
              >
                <div className="text-2xl mb-2">{c.icon}</div>
                <div className="text-xs text-slate-300">{c.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>
    </SectionWrapper>
  );
}
