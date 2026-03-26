import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionWrapper({ children, id, className = '', dark = false }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-screen py-24 md:py-32 ${dark ? 'bg-dark-900' : ''} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="section-container relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
