import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Particles({ count = 600 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      if (r < 0.4) {
        cols[i * 3] = 0.24; cols[i * 3 + 1] = 0.39; cols[i * 3 + 2] = 0.93;
      } else if (r < 0.7) {
        cols[i * 3] = 0.38; cols[i * 3 + 1] = 0.65; cols[i * 3 + 2] = 0.98;
      } else {
        cols[i * 3] = 0.5; cols[i * 3 + 1] = 0.55; cols[i * 3 + 2] = 0.97;
      }
    }
    return cols;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function GridLines() {
  const lines = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const gridSize = 10;
    const divisions = 20;
    const step = gridSize / divisions;

    for (let i = -gridSize / 2; i <= gridSize / 2; i += step) {
      vertices.push(i, -5, -5, i, -5, 5);
      vertices.push(-5, -5, i, 5, -5, i);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  return (
    <lineSegments geometry={lines}>
      <lineBasicMaterial color="#1e3a8a" transparent opacity={0.15} />
    </lineSegments>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <Particles />
          <GridLines />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-transparent to-dark-900 z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent z-[1]" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-400/8 rounded-full blur-[100px] z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="tag tag-blue">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            Talent Land 2026 — Ciudades Resilientes
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-7xl md:text-9xl font-black tracking-[0.2em] mb-6"
        >
          <span className="gradient-text">SUSVI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-slate-300 font-light mb-4 tracking-wide"
        >
          Senderos Urbanos Seguros, Verdes e Inteligentes
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-base md:text-lg text-slate-500 mb-12 max-w-2xl mx-auto"
        >
          Plataforma de IA generativa que transforma datos urbanos en planes de intervención
          integrales para espacios peatonales más seguros en ciudades mexicanas.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#problema"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/30 transition-all hover:-translate-y-1 glow-accent"
          >
            Explorar Proyecto
          </a>
          <a
            href="#mapa"
            className="px-8 py-4 rounded-2xl glass text-slate-300 font-semibold text-lg hover:text-white hover:bg-white/10 transition-all"
          >
            Ver Demo Interactivo
          </a>
        </motion.div>

        {/* Stats preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { value: '48h', label: 'MVP en hackathon' },
            { value: '4', label: 'Capas urbanas' },
            { value: '$0', label: 'Costo desarrollo' },
            { value: 'Min', label: 'Tiempo de entrega' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.7 + i * 0.1 }}
              className="glass p-4 text-center"
            >
              <div className="text-2xl font-display font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-primary-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
