import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapContainer, TileLayer, Polyline, CircleMarker, Marker, Popup, useMap } from 'react-leaflet';
import SectionWrapper from '../components/SectionWrapper';
import { safePaths, lightingPoints, pointsOfInterest, mapCenter, mapZoom } from '../data/mockData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function createEmojiIcon(emoji) {
  return L.divIcon({
    html: `<div style="font-size:24px;text-align:center;line-height:1;">${emoji}</div>`,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

export default function MapSection() {
  const [showPaths, setShowPaths] = useState(true);
  const [showLights, setShowLights] = useState(true);
  const [showPOIs, setShowPOIs] = useState(true);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper id="mapa" className="relative">
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px]" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="tag tag-green mb-4 inline-block">🗺️ Demo Interactivo</span>
        <h2 className="section-title">
          Mapa de <span className="gradient-text">Intervención</span>
        </h2>
        <p className="section-subtitle mx-auto mt-4">
          Visualización interactiva con las capas del MVP: senderos seguros y luminarias optimizadas.
          Activa y desactiva capas para explorar la propuesta.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-1 space-y-4"
        >
          <div className="glass p-5">
            <h3 className="text-sm font-display font-semibold text-white mb-4 uppercase tracking-wider">
              Capas del Mapa
            </h3>

            {/* Toggle: Paths */}
            <label className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">🛤️</span>
                <span className="text-sm text-slate-300">Senderos Seguros</span>
              </div>
              <div
                onClick={() => setShowPaths(!showPaths)}
                className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${
                  showPaths ? 'bg-green-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    showPaths ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </label>

            {/* Toggle: Lights */}
            <label className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">💡</span>
                <span className="text-sm text-slate-300">Luminarias</span>
              </div>
              <div
                onClick={() => setShowLights(!showLights)}
                className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${
                  showLights ? 'bg-yellow-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    showLights ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </label>

            {/* Toggle: POIs */}
            <label className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <span className="text-sm text-slate-300">Puntos Clave</span>
              </div>
              <div
                onClick={() => setShowPOIs(!showPOIs)}
                className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${
                  showPOIs ? 'bg-blue-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    showPOIs ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </label>
          </div>

          {/* Legend */}
          <div className="glass p-5">
            <h3 className="text-sm font-display font-semibold text-white mb-4 uppercase tracking-wider">
              Leyenda
            </h3>
            <div className="space-y-3 text-sm">
              {safePaths.map((p) => (
                <div key={p.id} className="flex items-center gap-2">
                  <div className="w-8 h-1 rounded" style={{ background: p.color }} />
                  <span className="text-slate-400">{p.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/50" />
                <span className="text-slate-400">Luminaria nueva</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-500" />
                <span className="text-slate-400">Luminaria existente</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass p-5">
            <h3 className="text-sm font-display font-semibold text-white mb-3 uppercase tracking-wider">
              Métricas del Plan
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Senderos</span>
                <span className="text-white font-semibold">3 rutas (1.8 km)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Luminarias nuevas</span>
                <span className="text-white font-semibold">38 unidades</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cobertura lumínica</span>
                <span className="text-green-400 font-semibold">96%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Costo estimado</span>
                <span className="text-white font-semibold">$684,000 MXN</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-3 glass p-2 overflow-hidden"
          style={{ minHeight: '500px' }}
        >
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            className="w-full rounded-2xl"
            style={{ height: '550px' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />

            {/* Safe Paths */}
            {showPaths &&
              safePaths.map((path) => (
                <Polyline
                  key={path.id}
                  positions={path.coordinates}
                  pathOptions={{
                    color: path.color,
                    weight: 4,
                    opacity: 0.8,
                    dashArray: path.risk === 'medio' ? '8 4' : undefined,
                  }}
                >
                  <Popup>
                    <div className="text-center">
                      <strong>{path.name}</strong>
                      <br />
                      <span>Riesgo: {path.risk}</span>
                    </div>
                  </Popup>
                </Polyline>
              ))}

            {/* Lighting Points */}
            {showLights &&
              lightingPoints.map((light) => (
                <CircleMarker
                  key={light.id}
                  center={light.position}
                  radius={light.status === 'nueva' ? 6 : 4}
                  pathOptions={{
                    color: light.status === 'nueva' ? '#facc15' : '#64748b',
                    fillColor: light.status === 'nueva' ? '#fde047' : '#94a3b8',
                    fillOpacity: 0.8,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <div className="text-center">
                      <strong>{light.type}</strong> — {light.power}W
                      <br />
                      <span>Estado: {light.status}</span>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}

            {/* Points of Interest */}
            {showPOIs &&
              pointsOfInterest.map((poi) => (
                <Marker key={poi.id} position={poi.position} icon={createEmojiIcon(poi.icon)}>
                  <Popup>
                    <strong>{poi.name}</strong>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
