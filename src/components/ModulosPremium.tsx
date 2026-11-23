import React, { useState } from 'react';
import { 
  Home, 
  Shield, 
  Maximize, 
  TrendingUp, 
  Key, 
  Wind, 
  Sun, 
  Leaf, 
  Layers3, 
  Waves, 
  Hammer, 
  Sparkles, 
  ChevronRight, 
  ArrowUpRight, 
  Zap, 
  RefreshCw, 
  Check, 
  Calendar,
  Layers,
  MoveRight,
  Compass,
  Cpu,
  Tv,
  Thermometer,
  Disc,
  X,
  Droplets
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Define TS Types for models and elements
interface ModelType {
  id: string;
  name: string;
  tagline: string;
  price: string;
  surface: string;
  dimensions: string;
  height: string;
  mountingTime: string;
  roi: string;
  estRent: string;
  image: string;
  distribution: { title: string; desc: string }[];
  desc: string;
}

export default function ModulosPremium() {
  const [activeTab, setActiveTab] = useState<'modelo' | 'tecnicos' | 'bioclimatico' | 'estetica' | 'financiacion'>('modelo');
  const [selectedModel, setSelectedModel] = useState<string>('cube-l');
  const [showAllCatalog, setShowAllCatalog] = useState<boolean>(false);
  const [showGlossary, setShowGlossary] = useState<boolean>(false);
  
  // Interactive State for Exploded View Elements (Slide 06 Multicapa)
  const [activeLayer, setActiveLayer] = useState<number>(2); // Default to Aislación Térmica
  
  // Interactive State for Cimentación (Slide 05 Support systems)
  const [activeCimentacion, setActiveCimentacion] = useState<'pilotes' | 'platea'>('pilotes');

  // Interactive Financing Schedule
  const [activeFinancingPlan, setActiveFinancingPlan] = useState<60 | 84 | 120>(60);
  const [searchMonth, setSearchMonth] = useState<string>('');

  const generateAmortization = (plan: 60 | 84 | 120) => {
    const capital = 19000;
    const rate = 0.14 / 12;
    let balance = capital;
    const rows = [];
    const fixedPayment = plan === 60 ? 442.10 : plan === 84 ? 356.06 : 295.01;
    
    for (let m = 1; m <= plan; m++) {
      const interest = Number((balance * rate).toFixed(2));
      let amortization = Number((fixedPayment - interest).toFixed(2));
      let nextBalance = Number((balance - amortization).toFixed(2));
      
      if (m === plan || nextBalance < 0) {
        amortization = Number(balance.toFixed(2));
        nextBalance = 0;
      }
      
      rows.push({
        month: m,
        payment: fixedPayment,
        interest,
        amortization,
        balance: nextBalance
      });
      balance = nextBalance;
    }
    return rows;
  };

  const models: ModelType[] = [
    {
      id: 'cube-l',
      name: 'Cube L ("Large")',
      tagline: '★ BUQUE INSIGNIA DESTACADO • 30.62 m² • El más completo de alta gama y máximo confort térmico.',
      price: '19.000',
      surface: '30.62 m²',
      dimensions: '12.00m x 2.44m',
      height: '2.50 metros',
      mountingTime: '45 días',
      roi: '18% - 22% anual',
      estRent: 'USD 1.000 - USD 1.300',
      image: '/imagen.jpg',
      distribution: [
        { title: 'Dormitorio Principal', desc: 'Confort de 6.41 m² con espacio para sommier, placard integrado y ventanal de luz indirecta.' },
        { title: 'Baño Central Compartimentado', desc: 'Distribución sanitaria inteligente con equipamiento e instalaciones de perfil hotelero de lujo.' },
        { title: 'Cocina & Estar Central', desc: 'Mesada central, bacha inox doble, espacio para cocina completa y puerta-ventana de acceso a deck.' },
        { title: 'Dormitorio Secundario / Escritorio', desc: 'Habitación secundaria multiuso de 6.64 m² ideal para camas singles, cuchetas o home office.' }
      ],
      desc: 'Nuestra solución habitacional estrella destacada. El Cube L ofrece la amplitud de una casa completa armada en chapa acanalada prepintada e ingeniería de esqueleto de acero de alta resistencia, completamente adaptada al riguroso clima del Norte Argentino.'
    }
  ];

  const currentMod = models[0];

  // Technical Glossary containing all definitions from Slide 2 and 3 (from user images)
  const technicalGlossary = [
    {
      term: "Barrera de Vapor",
      definition: "Lámina técnica instalada en la cara interna de la aislación que impide que la humedad del ambiente interior se condense dentro de los muros, evitando la formación de hongos y protegiendo la estructura."
    },
    {
      term: "Chapa Prepintada",
      definition: "Revestimiento exterior de acero tratado con capas de pintura industrial de alta resistencia, utilizado como \"escudo\" térmico y estético en la envolvente superior y lateral."
    },
    {
      term: "Cielorraso",
      definition: "Superficie de terminación interior de la envolvente superior que oculta las instalaciones y aporta una capa extra de absorción acústica y calidez al espacio."
    },
    {
      term: "Fibrocemento (Placas)",
      definition: "Paneles compuestos por cemento, arena y fibras de celulosa, utilizados en fachadas por su alta durabilidad, resistencia a la intemperie y bajo mantenimiento."
    },
    {
      term: "Inercia Térmica Controlada",
      definition: "Capacidad de la vivienda para alcanzar la temperatura deseada con rapidez y mantenerla con un consumo energético mínimo, gracias al diseño de su envolvente multicapa."
    },
    {
      term: "Lana de Vidrio / EPS de Alta Densidad",
      definition: "Materiales aislantes de celdas atrapadas que bloquean la transferencia de calor y actúan como filtros sonoros contra el ruido exterior."
    },
    {
      term: "Masa Térmica",
      definition: "Propiedad de materiales (como la platea de hormigón) para absorber calor y liberarlo lentamente, ayudando a estabilizar la temperatura interior."
    },
    {
      term: "Panel Rigidizador",
      definition: "Elemento estructural (como placas de madera u OSB) que se fija a la subestructura para aportar estabilidad lateral y firmeza al conjunto de la pared."
    },
    {
      term: "Pilotes Telescópicos",
      definition: "Columnas de apoyo de altura regulable que permiten nivelar los módulos en terrenos con pendientes pronunciadas sin necesidad de grandes movimientos de suelo."
    },
    {
      term: "Platea de Hormigón",
      definition: "Base plana y sólida de concreto sobre la cual se anclan los módulos en terrenos llanos, ofreciendo una integración visual convencional con el suelo."
    },
    {
      term: "Steel Frame (Subestructura)",
      definition: "Sistema de perfiles de acero liviano que se monta dentro del esqueleto principal para sostener las capas de aislación y las placas de terminación interior."
    },
    {
      term: "Termofusión (Acqua System)",
      definition: "Método de unión de tuberías mediante calor que fusiona las piezas en una sola, garantizando una estanqueidad total y una vida útil superior a los 50 años en las instalaciones sanitarias."
    },
    {
      term: "WPC (Wood Plastic Composite)",
      definition: "Material compuesto por madera y polímeros que imita la estética de la madera natural pero con una resistencia superior a la humedad y sin necesidad de mantenimiento periódico."
    },
    {
      term: "Acero Corten",
      definition: "Aleación de acero con cromo, cobre y níquel que genera una capa de óxido superficial protectora contra la corrosión, utilizada principalmente en contenedores marítimos."
    },
    {
      term: "Activo Transportable",
      definition: "Concepto que define a la vivienda modular como un bien dinámico que puede ser relocalizado o revendido, a diferencia del inmueble estático tradicional."
    },
    {
      term: "Arquitectura Pasiva",
      definition: "Estrategia de diseño que utiliza recursos naturales (sol, viento, vegetación) para lograr confort térmico con el mínimo uso de sistemas mecánicos."
    },
    {
      term: "BIM (Building Information Modeling)",
      definition: "Metodología de diseño y gestión que permite planificar cada componente de la vivienda de forma digital para eliminar errores e improvisaciones en la producción."
    },
    {
      term: "Cámara de Aire / Efecto Chimenea",
      definition: "Espacio vacío entre el revestimiento exterior y el aislamiento que permite la circulación natural del aire, reduciendo la ganancia térmica por radiación."
    },
    {
      term: "DVH (Doble Vidrio Hermético)",
      definition: "Sistema de aberturas con dos cristales separados por una cámara de aire seca, esencial para la aislación térmica y acústica superior."
    },
    {
      term: "Efecto Venturi",
      definition: "Principio físico utilizado en la ventilación cruzada donde la disposición de aberturas en caras opuestas acelera el flujo de aire para refrescar el ambiente."
    },
    {
      term: "Envolvente Técnica",
      definition: "\"Piel\" multicapa (escudo exterior, aislación, barrera de vapor y acabado interior) que protege el interior de la vivienda de las condiciones climáticas."
    },
    {
      term: "Estructura Racionalizada",
      definition: "Esqueleto de acero diseñado a medida mediante ingeniería para ofrecer mayores luces (distancias sin columnas) y libertad arquitectónica."
    },
    {
      term: "Growth Design (Diseño de Crecimiento)",
      definition: "Capacidad del sistema modular para expandirse orgánica y coherentemente (lateral o verticalmente) según las necesidades del usuario."
    },
    {
      term: "High Cube (HC)",
      definition: "Tipo de contenedor marítimo con altura extra (aprox. 2.90m), utilizado por VIVA CUBE para garantizar espacios interiores más amplios y confortables."
    },
    {
      term: "Plug & Live (Encastrar y Vivir)",
      definition: "Concepto de entrega donde el módulo llega al sitio con todas las instalaciones listas para ser conectadas a la red en pocas horas."
    },
    {
      term: "Racionalización Sistemática",
      definition: "Proceso de estandarizar elementos y automatizar tareas para garantizar precisión milimétrica y optimizar el uso de recursos."
    },
    {
      term: "Unidad Funcional",
      definition: "El módulo básico autoportante y tecnológicamente completo que funciona como el \"átomo\" o unidad de medida de todo el sistema."
    }
  ];

  // Multicapa Layer Data (Slide 06)
  const structuralLayers = [
    {
      id: 1,
      title: '01. Barrera Exterior (Escudo)',
      badge: 'Protección Primaria',
      desc: 'Ya sea el acero del contenedor marítimo o los elegantes revestimientos elegidos (chapa prepintada, composite), constituye la primera línea de defensa física e impermeable contra los vientos y la lluvia agresiva.',
      tech: 'Chapa acanalada galvanizada calibre 25, madera natural termo-tratada o placas cementicias.'
    },
    {
      id: 2,
      title: '02. Cámara de Aire y Aislación Térmica',
      badge: 'El Núcleo del Confort',
      desc: 'Utilizamos lana de vidrio de alta densidad de 50 mm o más, o EPS (Poliestireno Expandido) de alta densidad de celda cerrada. Estos materiales atrapan bolsas de aire microscópicas bloqueando de manera definitiva el paso y la transferencia de calor o frío.',
      tech: 'Lana de vidrio 50mm con revestimiento de aluminio, o EPS de 15kg/m³ de densidad extrema.'
    },
    {
      id: 3,
      title: '03. Barrera de Vapor',
      badge: 'Control Hidrotérmico',
      desc: 'Una lámina técnica hermética especial que impide de manera absoluta que el vapor o la humedad ambiente interior condensen dentro de las paredes de la estructura. Al hacerlo, eliminamos de raíz la humedad interna, la formación de hongos y protegemos el acero del chasis.',
      tech: 'Membrana hidrófuga respirable tipo Tyvek o polietileno de alto micraje técnico.'
    },
    {
      id: 4,
      title: '04. Capa Acústica Atemperante',
      badge: 'Silencio Absoluto',
      desc: 'La densidad calibrada de las capas aislantes combinadas con el panel de yeso rinde un efecto de amortiguación acústica. Reduce drásticamente el ruido de los golpes de la lluvia intensa sobre el techo de chapa y ruidos urbanos del entorno sin alterar la estructura.',
      tech: 'Fieltro aislante de atenuación acústica sonora que capta frecuencias medias-altas.'
    },
    {
      id: 5,
      title: '05. Acabado Interior de Precisión',
      badge: 'Confort Sensorial',
      desc: 'El revestimiento visual final que define la calidez habitacional. Placas de yeso de superficie perfectamente lisa o placas de madera seleccionada. Brinda la terminación de una casa tradicional, sumando una capa extra de absorción acústica y calidez táctil superior.',
      tech: 'Placas de yeso Durlock micro-masilladas o machihembrado de madera noble cepillada.'
    }
  ];

  // Passives features from Slide 06 (Bioclimáticas)
  const passiveSystems = [
    {
      icon: <Compass className="w-8 h-8 text-[#EFC46C]" />,
      title: "Orientación y Control Solar",
      highlight: "Captación Pasiva del Sol",
      desc: "La modularidad nos permite posicionar las unidades de forma estratégica en el terreno para captar o repeler energía:",
      points: [
        { label: "Captación Invernal", text: "Ubicamos las superficies vidriadas principales hacia el Norte para que el sol bajo de invierno penetre profundamente, calentando la casa gratis." },
        { label: "Protección Estival", text: "Diseñamos aleros calculados de forma geométrica y pérgolas que bloquean el sol alto de verano, manteniendo el interior fresco y sombreado." }
      ]
    },
    {
      icon: <Wind className="w-8 h-8 text-[#EFC46C]" />,
      title: "Ventilación Cruzada Natural",
      highlight: "Efecto Venturi Activo",
      desc: "Diseñamos con aberturas estratégicamente ubicadas a diferentes alturas y en caras opuestas para forzar corrientes de aire:",
      points: [
        { label: "Expulsión Térmica", text: "El aire caliente que tiende a subir es expulsado rápidamente por ventanas superiores altas o claraboyas." },
        { label: "Renovación Sanitaria", text: "Se genera un flujo constante de aire fresco y saludable de forma pasiva, mejorando la calidad del aire sin consumir energía eléctrica." }
      ]
    },
    {
      icon: <Leaf className="w-8 h-8 text-[#EFC46C]" />,
      title: "Fachadas Ventiladas & Vegetación",
      highlight: "Envolvente en Movimiento",
      desc: "Utilizamos técnicas de aislación física complementaria que mimetizan la estructura con la termografía local:",
      points: [
        { label: "Cámara Chimenea", text: "Se deja una delgada ranura de aire entre la chapa exterior y el núcleo aislante, de modo que el aire fluye disipando el calor solar en verano." },
        { label: "Mimetismo Silvestre", text: "Colores (verde oliva, mates) e integración de especies trepadoras o techos verdes opcionales como reguladores térmicos biológicos." }
      ]
    }
  ];

  // Aberturas technical points from Slide 07
  const aberturasSpecs = [
    {
      title: "Líneas de Alta Gama (Módena o Superior)",
      desc: "Utilizamos perfiles de aluminio extruido homologados con terminaciones precisas anodizadas o micro-texturadas que garantizan durabilidad frente a la radiación solar y un sellado de máxima hermeticidad frente al viento y al polvo del Norte."
    },
    {
      title: "DVH (Doble Vidrio Hermético)",
      desc: "La totalidad de los cerramientos acristalados principales incluyen doble vidrio sellado perimetralmente con cámara de aire deshidratada de 12 mm. Esto reduce a la mitad la pérdida de temperatura interna y aísla ruidos de manera inigualable."
    },
    {
      title: "Fluidez Estructural & Seguridad",
      desc: "Equipados con sistemas de rodamientos de agujas de alta capacidad. Permiten el deslizamiento de grandes paños de vidrio de piso a techo con esfuerzo mínimo, logrando integrar la zona del estar con la galería exterior tipo deck en segundos."
    }
  ];

  // Estéticas de Precisión from Slide 09
  const esteticasDisponibles = [
    {
      id: 'chapa',
      title: 'Chapa Pre-pintada',
      badge: 'Estética Industrial Inteligente',
      img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600&auto=format&fit=crop',
      color: 'Gris Grafito / Negro Mate',
      desc: 'Fachadas con chapas acanaladas verticales de alta resistencia. Resistencia extrema al sol y nulo mantenimiento ante vientos de montaña. Un look audaz y duradero.',
      tagline: 'Mantenimiento cero por 30 años.'
    },
    {
      id: 'fibrocemento',
      title: 'Placa de Fibrocemento',
      badge: 'Acento Minimalista Neto',
      img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=600&auto=format&fit=crop',
      color: 'Gris Concreto / Plomo Liso',
      desc: 'Paneles lisos atornillados con juntas arquitectónicas abiertas. Brinda una apariencia sobria que emula un bloque de hormigón moderno y monolítico, ideal para integrarse en valles urbanos.',
      tagline: 'Aspecto pétreo de alta durabilidad.'
    },
    {
      id: 'wpc',
      title: 'Panelería tipo WPC',
      badge: 'Elegancia Orgánica sin Límites',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
      color: 'Siena / Roble Humo',
      desc: 'Composite compuesto por polímeros y fibras de madera reciclada. Ofrece la inigualable textura visual de la madera fina, pero es totalmente impermeable y resistente a insectos o putrefacción.',
      tagline: 'Textura madera, resistencia sintética.'
    },
    {
      id: 'madera',
      title: 'Madera Natural Tratada',
      badge: 'Calidez Rústica de Alta Gama',
      img: 'https://images.unsplash.com/photo-1542314831-c6a4d14faaf2?q=80&w=600&auto=format&fit=crop',
      color: 'Pino Tratado / Eucalipto Duro',
      desc: 'Colocación horizontal o vertical de maderas nobles impregnadas a presión contra la intemperie. Aporta una aroma rústico, misticismo forestal y un confort térmico natural sin igual.',
      tagline: 'Madera de verdad con cura autoclave.'
    }
  ];

  return (
    <div id="modulos" className="relative z-20 py-24 bg-gradient-to-b from-black via-zinc-950 to-black border-t border-white/5 font-sans overflow-hidden">
      
      {/* Decorative top radial ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[350px] bg-gradient-to-b from-[#EFC46C]/5 to-transparent blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Philosophy Banner / Slide 1 Hero quote */}
        <div className="w-full bg-zinc-950/80 backdrop-blur-md rounded-3xl border border-white/5 p-8 md:p-12 mb-20 relative overflow-hidden ring-1 ring-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EFC46C]/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EFC46C] bg-[#EFC46C]/10 border border-[#EFC46C]/20 px-4 py-1.5 rounded-full">
              Manifiesto Modular VIVA CUBE
            </span>
            <p className="text-lg md:text-2xl font-light text-zinc-100 italic leading-relaxed">
              "No estamos ofreciendo una alternativa económica a la construcción tradicional; estamos ofreciendo una alternativa superior en calidad, tiempo y diseño. La modularidad no es una limitación de espacio, es una liberación de las complicaciones del proceso constructivo tradicional."
            </p>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <div className="h-[1px] w-8 bg-zinc-700"></div>
              <span className="text-[10px] text-zinc-400 tracking-widest uppercase font-extrabold">VIVA CUBE</span>
              <div className="h-[1px] w-8 bg-zinc-700"></div>
            </div>
          </div>
        </div>

        {/* Section Main Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#EFC46C]/10 border border-[#EFC46C]/30 px-5 py-2 rounded-full mb-6 shadow-[0_0_15px_rgba(239,196,108,0.2)]">
            <Key className="w-4 h-4 text-[#EFC46C]" />
            <span className="text-sm font-bold tracking-widest text-[#EFC46C] uppercase">SISTEMAS VIVA CUBE</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Ecosistema <span className="text-[#EFC46C]">CUBE (Ice Cube)</span>
          </h2>
          <p className="text-xl text-gray-450 max-w-4xl mx-auto font-light leading-relaxed">
            Explorá el catálogo e ingeniería detrás de las viviendas industrializadas que lideran el mercado. Unidades de confort de alta gama preparadas bajo estándares BIM con entrega garantizada.
          </p>
        </div>

        {/* ¿Qué es la construcción modular? Slide 02 Intro Section */}
        {/* INTERACTIVE 3-STEP EXPLANATION BLOCK (UI MAS SENCILLA COMO LO PIDIÓ EL USUARIO) */}
        <div className="bg-gradient-to-r from-[#EFC46C]/10 via-zinc-950 to-black border border-[#EFC46C]/30 rounded-3xl p-8 mb-16 relative overflow-hidden font-sans">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EFC46C]/5 rounded-bl-full pointer-events-none"></div>
          
          <div className="text-center md:text-left mb-8 max-w-xl">
            <span className="text-[10px] font-bold text-[#EFC46C] tracking-widest uppercase bg-[#EFC46C]/10 border border-[#EFC46C]/20 px-3 py-1 rounded-full">
              Sencillo • Rápido • Garantizado
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase mt-4 tracking-tight">
              ¿Cómo funciona el Sistema CUBE?
            </h3>
            <p className="text-xs text-zinc-400 mt-2">
              Seguí estos 3 simples pasos para tener tu casa modular completamente financiada e instalada en tu lote:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-white/5 space-y-4 hover:border-[#EFC46C]/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EFC46C]/10 border border-[#EFC46C]/30 flex items-center justify-center text-[#EFC46C] font-black text-base font-sans">
                  01
                </div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Catálogo</span>
              </div>
              <h4 className="text-white font-extrabold text-sm uppercase">1. Elegí tu Módulo</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Seleccioná entre el **Cube S** (Estudio de 14m²), **Cube M** (22m²) o nuestro destacado **Cube L (Large de 30m²)**. Podés ver las distribuciones acá abajo en la primera pestaña.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-b from-zinc-900/80 to-zinc-900 p-6 rounded-2xl border border-[#EFC46C]/40 space-y-4 hover:scale-[1.01] transition-all relative">
              <div className="absolute -top-3 right-4 bg-[#EFC46C] text-black text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
                Destacado
              </div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EFC46C]/20 border border-[#EFC46C] flex items-center justify-center text-[#EFC46C] font-black text-base font-sans">
                  02
                </div>
                <span className="text-[10px] text-[#EFC46C] font-bold uppercase tracking-widest">Financiación</span>
              </div>
              <h4 className="text-white font-extrabold text-sm uppercase">2. Financiá a Tu Medida</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Aprobamos tu análisis crediticio al instante. Financia con el exclusivo **Sistema Francés** en planes de 60, 84 o hasta **120 cuotas fijas en dólares** sin cargos ocultos.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-white/5 space-y-4 hover:border-[#EFC46C]/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EFC46C]/10 border border-[#EFC46C]/30 flex items-center justify-center text-[#EFC46C] font-black text-base font-sans">
                  03
                </div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Instalación</span>
              </div>
              <h4 className="text-white font-extrabold text-sm uppercase">3. Traslado y Disfrute</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fabricamos en taller con precisión industrial y lo transportamos listo llave en mano directamente a tu lote en **Don Borromeo o Riveras de Pucheta**. ¡Entrada inmediata!
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-xs">
            <span className="text-zinc-500 flex items-center gap-1.5 leading-relaxed font-sans text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#EFC46C] shrink-0" />
              ¿Listo para empezar? Podés alternar en las pestañas de abajo para ver Planos, Capas Técnicas o la Tabla de Cuotas.
            </span>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => setActiveTab('modelo')}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white font-bold rounded-lg transition-colors border border-white/10 uppercase tracking-widest text-[10px] cursor-pointer"
              >
                Ver Diseños
              </button>
              <button 
                onClick={() => setActiveTab('financiacion')}
                className="px-3.5 py-2 bg-[#EFC46C] hover:bg-white text-black font-extrabold rounded-lg transition-all hover:scale-105 uppercase tracking-widest text-[10px] cursor-pointer"
              >
                Ver Financiación
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-zinc-950/40 border border-white/5 rounded-3xl p-8 md:p-12 mb-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase text-[#EFC46C] tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#EFC46C] rounded-full animate-ping"></span>
              Evolución de la Arquitectura Industrializada (Slide 01-02)
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
              ¿Qué es la construcción modular?
            </h3>
            <p className="text-gray-300 font-light text-base leading-relaxed italic md:border-l-2 md:border-[#EFC46C]/30 md:pl-6">
              "La construcción modular representa la evolución hacia la arquitectura industrializada. Consiste en la racionalización sistemática de soluciones constructivas, donde la estandarización de elementos y la automatización de procesos garantizan una precisión milimétrica, optimizando recursos y tiempos de ejecución."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-black/40 border border-white/5 rounded-2xl">
                <span className="text-[#EFC46C] text-xs font-bold block mb-1">Precisión de Taller</span>
                <span className="text-gray-400 text-xs">Módulos construidos bajo techo bajo rigurosas tolerancias mecánicas. Sin desperdicios ni sorpresas de presupuesto en obra húmeda.</span>
              </div>
              <div className="p-4 bg-black/40 border border-white/5 rounded-2xl">
                <span className="text-[#EFC46C] text-xs font-bold block mb-1">Montaje Instantáneo</span>
                <span className="text-gray-400 text-xs">Se trasladan terminados al lote por camión grúa. Encastre de uniones estructurales y conexión en cuestión de horas.</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 h-[320px] rounded-3xl overflow-hidden relative shadow-2xl border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop" 
              alt="Modulo VIVA CUBE Exterior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/200 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-black bg-[#EFC46C] px-3 py-1 rounded-full">Slide 01 • Racionalización</span>
              <p className="text-white font-bold text-sm mt-2">La revolución de la vivienda pre-diseñada</p>
            </div>
          </div>
        </div>

        {/* MAIN NAVIGATION TABS */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800">
          {[
            { id: 'modelo', label: '1. Catálogo CUBE & Unidades' },
            { id: 'tecnicos', label: '2. Chasis, Capas & Cimiento' },
            { id: 'bioclimatico', label: '3. Arquitectura Pasiva & Aberturas' },
            { id: 'estetica', label: '4. Catálogo Estético' },
            { id: 'financiacion', label: '5. Precios & Financiación' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shrink-0 ${
                activeTab === tab.id 
                  ? 'bg-[#EFC46C] text-black shadow-[0_0_20px_rgba(239,196,108,0.3)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB SWITCHER CONTENT */}
        <div className="min-h-[600px] relative">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: MODEL CATALOG */}
            {activeTab === 'modelo' && (
              <motion.div 
                key="modelo"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -15 }} 
                transition={{ duration: 0.4 }}
                className="space-y-16"
              >
                {/* Flagship Cube L Highlight Spotlight */}
                <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-2 border-[#EFC46C] rounded-3xl p-8 shadow-[0_15px_40px_rgba(239,196,108,0.2)] relative overflow-hidden font-sans">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#EFC46C]/5 rounded-bl-full pointer-events-none"></div>
                  <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-8 relative z-10">
                    <div className="space-y-4 max-w-3xl">
                      <div className="inline-flex items-center gap-2 bg-[#EFC46C]/10 border border-[#EFC46C]/30 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 bg-[#EFC46C] rounded-full animate-ping"></span>
                        <span className="text-[10px] font-black text-[#EFC46C] uppercase tracking-wider">
                          ★ BUQUE INSIGNIA RECOMENDADO - MÁXIMA ALTA GAMA
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                        CUBE L <span className="text-[#EFC46C]">"LARGE"</span>
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-350 font-light leading-relaxed">
                        Nuestra obra cumbre en arquitectura industrializada de <strong>30.62 m²</strong>. Ofrece la amplitud total de una vivienda premium con esqueleto antisísmico de acero, excelente confort higrotérmico y chasis autoportante de alta resistencia completamente adaptado al exigente clima del Norte Argentino.
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-[10px] text-zinc-400 tracking-wider uppercase font-bold pt-1">
                        <span className="bg-zinc-900 px-3 py-1.5 rounded-full border border-white/5">⚫ 30.62 M² Superficie</span>
                        <span className="bg-zinc-900 px-3 py-1.5 rounded-full border border-white/5">⚫ Doble Dormitorio</span>
                        <span className="bg-zinc-900 px-3 py-1.5 rounded-full border border-white/5">⚫ Baño Compartimentado</span>
                      </div>
                    </div>
                    
                    <div className="bg-[#EFC46C]/10 border border-[#EFC46C]/40 p-6 rounded-2xl flex flex-col justify-center items-center text-center lg:items-end lg:text-right min-w-[260px] relative">
                      <div className="absolute -top-3 right-4 bg-[#EFC46C] text-black text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
                        Súper Ficción Directa
                      </div>
                      <span className="text-[10px] text-[#EFC46C] uppercase font-black tracking-widest block">Inversión Final Lista</span>
                      <span className="text-4xl font-extrabold text-[#EFC46C] block mt-1 tracking-tighter">USD 19.000</span>
                      <span className="text-[9px] text-zinc-400 font-medium block mt-1">Sujeta a Plan de 60, 84 o 120 cuotas fijas</span>
                    </div>
                  </div>
                </div>

                {/* Display Current Selected Module Sheet */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-zinc-950/40 p-6 sm:p-10 rounded-3xl border border-white/5 relative">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="relative rounded-2xl overflow-hidden h-[300px] sm:h-[380px] border border-white/10 group">
                      <img 
                        src={currentMod.image} 
                        alt={currentMod.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-[#EFC46C] bg-black/60 px-3 py-1 rounded-full border border-white/10">Plug & Live</span>
                          <h4 className="text-xl font-black text-white mt-2">Esqueleto Autoportante</h4>
                        </div>
                        <div className="bg-black/95 px-4 py-2 rounded-xl border border-white/10 text-right">
                          <span className="text-[9px] text-gray-500 uppercase block">Plazo de entrega</span>
                          <span className="text-white font-bold font-mono">{currentMod.mountingTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/55 p-6 rounded-2xl border border-white/10 space-y-3">
                      <div className="flex items-center space-x-2 text-[#EFC46C]">
                        <TrendingUp className="w-4 h-4" />
                        <h4 className="text-xs font-bold uppercase tracking-widest">Renta Turística Planificada</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-3 rounded-xl">
                          <span className="text-[9px] text-gray-500 uppercase block font-bold tracking-widest">Alquiler Est.</span>
                          <span className="text-base font-black text-emerald-400 block mt-0.5">{currentMod.estRent} <span className="text-[9px] text-gray-400">/mes</span></span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-xl">
                          <span className="text-[9px] text-gray-500 uppercase block font-bold tracking-widest">Retorno Proyectado</span>
                          <span className="text-base font-black text-white block mt-0.5">{currentMod.roi}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 leading-normal">
                        * Simulación conservadora estimada en Salta, San Lorenzo o Cafayate con ocupación promedio anual de Airbnb del 60%.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-xs font-black text-black bg-[#EFC46C] uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg">
                          Base: USD {currentMod.price}
                        </span>
                        <span className="text-xs font-semibold text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                          {currentMod.dimensions} ({currentMod.surface})
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
                        Distribución de {currentMod.name}
                      </h3>
                      <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                        {currentMod.desc}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-gray-450 uppercase tracking-widest border-b border-white/5 pb-1">Unidades Funcionales</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentMod.distribution.map((d, index) => (
                            <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#EFC46C]/15 transition-all">
                              <div className="flex items-start gap-3">
                                <span className="bg-[#EFC46C]/10 text-[#EFC46C] text-xs font-bold px-2 py-0.5 rounded mt-0.5">0{index + 1}</span>
                                <div>
                                  <span className="text-white text-xs font-extrabold block">{d.title}</span>
                                  <span className="text-gray-400 text-xs font-light block leading-normal mt-1">{d.desc}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6 space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a 
                          href={`https://wa.me/5493875557009?text=Hola,%20quiero%20más%20información%20y%20asesoramiento%20sobre%20el%20Modelo%20Modular%20${encodeURIComponent(currentMod.name)}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex-grow text-center bg-[#EFC46C] text-black font-extrabold uppercase tracking-widest py-3 px-6 rounded-xl hover:bg-white hover:scale-[1.01] active:scale-95 transition-all text-xs block"
                        >
                          Consultar por este Modelo
                        </a>
                        <button 
                          onClick={() => setActiveTab('financiacion')}
                          className="px-6 py-3 bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-colors cursor-pointer"
                        >
                          Planes de Financiación
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Slide 02-03 concepts (El Módulo como Unidad Funcional) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-white/5">
                  <div className="space-y-3 p-6 bg-zinc-950/40 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-[#EFC46C]/10 rounded-xl flex items-center justify-center text-[#EFC46C]">
                      <Maximize className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-bold text-lg uppercase tracking-tight">Escalabilidad (Growth Design)</h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      El módulo permite que la vivienda evolucione dinámicamente. Podés encastrar lateral o verticalmente nuevos dormitorios, estudios o salas de estar manteniendo la coherencia estética y estructural original, gracias a la estructura metálica perimetral sin muros de carga.
                    </p>
                  </div>
                  <div className="space-y-3 p-6 bg-zinc-950/40 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-[#EFC46C]/10 rounded-xl flex items-center justify-center text-[#EFC46C]">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-bold text-lg uppercase tracking-tight">Activo Transportable</h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Transformamos la vivienda estática en un bien de capital móvil. Si decidís mudar o reubicar tu inversión turística, el módulo viaja con vos. Esto otorga una fenomenal relocalización y un potente valor de liquidación en el mercado inmobiliario secundario.
                    </p>
                  </div>
                  <div className="space-y-3 p-6 bg-zinc-950/40 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-[#EFC46C]/10 rounded-xl flex items-center justify-center text-[#EFC46C]">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-bold text-lg uppercase tracking-tight">Concepto "Plug & Live"</h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Evitá meses de constructores tradicionales en tu terreno. Cada Cube se traslada al sitio con instalaciones completas de agua, electricidad y cloacas listas para conectarse a las redes de servicios públicos locales en pocas horas.
                    </p>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 2: TECHNICAL SHEETS (CHASSIS, LAYERS, FOUNDATIONS) */}
            {activeTab === 'tecnicos' && (
              <motion.div 
                key="tecnicos"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -15 }} 
                transition={{ duration: 0.4 }}
                className="space-y-16"
              >
                
                {/* Structure / Chassis description (Slide 04) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs font-bold text-[#EFC46C] uppercase tracking-widest bg-[#EFC46C]/10 border border-[#EFC46C]/30 px-3 py-1 rounded-full inline-block">
                      Chasis y Metalurjia (Slide 04)
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                      La Estructura de Acero: El Chasis de la Vivienda
                    </h3>
                    <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
                      Cuando el proyecto requiere dimensiones superiores a un contenedor tradicional (mayores alturas o luces libres), implementamos un sistema de <strong>Metal de Ingeniería</strong> con perfiles de acero estructurado tratado contra las inclemencias. Esto libera los límites de ancho a 3.00m o 4.00m sin requerir columnas intermedias.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-xl">
                        <span className="text-white font-bold text-xs block mb-1">Estructura Sismo-Resistente</span>
                        <span className="text-gray-400 text-xs">A diferencia del ladrillo y hormigón que sufren roturas por compresión, el acero disipa impactos de movimientos sísmicos por elasticidad perimetral.</span>
                      </div>
                      <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-xl">
                        <span className="text-white font-bold text-xs block mb-1">Montaje de Chasis en 24 Horas</span>
                        <span className="text-gray-400 text-xs">Teniendo la cimentación lista en sitio, la totalidad del chasis metálico principal de ingeniería se monta mecánicamente en una sola jornada.</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual mockup block */}
                  <div className="lg:col-span-6 p-8 bg-zinc-900/40 border border-white/10 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFC46C]/5 rounded-bl-full pointer-events-none"></div>
                    <h4 className="text-white font-black text-lg uppercase tracking-wider mb-4 text-[#EFC46C]">Especificación del Chasis</h4>
                    
                    <ul className="space-y-4 text-xs font-sans">
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#EFC46C] shrink-0 mt-0.5" />
                        <div>
                          <strong>Tratamiento Epoxídico:</strong> Perfiles de acero estructural pesado pintados con bases anticorrosivas y recubrimientos epoxídicos de durabilidad marina.
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#EFC46C] shrink-0 mt-0.5" />
                        <div>
                          <strong>Ingeniería BIM Racionalizada:</strong> Planificado por software a escala milimétrica. Facilita la repetición exacta del esquema estructural para viviendas multifamiliares de varios cuartos sin errores de campo.
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#EFC46C] shrink-0 mt-0.5" />
                        <div>
                          <strong>Uniones Bulonadas de Alta Resistencia:</strong> Las placas de transición se vinculan mediante bulonería trefilada de grado de tracción extrema para acoples libres de fatiga.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Vertical Cutaway Interactive Wall: Slide 06 Multicapa */}
                <div className="bg-zinc-900/20 border border-white/5 p-6 sm:p-12 rounded-3xl">
                  <div className="max-w-2xl mx-auto text-center mb-10">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full">
                      El "Efecto Termo" Multicapa (Slide 06)
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter mt-4">
                      Anatomía de la Pared Técnica Multicapa
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm font-light mt-2 leading-relaxed">
                      Nuestros muros y techos no son paneles sólidos simples de chapa. Son un complejo "sándwich de materiales" calibrado para soportar climas áridos y fríos extremos como los de Salta con mínimo consumo energético.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Layer Selector Left */}
                    <div className="lg:col-span-5 space-y-2">
                      {structuralLayers.map((layer) => (
                        <button
                          key={layer.id}
                          onClick={() => setActiveLayer(layer.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                            activeLayer === layer.id
                              ? 'border-[#EFC46C]/60 bg-gradient-to-r from-zinc-900 to-[#EFC46C]/10 text-white shadow-md'
                              : 'border-white/5 bg-zinc-950/20 hover:border-white/10 hover:bg-zinc-950/40 text-gray-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                              activeLayer === layer.id ? 'bg-[#EFC46C] text-black' : 'bg-white/5 text-gray-500'
                            }`}>
                              {layer.id}
                            </span>
                            <span className="text-xs sm:text-sm font-bold truncate">{layer.title.replace(/^\d+\.\s*/, '')}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-500" />
                        </button>
                      ))}
                    </div>

                    {/* Active Layer Details Panel Right */}
                    <div className="lg:col-span-7 bg-zinc-950/80 p-6 sm:p-10 rounded-2xl border border-white/10 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
                      <div className="absolute right-6 top-6 text-7xl font-sans font-black text-[#EFC46C]/5 pointer-events-none select-none">
                        CAPA 0{activeLayer}
                      </div>

                      <div className="space-y-4 relative z-10">
                        <span className="text-[10px] bg-[#EFC46C]/10 text-[#EFC46C] border border-[#EFC46C]/20 px-2.5 py-1 rounded-full uppercase tracking-widest font-extrabold font-mono">
                          {structuralLayers[activeLayer - 1].badge}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-black text-white mt-1 uppercase">
                          {structuralLayers[activeLayer - 1].title}
                        </h4>
                        <p className="text-gray-300 text-sm font-light leading-relaxed">
                          {structuralLayers[activeLayer - 1].desc}
                        </p>
                      </div>

                      <div className="border-t border-white/5 pt-4 mt-6">
                        <span className="text-[10px] text-gray-500 uppercase font-black block tracking-widest mb-1.5">Material de Especificación</span>
                        <div className="flex items-center gap-2 text-xs text-white">
                          <Thermometer className="w-4 h-4 text-[#EFC46C]" />
                          <span>{structuralLayers[activeLayer - 1].tech}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Thermal Efficiency banner */}
                  <div className="mt-12 p-8 bg-zinc-950/60 rounded-2xl border border-white/5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h4 className="text-white font-extrabold text-lg uppercase">La Física de un Termo Inteligente</h4>
                      <p className="text-gray-400 text-xs font-light max-w-xl">
                        "En una casa tradicional con 40°C de calor o noche bajo cero, el aire acondicionado nunca descansa. En un Cube, la envolvente conserva la temperatura con un consumo energético bajísimo: ¡hasta un 50% de ahorro real mensual en facturas!"
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#EFC46C] bg-[#EFC46C]/10 px-4 py-2 rounded-xl shrink-0 uppercase tracking-widest font-black">
                      Inercia Térmica Controlada
                    </span>
                  </div>
                </div>

                {/* Support and Foundations: Slide 05 Anclar o Elevar */}
                <div className="space-y-8 pt-8">
                  <div className="max-w-3xl mx-auto text-center space-y-2">
                    <span className="text-xs font-black text-[#EFC46C] uppercase tracking-widest">
                      Fundación & Cimientos (Slide 05)
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter">
                      ¿Anclar o elevar? Sistemas de Apoyo
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm font-light">
                      Al ser estructuras de chasis de acero autoportantes, no requieren de grandes excavaciones ni cimientos masivos de hormigón común. Las opciones se optimizan según el suelo.
                    </p>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setActiveCimentacion('pilotes')}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                        activeCimentacion === 'pilotes'
                          ? 'bg-amber-100 text-black shadow-md'
                          : 'bg-zinc-900 text-gray-400 border border-white/5'
                      }`}
                    >
                      A. Pilotes o Columnas (Elevación)
                    </button>
                    <button
                      onClick={() => setActiveCimentacion('platea')}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                        activeCimentacion === 'platea'
                          ? 'bg-amber-100 text-black shadow-md'
                          : 'bg-zinc-900 text-gray-400 border border-white/5'
                      }`}
                    >
                      B. Platea de Hormigón (Base Plana)
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/60 p-6 sm:p-10 rounded-3xl border border-white/5">
                    {activeCimentacion === 'pilotes' ? (
                      <>
                        <div className="lg:col-span-7 space-y-4">
                          <span className="text-xs font-black text-[#EFC46C] uppercase tracking-wider block">OPCIÓN RECOMENDADA PARA TERRENOS IRREGULARES</span>
                          <h4 className="text-2xl font-black text-white uppercase">Sistemas de Elevación sobre Pilotes</h4>
                          
                          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                            Es la opción preferida por nuestros ingenieros para terrenos agrestes, faldeos de cordillera o con pendientes pronunciadas. El Cube "flota" libremente sobre pilotes de acero rellenos de hormigón.
                          </p>

                          <ul className="space-y-3 pt-2">
                            <li className="flex items-start gap-2.5 text-xs text-gray-400">
                              <span className="w-1.5 h-1.5 bg-[#EFC46C] rounded-full mt-1.5 shrink-0" />
                              <p><strong>Mínimo Impacto Ambiental:</strong> Únicamente se intervienen puntos específicos del suelo, salvaguardando la escorrentía natural del agua y la vegetación nativa del Norte.</p>
                            </li>
                            <li className="flex items-start gap-2.5 text-xs text-gray-400">
                              <span className="w-1.5 h-1.5 bg-[#EFC46C] rounded-full mt-1.5 shrink-0" />
                              <p><strong>Cero Humedad de Cimiento:</strong> Se despega totalmente de la tierra húmeda, previniendo el ascenso por capilaridad, enemigo mortal de los ladrillos.</p>
                            </li>
                            <li className="flex items-start gap-2.5 text-xs text-gray-400">
                              <span className="w-1.5 h-1.5 bg-[#EFC46C] rounded-full mt-1.5 shrink-0" />
                              <p><strong>Defensa contra Humedales e Inundaciones:</strong> Ideal para llanuras aluvionales donde el agua puede correr fluidamente bajo la vivienda.</p>
                            </li>
                          </ul>
                        </div>
                        <div className="lg:col-span-5 bg-zinc-900/60 p-6 rounded-2xl border border-white/10 text-xs space-y-3">
                          <h5 className="text-white font-bold uppercase block tracking-wider text-[#EFC46C]">Vea cómo funciona la nivelación:</h5>
                          <p className="text-gray-400">Utilizamos bases telescópicas cilíndricas de acero micro-empotradas al suelo firme. En terrenos con pendientes de más de 30 grados, el Cube permite habitar riscos que la arquitectura convencional descarta por costos imposibles.</p>
                          <div className="p-3 bg-zinc-950 rounded-xl text-center text-gray-500 italic block font-mono">
                            Cimentación rápida sin excavación masiva
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="lg:col-span-7 space-y-4">
                          <span className="text-xs font-black text-[#EFC46C] uppercase tracking-wider block font-sans">ESTÉTICA DE CASAS A RAS DE SUELO</span>
                          <h4 className="text-2xl font-black text-white uppercase">Platea de Hormigón Rígida</h4>
                          
                          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                            Diseñado exclusivamente para terrenos totalmente llanos o clientes que anhelan una apariencia integrada e indisoluble, donde el piso interior de la vivienda linda inmediatamente a ras de suelo del jardín principal.
                          </p>

                          <ul className="space-y-3 pt-2">
                            <li className="flex items-start gap-2.5 text-xs text-gray-400">
                              <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                              <p><strong>Masa de Estabilidad Térmica:</strong> Al asentar sólidamente sobre la base de hormigón, el cemento actúa como moderador e inercia térmica adicional regulando shocks térmicos del día.</p>
                            </li>
                            <li className="flex items-start gap-2.5 text-xs text-gray-400">
                              <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-1.5 shrink-0" />
                              <p><strong>Coherencia de Permanencia Visual:</strong> Se mimetiza con un estilo constructivo clásico urbano de permanencia definitiva solicitado en loteos residenciales estrictos.</p>
                            </li>
                          </ul>
                        </div>
                        <div className="lg:col-span-5 bg-zinc-900/60 p-6 rounded-2xl border border-white/10 text-xs space-y-3 font-sans">
                          <h5 className="text-white font-bold uppercase block tracking-wider">Nota de Ingeniería:</h5>
                          <p className="text-gray-400">"La elección del sistema de apoyo no es al azar. Es vital realizar un estudio geotécnico preliminar de suelos para asegurar la vinculación del chasis a la platea con pernos expansivos químicos certificados."</p>
                          <div className="p-3 bg-zinc-950 rounded-xl text-center text-gray-400 font-bold block">
                            Ideal para terrenos de valles planos
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 3: PASIVAS, ABERTURAS & TECHOS */}
            {activeTab === 'bioclimatico' && (
              <motion.div 
                key="bioclimatico"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -15 }} 
                transition={{ duration: 0.4 }}
                className="space-y-16"
              >
                
                {/* 1. Bioclimático Header & Passive columns (Slide 06) */}
                <div className="space-y-8">
                  <div className="max-w-3xl mx-auto text-center space-y-2">
                    <span className="text-xs font-black text-[#EFC46C] uppercase tracking-widest bg-[#EFC46C]/10 border border-[#EFC46C]/30 px-3.5 py-1 rounded-full inline-block">
                      Arquitectura Pasiva: El Diseño que No Consume (Slide 06)
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                      Ingeniería Bioclimática Inteligente
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm font-light">
                      En VIVA CUBE, la gran eficiencia energética no se logra solamente importando materiales caros, sino con diseño estratégico y análisis térmico de asoleamiento.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {passiveSystems.map((sys, idx) => (
                      <div key={idx} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-[#EFC46C]/25 transition-all">
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-xl bg-[#EFC46C]/10 flex items-center justify-center">
                            {sys.icon}
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 uppercase block font-bold tracking-widest">{sys.highlight}</span>
                            <h4 className="text-lg font-extrabold text-white mt-0.5">{sys.title}</h4>
                          </div>
                          <p className="text-xs text-gray-400 font-light leading-relaxed">{sys.desc}</p>
                          
                          <div className="space-y-3 pt-2">
                            {sys.points.map((pt, pIdx) => (
                              <div key={pIdx} className="p-3 bg-black/40 rounded-xl border border-white/5">
                                <span className="text-white text-xs font-bold block">{pt.label}</span>
                                <span className="text-gray-400 text-xs font-light block mt-1 leading-normal">{pt.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Aberturas y Conexión Exterior (Slide 07) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-zinc-950/60 p-6 sm:p-12 rounded-3xl border border-white/5">
                  <div className="lg:col-span-5 space-y-6">
                    <span className="text-xs font-bold text-[#EFC46C] uppercase tracking-widest bg-[#EFC46C]/10 border border-[#EFC46C]/30 px-3 py-1 rounded-full inline-block">
                      Aberturas y Expansiones (Slide 07)
                    </span>
                    <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
                      La Dilución del Límite Exterior
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                      El diseño Cube busca integrarse libremente al imponente paisaje de Salta sin sacrificar la hermeticidad térmica exigida por la vivienda pasiva. Desarrollamos portones corredizos que expanden el interior hacia galerías integradas.
                    </p>

                    <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-xl font-sans text-xs text-yellow-100 flex items-start gap-2.5">
                      <Shield className="w-5 h-5 text-[#EFC46C] shrink-0 mt-0.5" />
                      <div>
                        <strong>Galerías Deck & Alero:</strong> Integramos de fábrica aleros con inclinación calculada y decks de madera natural cepillada súper resistentes a la abrasión solar.
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-xs font-bold text-gray-450 uppercase tracking-widest">Estándares Técnicos Superiores de Aberturas</h4>
                    <div className="space-y-3">
                      {aberturasSpecs.map((spec, sIdx) => (
                        <div key={sIdx} className="bg-black/40 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                          <h5 className="text-[#EFC46C] text-xs font-bold uppercase">{spec.title}</h5>
                          <p className="text-gray-400 text-xs font-light mt-1.5 leading-relaxed">{spec.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Cubierta y Techos (Slide 08 "El Escudo Superior") & Instalaciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                  {/* Roof styles */}
                  <div className="p-8 bg-zinc-900/50 rounded-3xl border border-white/5 space-y-6">
                    <div className="w-12 h-12 bg-[#EFC46C]/10 rounded-2xl flex items-center justify-center text-[#EFC46C]">
                      <Home className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-widest">Cubierta Superior (Slide 08)</span>
                      <h4 className="text-xl font-bold text-white mt-0.5 uppercase">El Escudo Superior Hermético</h4>
                    </div>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      El techo es el punto de mayor conflicto en la construcción tradicional (fracturas, filtraciones, etc). Diseñamos cubiertas integrales herméticas multicapa preparadas para actuar de escudo solar e hídrico.
                    </p>
                    
                    <div className="space-y-3 font-sans">
                      <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-white text-xs font-bold block">Cubierta Plana (Look Minimalista)</span>
                        <span className="text-gray-400 text-xs">Ideal para look cosmopolita. Facilita la sumatoria de paneles fotoeléctricos solares y recolección de agua pluvial.</span>
                      </div>
                      <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-white text-xs font-bold block">Inclinado a Dos Aguas (Estilo Alpino)</span>
                        <span className="text-gray-400 text-xs">Recomendado para zonas con altas cargas de lluvias intensas o nieve en altura, logrando un aura tradicional.</span>
                      </div>
                      <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                        <span className="text-white text-xs font-bold block">Techo Vivo o Cubierta Verde</span>
                        <span className="text-gray-400 text-xs">Sustrato de tierra con plantas silvestres que actúa como filtro biológico y escudo absorbente de radiación.</span>
                      </div>
                    </div>
                  </div>

                  {/* High end plumbing and electricity specs */}
                  <div className="p-8 bg-zinc-900/50 rounded-3xl border border-white/5 space-y-6 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                        <Layers3 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase font-bold tracking-widest">Detalle e Instalaciones (Slide 08)</span>
                        <h4 className="text-xl font-bold text-white mt-0.5 uppercase">BIM & Ingeniería del Detalle</h4>
                      </div>
                      <p className="text-xs text-gray-300 font-light leading-relaxed">
                        Nuestras instalaciones eléctricas e hidráulicas no son parches que se improvisan sobre la marcha en el lote de obra. Se integran perfectamente al chasis desde el prototipo digitalizado BIM de taller para evitar rajaduras o rotura de muros.
                      </p>

                      <div className="space-y-4 pt-2">
                        <div className="flex items-start gap-3">
                          <Droplets className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-white text-xs font-bold block">Plomería Termofusión de Alta Gama</span>
                            <span className="text-gray-400 text-xs leading-normal block mt-1">
                              Acoplamientos Acqua System y Awaduct soldados térmicamente a nivel molecular. Garantizan estanqueidad de presión física e inmunidad a pérdidas por más de 50 años.
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Zap className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-white text-xs font-bold block">Red Canalizada Ignífuga y Conectividad</span>
                            <span className="text-gray-400 text-xs leading-normal block mt-1">
                              Cables colocados dentro de ductos técnicos independientes con recubrimiento retardador de llama. Diseñados y pre-cableados de fábrica para alta demanda energética y sistemas de domótica.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl text-center text-[10px] text-gray-500 font-mono">
                      * El mantenimiento mecánico de llaves se realiza mediante registros de inspección ocultos.
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 4: ESTETICA catalog */}
            {activeTab === 'estetica' && (
              <motion.div 
                key="estetica"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -15 }} 
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                
                <div className="max-w-3xl mx-auto text-center space-y-3">
                  <span className="text-xs font-black text-[#EFC46C] uppercase tracking-widest">
                    Terminaciones & Estética (Slide 09)
                  </span>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    El Catálogo de la Precisión
                  </h3>
                  <p className="text-gray-400 text-sm font-light">
                    Brindamos combinaciones de terminación calibradas con precisión milimétrica donde podés seleccionar la estética ideal que vestirá el exterior de tu Cube.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {esteticasDisponibles.map((st) => (
                    <div 
                      key={st.id}
                      className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#EFC46C]/30 transition-all shadow-lg"
                    >
                      <div className="relative h-[220px] overflow-hidden">
                        <img 
                          src={st.img} 
                          alt={st.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                        <span className="absolute bottom-4 left-4 text-[10px] uppercase font-bold tracking-widest text-black bg-[#EFC46C] px-2.5 py-0.5 rounded">
                          {st.color}
                        </span>
                      </div>

                      <div className="p-5 flex-grow space-y-3">
                        <div>
                          <span className="text-[9px] text-gray-500 block uppercase font-bold tracking-widest">{st.tagline}</span>
                          <h4 className="text-lg font-black text-white mt-1">{st.title}</h4>
                        </div>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">
                          {st.desc}
                        </p>
                      </div>

                      <div className="p-5 border-t border-white/5 bg-black/20 text-center">
                        <span className="text-[10px] text-zinc-500 uppercase font-black">{st.badge}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobiliario Integrado slide 09 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/60 p-6 sm:p-10 rounded-3xl border border-white/5">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-black text-[#EFC46C] uppercase tracking-wider block">PERSONALIZACIÓN SISTEMATIZADA</span>
                    <h4 className="text-2xl font-black text-white uppercase">Mobiliario de Diseño Integrado</h4>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                      Cada centímetro de las unidades Cube se planifica con exactitud quirúrgica. Ofrecemos la colocación directa de armarios, alacenas de cocina y placares empotrados hechos a medida en taller, encajados de fábrica para aprovechar los espacios muertos al 100%.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 pt-2 font-sans">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#EFC46C]" />
                        <span>Melaminas de alta densidad 18mm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#EFC46C]" />
                        <span>Herrajes de cierre suave alemanes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#EFC46C]" />
                        <span>Mesadas lineales de cuarzo integrado</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#EFC46C]" />
                        <span>Griferías monocomando premium</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 bg-[#EFC46C]/5 p-6 rounded-2xl border border-[#EFC46C]/20 text-center space-y-4">
                    <Sparkles className="w-8 h-8 text-[#EFC46C] mx-auto" />
                    <h5 className="text-white font-extrabold uppercase text-sm">¿Deseás cotizar un equipamiento llave en mano?</h5>
                    <p className="text-xs text-zinc-400">Adherimos el paquete de muebles integrados de fábrica amortizado directamente en tus cuotas mensuales del sistema francés.</p>
                    <a 
                      href="https://wa.me/5493875557009?text=Hola,%20quisiera%20consultar%20por%20las%20opciones%20de%20mobiliario%20y%20terminaciones%20de%20diseño%20para%20los%20modulos%20CUBE."
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-[#EFC46C] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl hover:bg-white transition-colors"
                    >
                      Asesoramiento en Estéticas
                    </a>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 5: FINANCING */}
            {activeTab === 'financiacion' && (
              <motion.div 
                key="financiacion"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -15 }} 
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto space-y-12"
              >
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EFC46C]/10 border border-[#EFC46C]/20 flex items-center justify-center text-[#EFC46C] mx-auto mb-4">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    Sistema Francés de Financiación
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base font-light max-w-2xl mx-auto">
                    Brindamos planes transparentes a tasa anual fija del 14% en dólares, con cálculo exacto de cuotas mensuales y amortización directa.
                  </p>
                  <p className="text-xs text-white font-bold tracking-widest border border-white/10 inline-block px-5 py-2 rounded-full bg-white/5">
                    EJEMPLO DE MÓDULO BASE: USD 19.000 (Modelo Cube Large)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                  
                  {/* Plan 5 Años */}
                  <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors">
                    <div>
                      <h4 className="text-white font-extrabold text-lg uppercase">Plan 5 Años</h4>
                      <span className="text-[10px] text-gray-500 font-bold block uppercase tracking-widest mt-0.5">60 Cuotas Mensuales</span>
                      
                      <div className="my-6">
                        <span className="text-3xl font-black text-[#EFC46C]">USD 442.10</span>
                        <span className="text-gray-500 text-sm ml-1">/ mes</span>
                      </div>

                      <div className="space-y-3 text-xs pt-4 border-t border-white/5">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Total Financiamiento:</span>
                          <span className="text-white font-mono font-bold">USD 26.526,00</span>
                        </div>
                        <div className="text-zinc-500 text-[10px] uppercase font-bold pt-1">Amortización Cuota 1:</div>
                        <div className="flex justify-between text-[11px] text-zinc-400">
                          <span>- Componente Interés:</span>
                          <span className="font-mono">$221.67</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-zinc-400">
                          <span>- Componente Capital:</span>
                          <span className="font-mono">$220.43</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Plan 7 Años */}
                  <div className="bg-gradient-to-b from-[#EFC46C]/10 to-zinc-900 border border-[#EFC46C]/40 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl scale-105 z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#EFC46C] text-black text-[9px] font-extrabold uppercase tracking-widest py-1 px-4 rounded-full">
                      MÁS SOLICITADO
                    </div>
                    <div>
                      <h4 className="text-white font-extrabold text-lg uppercase">Plan 7 Años</h4>
                      <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-widest mt-0.5">84 Cuotas Mensuales</span>
                      
                      <div className="my-6">
                        <span className="text-4xl font-black text-white">USD 356.06</span>
                        <span className="text-gray-400 text-sm ml-1">/ mes</span>
                      </div>

                      <div className="space-y-3 text-xs pt-4 border-t border-white/5">
                        <div className="flex justify-between">
                          <span className="text-zinc-350">Total Financiamiento:</span>
                          <span className="text-white font-mono font-bold text-sm">USD 29.909,04</span>
                        </div>
                        <div className="text-[#EFC46C] text-[10px] uppercase font-bold pt-1">Amortización Cuota 1:</div>
                        <div className="flex justify-between text-[11px] text-zinc-400">
                          <span>- Componente Interés:</span>
                          <span className="font-mono">$221.67</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-zinc-400">
                          <span>- Componente Capital:</span>
                          <span className="font-mono">$134.39</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Plan 10 Años */}
                  <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors">
                    <div>
                      <h4 className="text-white font-extrabold text-lg uppercase">Plan 10 Años</h4>
                      <span className="text-[10px] text-gray-500 font-bold block uppercase tracking-widest mt-0.5">120 Cuotas Mensuales</span>
                      
                      <div className="my-6">
                        <span className="text-3xl font-black text-[#EFC46C]">USD 295.01</span>
                        <span className="text-gray-500 text-sm ml-1">/ mes</span>
                      </div>

                      <div className="space-y-3 text-xs pt-4 border-t border-white/5">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Total Financiamiento:</span>
                          <span className="text-white font-mono font-bold">USD 35.401,20</span>
                        </div>
                        <div className="text-zinc-500 text-[10px] uppercase font-bold pt-1">Amortización Cuota 1:</div>
                        <div className="flex justify-between text-[11px] text-zinc-400">
                          <span>- Componente Interés:</span>
                          <span className="font-mono">$221.67</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-zinc-400">
                          <span>- Componente Capital:</span>
                          <span className="font-mono">$73.34</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* INTERACTIVE AMORTIZATION TABLE */}
                <div className="bg-zinc-950/60 p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/5">
                    <div>
                      <h4 className="text-xl font-bold text-white uppercase tracking-tight">
                        Cálculos Completos - Amortización Sistema Francés
                      </h4>
                      <p className="text-gray-400 text-xs font-light mt-1">
                        Seleccioná un plan para visualizar la evolución del pago de capital e interés mes a mes.
                      </p>
                    </div>
                    
                    {/* Search box by month */}
                    <div className="w-full md:w-auto">
                      <input 
                        type="number" 
                        placeholder="Buscar Mes (Ej. 12)..." 
                        value={searchMonth}
                        onChange={(e) => setSearchMonth(e.target.value)}
                        className="w-full md:w-48 bg-zinc-900 text-white placeholder-zinc-500 text-xs rounded-xl px-4 py-2 border border-white/10 focus:outline-none focus:border-[#EFC46C]/50 font-mono"
                        min="1"
                        max={activeFinancingPlan}
                      />
                    </div>
                  </div>

                  {/* Plan Tabs inside Table */}
                  <div className="flex gap-2">
                    {[60, 84, 120].map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setActiveFinancingPlan(p as any);
                          setSearchMonth('');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                          activeFinancingPlan === p
                            ? 'bg-[#EFC46C] text-black shadow-md'
                            : 'bg-zinc-900 text-gray-400 border border-white/5 hover:text-white'
                        }`}
                      >
                        Plan {p} Cuotas
                      </button>
                    ))}
                  </div>

                  {/* Amortization Spreadsheet */}
                  <div className="max-h-[350px] overflow-y-auto border border-white/5 rounded-xl scrollbar-thin scrollbar-thumb-zinc-800">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#EFC46C]/10 text-[#EFC46C] border-b border-white/10 sticky top-0 backdrop-blur-md">
                        <tr>
                          <th className="p-3 uppercase font-black text-center">Mes</th>
                          <th className="p-3 uppercase font-black text-right">Cuota Fija</th>
                          <th className="p-3 uppercase font-black text-right">Interés (14%)</th>
                          <th className="p-3 uppercase font-black text-right">Amortización</th>
                          <th className="p-3 uppercase font-black text-right">Saldo Restante</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {generateAmortization(activeFinancingPlan)
                          .filter(row => !searchMonth || row.month.toString() === searchMonth)
                          .map((row) => (
                            <tr key={row.month} className="hover:bg-white/5 transition-colors">
                              <td className="p-3 text-center text-white font-bold">{row.month}</td>
                              <td className="p-3 text-right text-zinc-300">USD {row.payment.toFixed(2)}</td>
                              <td className="p-3 text-right text-red-400">USD {row.interest.toFixed(2)}</td>
                              <td className="p-3 text-right text-emerald-400">USD {row.amortization.toFixed(2)}</td>
                              <td className="p-3 text-right text-white">USD {row.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>

                  {/* Table summary info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5 text-xs">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 block uppercase">Capital Financiado</span>
                      <span className="text-sm font-black text-[#EFC46C]">USD 19,000.00</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 block uppercase">Tasa Anual Fija</span>
                      <span className="text-sm font-black text-[#EFC46C]">14.00%</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 block uppercase">Cuota Mensual Fija</span>
                      <span className="text-sm font-black text-[#EFC46C]">
                        USD {activeFinancingPlan === 60 ? '442.10' : activeFinancingPlan === 84 ? '356.06' : '295.01'}
                      </span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 block uppercase">Monto Total Devuelto</span>
                      <span className="text-sm font-black text-white">
                        USD {activeFinancingPlan === 60 ? '26,526.00' : activeFinancingPlan === 84 ? '29,909.04' : '35,401.20'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center bg-zinc-950/40 p-8 rounded-2xl border border-white/5 max-w-2xl mx-auto space-y-4">
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Nuestros planes con cuotas reguladas mediante sistema francés admiten liquidaciones y amortizaciones de capital de forma parcial anticipada o total sin ningún cargo penalizatorio. Consultá con tu lote de Don Borromeo o Riveras de Pucheta.
                  </p>
                  <a 
                    href="https://wa.me/5493875557009?text=Hola,%20quiero%20solicitar%20un%20analisis%20crediticio%20para%20los%20modulos%20CUBE%20habitacionales."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-[#EFC46C] text-black font-extrabold uppercase tracking-widest py-3.5 px-10 rounded-xl hover:bg-white transition-all text-xs"
                  >
                    Solicitar Análisis Crediticio
                  </a>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* GLOSSARY / DEFINITIONS & TECHNICAL INFO SECTION (Image 1 and Image 2) - COLLAPSIBLE BY DEFAULT TO RESPECT USER REQS */}
        <div className="mt-24 border-t border-white/10 pt-16">
          <div className="bg-zinc-950/60 border border-white/5 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full mb-1">
                  <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">BIBLIOTECA TÉCNICA CLIMA ACORDADO</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
                  Diccionario e Ingeniería de Conceptos
                </h3>
                <p className="text-zinc-400 text-xs font-light max-w-xl leading-relaxed">
                  Definiciones fundamentales y estándares técnicos de alto rendimiento detrás de las viviendas modulares VIVA CUBE.
                </p>
              </div>

              <button 
                onClick={() => setShowGlossary(!showGlossary)}
                className="px-6 py-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-extrabold rounded-2xl transition-all border border-emerald-500/20 uppercase tracking-widest text-xs cursor-pointer flex items-center gap-2 shadow-lg"
              >
                {showGlossary ? 'Ocultar Glosario Técnico ✕' : `Expandir Diccionario Técnico (${technicalGlossary.length} Conceptos) ⌵`}
              </button>
            </div>

            {showGlossary && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-12 pt-8 border-t border-white/5 space-y-8 relative z-10"
              >
                {/* Search bar inside expanded view */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                  <span className="text-xs text-zinc-400">Escribí abajo para buscar cualquier componente constructivo:</span>
                  <div className="w-full sm:w-80">
                    <input 
                      type="text" 
                      placeholder="Buscar término (Ej. DVH, Vapor, Steel)..." 
                      onChange={(e) => {
                        const query = e.target.value.toLowerCase();
                        const els = document.querySelectorAll('.glossary-card');
                        els.forEach((el) => {
                          const term = el.getAttribute('data-term')?.toLowerCase() || '';
                          const def = el.getAttribute('data-def')?.toLowerCase() || '';
                          if (term.includes(query) || def.includes(query)) {
                            (el as HTMLElement).style.display = 'flex';
                          } else {
                            (el as HTMLElement).style.display = 'none';
                          }
                        });
                      }}
                      className="w-full bg-zinc-900 border border-white/15 focus:border-emerald-500/40 text-xs rounded-xl px-4 py-3 placeholder-zinc-550 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {technicalGlossary.map((tab, idx) => (
                    <div 
                      key={idx}
                      data-term={tab.term}
                      data-def={tab.definition}
                      className="glossary-card bg-black/60 hover:bg-zinc-900/60 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <h4 className="text-sm font-extrabold text-emerald-400 uppercase tracking-tight">
                          {tab.term}
                        </h4>
                        <p className="text-zinc-400 text-xs font-light leading-relaxed">
                          {tab.definition}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
