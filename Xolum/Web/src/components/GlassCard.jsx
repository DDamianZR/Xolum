import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function GlassCard({ children, className = '', variant = 'default', delay = 0, hover = true }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const variants = {
    default: 'glass',
    strong: 'glass-strong',
    accent: 'glass-accent',
    neu: 'neu',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -5, transition: { duration: 0.3 } } : {}}
      className={`${variants[variant]} p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
