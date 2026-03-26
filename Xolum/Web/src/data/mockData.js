// ========== STATISTICS DATA ==========
export const problemStats = [
  {
    id: 'inseguridad',
    label: 'Percepción de Inseguridad',
    value: 67.4,
    suffix: '%',
    description: 'de la población siente insegura su ciudad',
    source: 'ENVIPE 2024',
    icon: '🛡️',
    color: '#ef4444',
  },
  {
    id: 'genero',
    label: 'Violencia de Género',
    value: 6,
    suffix: '/10',
    description: 'mujeres han sufrido violencia en espacios públicos',
    source: 'ONU Mujeres',
    icon: '👩',
    color: '#ec4899',
  },
  {
    id: 'iluminacion',
    label: 'Déficit de Alumbrado',
    value: 40,
    suffix: '%',
    description: 'de déficit promedio en alumbrado público',
    source: 'NOM-013-ENER',
    icon: '💡',
    color: '#f59e0b',
  },
  {
    id: 'areas-verdes',
    label: 'Áreas Verdes',
    value: 4,
    suffix: ' m²/hab',
    description: 'cuando la OMS recomienda ≥9 m²/hab',
    source: 'OMS',
    icon: '🌳',
    color: '#22c55e',
  },
];

// ========== FLOW PIPELINE ==========
export const flowSteps = [
  {
    step: 1,
    title: 'Ingesta de Datos',
    description: 'Carga del dataset mock o conexión a fuentes abiertas: DENUE, SNSP, OSM, GTFS',
    icon: '📊',
    tech: 'Python, GeoPandas',
  },
  {
    step: 2,
    title: 'Diagnóstico con IA',
    description: 'Agente Granite 13B analiza la zona y genera índice de riesgo peatonal y déficit lumínico',
    icon: '🤖',
    tech: 'IBM Watsonx AI',
  },
  {
    step: 3,
    title: 'Generación de Propuestas',
    description: 'Algoritmos de grafos para senderos + fórmula luminotécnica para iluminación',
    icon: '⚡',
    tech: 'NetworkX, OSMnx',
  },
  {
    step: 4,
    title: 'Resolución de Conflictos',
    description: 'IA generativa evalúa trade-offs entre capas de intervención',
    icon: '🔄',
    tech: 'Watsonx Agents',
  },
  {
    step: 5,
    title: 'Visualización',
    description: 'Dashboard interactivo con planos, métricas y exportación PDF',
    icon: '🗺️',
    tech: 'React, Leaflet, D3',
  },
];

// ========== SCENARIOS ==========
export const scenarios = [
  {
    id: 'cost',
    name: 'Optimizado por Costo',
    icon: '💰',
    color: '#22c55e',
    gradient: 'from-green-500/20 to-emerald-600/20',
    borderColor: 'border-green-500/30',
    metrics: {
      luminarias: 24,
      cobertura: 78,
      consumo: 12480,
      costo: 432000,
      senderos: 2,
      distanciaTotal: 1.2,
    },
  },
  {
    id: 'balanced',
    name: 'Escenario Equilibrado',
    icon: '⚖️',
    color: '#3b82f6',
    gradient: 'from-blue-500/20 to-indigo-600/20',
    borderColor: 'border-blue-500/30',
    recommended: true,
    metrics: {
      luminarias: 38,
      cobertura: 96,
      consumo: 19710,
      costo: 684000,
      senderos: 3,
      distanciaTotal: 1.8,
    },
  },
  {
    id: 'safety',
    name: 'Optimizado por Seguridad',
    icon: '🛡️',
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-orange-600/20',
    borderColor: 'border-amber-500/30',
    metrics: {
      luminarias: 52,
      cobertura: 100,
      consumo: 27040,
      costo: 936000,
      senderos: 4,
      distanciaTotal: 2.4,
    },
  },
];

// ========== MAP DATA ==========
// Simulated neighborhood in CDMX area
export const mapCenter = [19.4326, -99.1332];
export const mapZoom = 15;

export const safePaths = [
  {
    id: 'ruta-1',
    name: 'Ruta Escuela → Mercado',
    risk: 'bajo',
    color: '#22c55e',
    coordinates: [
      [19.4340, -99.1370],
      [19.4335, -99.1355],
      [19.4328, -99.1340],
      [19.4320, -99.1325],
      [19.4315, -99.1310],
    ],
  },
  {
    id: 'ruta-2',
    name: 'Ruta Clínica → Transporte',
    risk: 'medio',
    color: '#3b82f6',
    coordinates: [
      [19.4310, -99.1365],
      [19.4315, -99.1350],
      [19.4322, -99.1335],
      [19.4328, -99.1340],
      [19.4335, -99.1325],
    ],
  },
  {
    id: 'ruta-3',
    name: 'Ruta Parque → Escuela',
    risk: 'bajo',
    color: '#a855f7',
    coordinates: [
      [19.4345, -99.1340],
      [19.4340, -99.1345],
      [19.4335, -99.1350],
      [19.4335, -99.1355],
      [19.4340, -99.1370],
    ],
  },
];

export const lightingPoints = [
  { id: 'l1', position: [19.4340, -99.1370], type: 'LED', power: 60, status: 'nueva' },
  { id: 'l2', position: [19.4335, -99.1355], type: 'LED', power: 60, status: 'nueva' },
  { id: 'l3', position: [19.4328, -99.1340], type: 'LED', power: 60, status: 'nueva' },
  { id: 'l4', position: [19.4320, -99.1325], type: 'LED Solar', power: 40, status: 'nueva' },
  { id: 'l5', position: [19.4315, -99.1310], type: 'LED', power: 60, status: 'nueva' },
  { id: 'l6', position: [19.4310, -99.1365], type: 'LED', power: 60, status: 'nueva' },
  { id: 'l7', position: [19.4315, -99.1350], type: 'LED', power: 60, status: 'nueva' },
  { id: 'l8', position: [19.4322, -99.1335], type: 'LED Solar', power: 40, status: 'nueva' },
  { id: 'l9', position: [19.4335, -99.1325], type: 'LED', power: 60, status: 'nueva' },
  { id: 'l10', position: [19.4345, -99.1340], type: 'LED', power: 60, status: 'nueva' },
  { id: 'l11', position: [19.4340, -99.1345], type: 'LED', power: 60, status: 'existente' },
  { id: 'l12', position: [19.4335, -99.1350], type: 'LED', power: 60, status: 'existente' },
];

export const pointsOfInterest = [
  { id: 'poi-1', name: 'Escuela Primaria', type: 'escuela', position: [19.4340, -99.1370], icon: '🏫' },
  { id: 'poi-2', name: 'Mercado Municipal', type: 'mercado', position: [19.4315, -99.1310], icon: '🏪' },
  { id: 'poi-3', name: 'Clínica de Salud', type: 'clinica', position: [19.4310, -99.1365], icon: '🏥' },
  { id: 'poi-4', name: 'Parada de Transporte 1', type: 'transporte', position: [19.4335, -99.1325], icon: '🚌' },
  { id: 'poi-5', name: 'Parada de Transporte 2', type: 'transporte', position: [19.4345, -99.1340], icon: '🚌' },
];

// ========== IMPACT DATA ==========
export const impactMetrics = {
  before: {
    cobertura: 55,
    luminarias: 47,
    fueraServicio: 14,
    luxPromedio: 3.2,
    senderos: 0,
    costoConsultoria: 1250000,
    tiempoEntrega: '3-6 meses',
  },
  after: {
    cobertura: 96,
    luminarias: 85,
    fueraServicio: 0,
    luxPromedio: 8.5,
    senderos: 3,
    costoSUSVI: 0,
    tiempoEntrega: 'Minutos',
  },
};

// ========== TECH STACK ==========
export const techStack = [
  { name: 'IBM Watsonx AI', role: 'IA Generativa', icon: '🧠', desc: 'Foundation models Granite 13B' },
  { name: 'Python', role: 'Backend', icon: '🐍', desc: 'GeoPandas, Shapely, NetworkX' },
  { name: 'React.js', role: 'Frontend', icon: '⚛️', desc: 'Interfaz interactiva' },
  { name: 'Leaflet.js', role: 'Mapas', icon: '🗺️', desc: 'Visualización geoespacial' },
  { name: 'FastAPI', role: 'API', icon: '🚀', desc: 'Backend serverless' },
  { name: 'IBM Cloud', role: 'Infraestructura', icon: '☁️', desc: 'Cloud Functions + Storage' },
];

// ========== ODS DATA ==========
export const odsData = [
  { number: 11, name: 'Ciudades Sostenibles', contribution: 'Planificación integral de espacios peatonales', color: '#f59e0b' },
  { number: 9, name: 'Innovación', contribution: 'IA generativa para planificación urbana', color: '#f97316' },
  { number: 5, name: 'Igualdad de Género', contribution: 'Senderos con enfoque de seguridad para mujeres', color: '#ef4444' },
  { number: 7, name: 'Energía Limpia', contribution: 'Luminarias LED/solares con optimización NOM-013', color: '#eab308' },
  { number: 13, name: 'Acción por el Clima', contribution: 'Corredores verdes contra islas de calor', color: '#22c55e' },
  { number: 16, name: 'Paz y Justicia', contribution: 'Videovigilancia preventiva', color: '#3b82f6' },
];

// ========== SCALABILITY TIMELINE ==========
export const scalabilityTimeline = [
  { phase: 'Validación', period: '0-6 meses', scope: 'Zonas piloto con retroalimentación local', icon: '🔬' },
  { phase: 'Expansión Local', period: '6-18 meses', scope: 'Múltiples colonias en la misma ciudad', icon: '🏙️' },
  { phase: 'Nacional', period: '18-36 meses', scope: 'Cualquier municipio de México', icon: '🇲🇽' },
  { phase: 'Latinoamérica', period: 'Futuro', scope: 'Colombia, Brasil, Argentina + OSM global', icon: '🌎' },
];

// ========== TEAM ==========
export const teamMembers = [
  { name: 'Isai Aram Pérez Flores', role: 'Inteligencia Artificial', school: 'ESCOM - IPN' },
  { name: 'Jennifer Rueda Manzano', role: 'Inteligencia Artificial', school: 'ESCOM - IPN' },
  { name: 'Diego Damián Canales Zendreros', role: 'Inteligencia Artificial', school: 'ESCOM - IPN' },
  { name: 'Irvin Jair Soriano Rosales', role: 'Ciencia de Datos', school: 'ESCOM - IPN' },
];

// ========== FORMULA DEFAULTS ==========
export const formulaDefaults = {
  phi: 7800,       // Flujo luminoso (lm)
  cu: 0.45,        // Coeficiente de utilización
  fm: 0.8,         // Factor de mantenimiento
  emin: 7.5,       // Iluminancia mínima (lux)
  a: 4,            // Ancho del sendero (m)
};
