import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { KANPUR_CITY_NODES, KANPUR_CITY_EDGES, DELHI_CITY_NODES, DELHI_CITY_EDGES } from '../../utils/cityData';
import { CityHubNode, CityEdge } from '../../types/routing';
import { 
  Navigation, 
  RotateCcw, 
  Layers, 
  CheckCircle2, 
  ChevronDown, 
  Clock, 
  Compass, 
  Zap, 
  Truck,
  Sparkles,
  Gauge,
  Sliders,
  AlertTriangle,
  Award
} from 'lucide-react';
import L from 'leaflet';
import { soundFX } from '../../utils/SoundFX';

type MapTileStyle = 'standard' | 'voyager' | 'dark' | 'satellite';
type TrafficScenario = 'standard' | 'rush_hour' | 'clear';

const TILE_PROVIDERS: Record<MapTileStyle, { name: string; url: string; subdomains?: string[]; attribution: string }> = {
  standard: {
    name: 'OpenStreetMap (Streets)',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  voyager: {
    name: 'Carto Voyager (Detailed)',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
  },
  dark: {
    name: 'Carto Dark Vector',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
  },
  satellite: {
    name: 'Esri Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
  }
};

// Calculate Compass Bearing between two GPS coordinates
function getBearing(from: [number, number], to: [number, number]): number {
  const lat1 = (from[0] * Math.PI) / 180;
  const lat2 = (to[0] * Math.PI) / 180;
  const dLng = ((to[1] - from[1]) * Math.PI) / 180;
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

// Custom Map Hub Marker with Category Icon
const createHubMarker = (node: CityHubNode, isStart: boolean, isTarget: boolean, isInPath: boolean) => {
  let bgColor = '#FFFFFF';
  let textColor = '#0F172A';
  let borderColor = '#94A3B8';
  let badgeText = '';

  if (isStart) {
    bgColor = '#10B981';
    textColor = '#FFFFFF';
    borderColor = '#059669';
    badgeText = 'Origin 🛵';
  } else if (isTarget) {
    bgColor = '#EF4444';
    textColor = '#FFFFFF';
    borderColor = '#DC2626';
    badgeText = 'Dropoff 📦';
  } else if (isInPath) {
    bgColor = '#4F46E5';
    textColor = '#FFFFFF';
    borderColor = '#3730A3';
  }

  let categoryDot = '#10B981';
  if (node.type === 'darkstore') categoryDot = '#0EA5E9';
  else if (node.type === 'restaurant') categoryDot = '#F59E0B';
  else if (node.type === 'customer') categoryDot = '#EF4444';
  else if (node.type === 'hub') categoryDot = '#8B5CF6';

  const isSpecial = isStart || isTarget;

  return L.divIcon({
    className: 'custom-hub-marker',
    html: `
      <div style="
        background: ${bgColor}; 
        color: ${textColor}; 
        border: 2px solid ${borderColor}; 
        box-shadow: 0 4px 14px rgba(0,0,0,0.3); 
        border-radius: 18px; 
        padding: 5px 10px; 
        font-family: Inter, system-ui, sans-serif; 
        font-size: 11px; 
        font-weight: ${isSpecial ? '700' : '600'}; 
        white-space: nowrap; 
        display: flex; 
        align-items: center; 
        gap: 6px;
        transform: translate(-50%, -50%);
        ${isSpecial ? 'transform: translate(-50%, -50%) scale(1.08);' : ''}
        transition: transform 0.2s ease;
      ">
        <span style="display:inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${categoryDot};"></span>
        <span>${node.name}</span>
        ${badgeText ? `<span style="font-size: 9px; padding: 2px 5px; border-radius: 6px; background: rgba(0,0,0,0.3); color: white;">${badgeText}</span>` : ''}
      </div>
    `,
    iconSize: [120, 30],
    iconAnchor: [0, 0]
  });
};

// Animated Rotating Courier Vehicle Marker
const createRiderMarker = (bearing: number = 0) => {
  return L.divIcon({
    className: 'custom-rider-icon',
    html: `
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        background: #4F46E5;
        border: 2.5px solid #FFFFFF;
        box-shadow: 0 0 20px rgba(79, 70, 229, 0.9), 0 4px 14px rgba(0,0,0,0.45);
        border-radius: 50%;
        color: white;
        font-size: 20px;
        transform: translate(-50%, -50%);
      ">
        <span style="display:inline-block; transform: rotate(${bearing}deg); transition: transform 0.15s ease;">
          🛵
        </span>
        <span style="
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid #4F46E5;
          animation: ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;
          opacity: 0.7;
        "></span>
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [0, 0]
  });
};

// Map Recenter & Invalidate Controller (Guarantees auto-bounds and tile loading)
const MapController: React.FC<{ 
  center: [number, number]; 
  zoom: number; 
  cityKey: string;
  routeBounds: [number, number][] | null;
}> = ({ center, zoom, cityKey, routeBounds }) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 80);
    const t2 = setTimeout(() => map.invalidateSize(), 250);
    const t3 = setTimeout(() => map.invalidateSize(), 600);

    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  useEffect(() => {
    if (routeBounds && routeBounds.length > 1) {
      const bounds = L.latLngBounds(routeBounds);
      map.fitBounds(bounds, { padding: [55, 55], maxZoom: 14, animate: true, duration: 1.0 });
    } else {
      map.flyTo(center, zoom, { duration: 1.0 });
    }
  }, [center, zoom, cityKey, routeBounds, map]);

  return null;
};

export const CityMapView: React.FC = () => {
  const [city, setCity] = useState<'kanpur' | 'delhi'>('kanpur');
  const [tileStyle, setTileStyle] = useState<MapTileStyle>('standard');
  const [trafficMode, setTrafficMode] = useState<TrafficScenario>('standard');
  const [startNodeId, setStartNodeId] = useState<string>('psit');
  const [targetNodeId, setTargetNodeId] = useState<string>('z_square');
  
  // Routing State
  const [activeRoutePath, setActiveRoutePath] = useState<string[]>([]);
  const [routeCost, setRouteCost] = useState<number | null>(null);
  const [drawnRouteCoords, setDrawnRouteCoords] = useState<[number, number][]>([]);
  const [routeBounds, setRouteBounds] = useState<[number, number][] | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [routingAlgorithm, setRoutingAlgorithm] = useState<'dijkstra' | 'traffic_aware'>('dijkstra');
  
  // Courier Simulation State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [riderPosition, setRiderPosition] = useState<[number, number] | null>(null);
  const [riderBearing, setRiderBearing] = useState<number>(0);
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [currentStreetName, setCurrentStreetName] = useState<string>('');
  const [odometerKm, setOdometerKm] = useState<number>(0);
  const [simulationComplete, setSimulationComplete] = useState<boolean>(false);

  // Interval Refs to prevent memory leaks and glitching
  const progressiveTimerRef = useRef<number | null>(null);
  const simulationTimerRef = useRef<number | null>(null);

  const baseNodes = city === 'kanpur' ? KANPUR_CITY_NODES : DELHI_CITY_NODES;
  const baseEdges = city === 'kanpur' ? KANPUR_CITY_EDGES : DELHI_CITY_EDGES;

  // Dynamic Edges with Traffic Scenario simulation
  const edges = useMemo(() => {
    return baseEdges.map(edge => {
      let t = edge.traffic;
      if (trafficMode === 'rush_hour') {
        if (edge.roadType === 'highway' || edge.roadType === 'expressway' || edge.roadType === 'metro_corridor') {
          t = 'high';
        } else {
          t = 'medium';
        }
      } else if (trafficMode === 'clear') {
        t = 'low';
      }
      return { ...edge, traffic: t };
    });
  }, [baseEdges, trafficMode]);

  const nodes = baseNodes;
  const center: [number, number] = city === 'kanpur' ? [26.4750, 80.2900] : [28.5600, 77.2000];
  const zoom = city === 'kanpur' ? 12 : 11;

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (progressiveTimerRef.current) clearInterval(progressiveTimerRef.current);
      if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);
    };
  }, []);

  // Reset when city changes
  useEffect(() => {
    if (progressiveTimerRef.current) clearInterval(progressiveTimerRef.current);
    if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);

    if (city === 'kanpur') {
      setStartNodeId('psit');
      setTargetNodeId('z_square');
    } else {
      setStartNodeId('cp_hub');
      setTargetNodeId('cyber_hub');
    }
    setActiveRoutePath([]);
    setRouteCost(null);
    setDrawnRouteCoords([]);
    setRouteBounds(null);
    setIsSimulating(false);
    setRiderPosition(null);
    setCurrentSpeed(0);
    setCurrentStreetName('');
    setSimulationComplete(false);
  }, [city]);

  // Compute Shortest / Fastest Real Road Corridor
  const handleComputeStreetRoute = () => {
    if (!startNodeId || !targetNodeId || startNodeId === targetNodeId) {
      alert('Please select two distinct hubs (Origin & Destination) to calculate the route.');
      return;
    }

    if (progressiveTimerRef.current) clearInterval(progressiveTimerRef.current);
    if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);

    setIsCalculating(true);
    soundFX.playStepSound(300);

    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const unvisited = new Set<string>();

    nodes.forEach(n => {
      distances[n.id] = Infinity;
      previous[n.id] = null;
      unvisited.add(n.id);
    });

    distances[startNodeId] = 0;

    while (unvisited.size > 0) {
      let minNodeId: string | null = null;
      let minDistance = Infinity;

      unvisited.forEach(id => {
        if (distances[id] < minDistance) {
          minDistance = distances[id];
          minNodeId = id;
        }
      });

      if (!minNodeId || minDistance === Infinity) break;
      if (minNodeId === targetNodeId) break;

      unvisited.delete(minNodeId);

      const currentId = minNodeId;
      edges.forEach(e => {
        let neighborId: string | null = null;
        if (e.from === currentId) neighborId = e.to;
        else if (e.to === currentId) neighborId = e.from;

        if (neighborId && unvisited.has(neighborId)) {
          let edgeCost = e.weight;
          if (routingAlgorithm === 'traffic_aware') {
            if (e.traffic === 'high') edgeCost *= 2.4;
            else if (e.traffic === 'medium') edgeCost *= 1.4;
          }

          const alt = distances[currentId] + edgeCost;
          if (alt < distances[neighborId]) {
            distances[neighborId] = alt;
            previous[neighborId] = currentId;
          }
        }
      });
    }

    const path: string[] = [];
    let curr: string | null = targetNodeId;
    while (curr) {
      path.unshift(curr);
      curr = previous[curr];
    }

    // Build the Real-Road Coordinates (stitching geometry points along curves)
    const detailedRoadCoords: [number, number][] = [];
    let totalPhysicalDistance = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      const edge = edges.find(e => (e.from === u && e.to === v) || (e.from === v && e.to === u));
      
      if (edge) {
        totalPhysicalDistance += edge.weight;
        const segmentCoords = edge.geometry ? (
          edge.from === u ? [...edge.geometry] : [...edge.geometry].reverse()
        ) : [
          [nodes.find(n => n.id === u)!.lat, nodes.find(n => n.id === u)!.lng],
          [nodes.find(n => n.id === v)!.lat, nodes.find(n => n.id === v)!.lng]
        ] as [number, number][];

        if (detailedRoadCoords.length > 0) {
          detailedRoadCoords.push(...segmentCoords.slice(1));
        } else {
          detailedRoadCoords.push(...segmentCoords);
        }
      }
    }

    setActiveRoutePath(path);
    setRouteCost(parseFloat(totalPhysicalDistance.toFixed(2)));
    setRouteBounds(detailedRoadCoords);
    setIsSimulating(false);
    setSimulationComplete(false);
    setOdometerKm(0);
    setIsCalculating(false);

    // Animate Real-Road Polyline drawing
    animateProgressivePath(detailedRoadCoords);
  };

  // Progressive Path Line Animator
  const animateProgressivePath = (coords: [number, number][]) => {
    if (progressiveTimerRef.current) clearInterval(progressiveTimerRef.current);
    setDrawnRouteCoords([]);
    let currentIdx = 0;
    const batchSize = Math.max(1, Math.floor(coords.length / 22));

    progressiveTimerRef.current = window.setInterval(() => {
      currentIdx += batchSize;
      const targetSlice = Math.min(coords.length, currentIdx + 1);
      setDrawnRouteCoords(coords.slice(0, targetSlice));
      soundFX.playStepSound(260 + (currentIdx % 10) * 15);

      if (currentIdx >= coords.length) {
        if (progressiveTimerRef.current) {
          clearInterval(progressiveTimerRef.current);
          progressiveTimerRef.current = null;
        }
        setDrawnRouteCoords(coords);
        soundFX.playSuccessSound();
      }
    }, 55);
  };

  // Delivery Courier Simulator along authentic road curve coordinates with bearing
  const handleSimulateDeliveryRide = () => {
    if (drawnRouteCoords.length < 2 || !routeCost) return;

    if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);

    setIsSimulating(true);
    setSimulationComplete(false);
    setOdometerKm(0);

    const stepsPerSegment = 8;
    const interpolated: { coord: [number, number]; streetName: string; speed: number; bearing: number }[] = [];

    for (let i = 0; i < activeRoutePath.length - 1; i++) {
      const u = activeRoutePath[i];
      const v = activeRoutePath[i + 1];
      const edge = edges.find(e => (e.from === u && e.to === v) || (e.from === v && e.to === u));
      const street = edge?.roadName || 'City Road Corridor';
      const baseSpeed = edge?.speedLimit || 50;
      const trafficFactor = edge?.traffic === 'high' ? 0.45 : edge?.traffic === 'medium' ? 0.75 : 1.0;
      const realSpeed = Math.round(baseSpeed * trafficFactor);

      const geom = edge?.geometry ? (
        edge.from === u ? [...edge.geometry] : [...edge.geometry].reverse()
      ) : [
        [nodes.find(n => n.id === u)!.lat, nodes.find(n => n.id === u)!.lng],
        [nodes.find(n => n.id === v)!.lat, nodes.find(n => n.id === v)!.lng]
      ] as [number, number][];

      for (let g = 0; g < geom.length - 1; g++) {
        const p1 = geom[g];
        const p2 = geom[g + 1];
        const bearing = getBearing(p1, p2);

        for (let s = 0; s < stepsPerSegment; s++) {
          const ratio = s / stepsPerSegment;
          const lat = p1[0] + (p2[0] - p1[0]) * ratio;
          const lng = p1[1] + (p2[1] - p1[1]) * ratio;
          interpolated.push({
            coord: [lat, lng],
            streetName: street,
            speed: realSpeed + (s % 3 === 0 ? 2 : -1),
            bearing
          });
        }
      }
    }

    if (interpolated.length === 0) return;

    let step = 0;
    const totalSteps = interpolated.length;

    simulationTimerRef.current = window.setInterval(() => {
      if (step >= totalSteps) {
        if (simulationTimerRef.current) {
          clearInterval(simulationTimerRef.current);
          simulationTimerRef.current = null;
        }
        setIsSimulating(false);
        setSimulationComplete(true);
        setOdometerKm(routeCost);
        setCurrentSpeed(0);
        soundFX.playSuccessSound();
        return;
      }

      const point = interpolated[step];
      setRiderPosition(point.coord);
      setRiderBearing(point.bearing);
      setCurrentStreetName(point.streetName);
      setCurrentSpeed(point.speed);
      
      const currentDist = (step / totalSteps) * routeCost;
      setOdometerKm(parseFloat(currentDist.toFixed(2)));

      if (step % 14 === 0) {
        soundFX.playStepSound(380 + (step % 20) * 8);
      }

      step++;
    }, 40);
  };

  // Detailed Step-by-Step Road Leg Breakdown
  const routeLegs = useMemo(() => {
    if (activeRoutePath.length < 2) return [];
    const legs: { 
      fromName: string; 
      toName: string; 
      distance: number; 
      traffic: string; 
      roadName: string;
      roadType: string;
      speedLimit: number;
    }[] = [];

    for (let i = 0; i < activeRoutePath.length - 1; i++) {
      const fromId = activeRoutePath[i];
      const toId = activeRoutePath[i + 1];
      const fromNode = nodes.find(n => n.id === fromId)!;
      const toNode = nodes.find(n => n.id === toId)!;

      const edge = edges.find(e => 
        (e.from === fromId && e.to === toId) || (e.from === toId && e.to === fromId)
      );

      legs.push({
        fromName: fromNode.name,
        toName: toNode.name,
        distance: edge ? edge.weight : 2.5,
        traffic: edge ? edge.traffic : 'low',
        roadName: edge?.roadName || 'City Connecting Arterial',
        roadType: edge?.roadType || 'arterial',
        speedLimit: edge?.speedLimit || 50
      });
    }
    return legs;
  }, [activeRoutePath, nodes, edges]);

  const estimatedMins = routeCost ? Math.round(routeCost * 2.1) : 0;

  // Preset Scenario Loader
  const handleLoadPreset = (from: string, to: string) => {
    if (progressiveTimerRef.current) clearInterval(progressiveTimerRef.current);
    if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);

    setStartNodeId(from);
    setTargetNodeId(to);
    setActiveRoutePath([]);
    setRouteCost(null);
    setDrawnRouteCoords([]);
    setRouteBounds(null);
    setIsSimulating(false);
    setRiderPosition(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Header Toolbar (City Switcher, Layer Toggles, Traffic Simulation) */}
      <div className="ui-panel p-4 rounded-xl flex flex-wrap justify-between items-center gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-brand-primary" />
            <h2 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
              Real-World GIS Street Navigation & Road Network
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Dijkstra & Traffic-Aware shortest path computation over authentic highway curves, expressways, and urban corridors.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* City Segmented Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-dark-900 p-0.5 rounded-lg border border-slate-200 dark:border-dark-800 text-xs">
            <button
              onClick={() => setCity('kanpur')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                city === 'kanpur'
                  ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white shadow-subtle font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Kanpur City
            </button>
            <button
              onClick={() => setCity('delhi')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                city === 'delhi'
                  ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white shadow-subtle font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Delhi NCR
            </button>
          </div>

          {/* Traffic Condition Preset */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-dark-900 p-0.5 rounded-lg border border-slate-200 dark:border-dark-800 text-xs">
            <button
              onClick={() => setTrafficMode('clear')}
              className={`px-2 py-1.5 rounded-md font-medium transition-colors ${
                trafficMode === 'clear'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              title="Clear Road Flow"
            >
              Clear
            </button>
            <button
              onClick={() => setTrafficMode('standard')}
              className={`px-2 py-1.5 rounded-md font-medium transition-colors ${
                trafficMode === 'standard'
                  ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white font-semibold shadow-subtle'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              title="Standard Traffic"
            >
              Normal
            </button>
            <button
              onClick={() => setTrafficMode('rush_hour')}
              className={`px-2 py-1.5 rounded-md font-medium transition-colors ${
                trafficMode === 'rush_hour'
                  ? 'bg-rose-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              title="Peak Rush Hour Gridlock"
            >
              Rush Hour
            </button>
          </div>

          {/* Map Layer Style Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-dark-900 p-0.5 rounded-lg border border-slate-200 dark:border-dark-800 text-xs">
            <button
              onClick={() => setTileStyle('standard')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                tileStyle === 'standard'
                  ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white shadow-subtle font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Streets
            </button>
            <button
              onClick={() => setTileStyle('voyager')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                tileStyle === 'voyager'
                  ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white shadow-subtle font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Voyager
            </button>
            <button
              onClick={() => setTileStyle('dark')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                tileStyle === 'dark'
                  ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white shadow-subtle font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTileStyle('satellite')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                tileStyle === 'satellite'
                  ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white shadow-subtle font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Satellite
            </button>
          </div>

          <button
            onClick={() => {
              if (progressiveTimerRef.current) clearInterval(progressiveTimerRef.current);
              if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);
              setActiveRoutePath([]);
              setRouteCost(null);
              setDrawnRouteCoords([]);
              setRouteBounds(null);
              setIsSimulating(false);
              setRiderPosition(null);
              setCurrentSpeed(0);
              setCurrentStreetName('');
              setSimulationComplete(false);
            }}
            className="p-2 rounded-lg bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-dark-800 transition-colors"
            title="Reset Map Route"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Main Map Viewport & Navigation Sidebar (Balanced 8 : 4 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Leaflet Cartographic Map Canvas (8 Columns) */}
        <div className="lg:col-span-8 ui-panel p-2.5 rounded-xl h-[600px] relative overflow-hidden transition-colors flex flex-col justify-between">
          
          <MapContainer
            key={`${city}-${tileStyle}`}
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', borderRadius: '0.65rem' }}
          >
            <MapController 
              center={center} 
              zoom={zoom} 
              cityKey={city} 
              routeBounds={routeBounds}
            />
            
            <TileLayer
              key={tileStyle}
              attribution={TILE_PROVIDERS[tileStyle].attribution}
              url={TILE_PROVIDERS[tileStyle].url}
              subdomains={TILE_PROVIDERS[tileStyle].subdomains || ['a', 'b', 'c']}
              maxZoom={19}
            />

            {/* Background Authentic Road Network: Dual-Casing Realistic Roads */}
            {edges.map((edge, idx) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const roadPositions = edge.geometry || [
                [fromNode.lat, fromNode.lng],
                [toNode.lat, toNode.lng]
              ];

              let trafficColor = '#10B981';
              let trafficLabel = 'Smooth Flow (Low)';
              if (edge.traffic === 'high') {
                trafficColor = '#EF4444';
                trafficLabel = 'Congested (High Traffic)';
              } else if (edge.traffic === 'medium') {
                trafficColor = '#F59E0B';
                trafficLabel = 'Moderate Traffic';
              }

              return (
                <React.Fragment key={`edge-${idx}`}>
                  {/* Layer A: Asphalt Base Road Bed */}
                  <Polyline
                    positions={roadPositions}
                    pathOptions={{ color: '#1E293B', weight: 6, opacity: 0.65 }}
                  />
                  {/* Layer B: Traffic-Colored Inner Road Surface */}
                  <Polyline
                    positions={roadPositions}
                    pathOptions={{ color: trafficColor, weight: 3, opacity: 0.85 }}
                  >
                    <Tooltip sticky>
                      <div className="text-[11px] font-sans p-1">
                        <strong className="block text-slate-900 font-bold">{edge.roadName || 'City Road'}</strong>
                        <div className="text-slate-600 mt-0.5">
                          Distance: <strong className="font-mono">{edge.weight} km</strong> • Limit: {edge.speedLimit || 50} km/h
                        </div>
                        <div className="text-xs mt-0.5 font-semibold" style={{ color: trafficColor }}>
                          {trafficLabel}
                        </div>
                      </div>
                    </Tooltip>
                  </Polyline>
                </React.Fragment>
              );
            })}

            {/* Active Shortest Route: Glowing Multi-Layer Highway Polyline along Real Curves */}
            {drawnRouteCoords.length > 1 && (
              <>
                {/* Layer 1: Ambient Road Glow */}
                <Polyline
                  positions={drawnRouteCoords}
                  pathOptions={{ color: '#4F46E5', weight: 12, opacity: 0.35 }}
                />
                {/* Layer 2: Core Route Polyline */}
                <Polyline
                  positions={drawnRouteCoords}
                  pathOptions={{ color: '#6366F1', weight: 6, opacity: 0.95 }}
                />
                {/* Layer 3: Flowing Directional Pulse Polyline */}
                <Polyline
                  className="leaflet-animated-route"
                  positions={drawnRouteCoords}
                  pathOptions={{ color: '#FFFFFF', weight: 2.5, opacity: 0.9, dashArray: '8, 14' }}
                />
              </>
            )}

            {/* Courier Rider Live Simulation Marker with Directional Bearing */}
            {riderPosition && (
              <Marker
                position={riderPosition}
                icon={createRiderMarker(riderBearing)}
                zIndexOffset={1000}
              />
            )}

            {/* City Hub Markers with Detailed Address & Landmark Popups */}
            {nodes.map(node => {
              const isStart = node.id === startNodeId;
              const isTarget = node.id === targetNodeId;
              const isInPath = activeRoutePath.includes(node.id);

              return (
                <Marker
                  key={node.id}
                  position={[node.lat, node.lng]}
                  icon={createHubMarker(node, isStart, isTarget, isInPath)}
                >
                  <Popup>
                    <div className="font-sans text-xs p-1 space-y-2 min-w-[190px]">
                      <div>
                        <strong className="text-slate-900 font-bold text-sm block">
                          {node.name}
                        </strong>
                        {node.address && (
                          <div className="text-slate-600 text-[11px] mt-0.5">
                            {node.address}
                          </div>
                        )}
                        {node.landmark && (
                          <div className="text-slate-500 text-[10px] italic mt-0.5">
                            Landmark: {node.landmark}
                          </div>
                        )}
                        <div className="text-slate-500 text-[11px] mt-1 capitalize flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-brand-primary" />
                          Category: <strong className="font-semibold text-slate-800">{node.type}</strong>
                        </div>
                      </div>

                      {/* 1-Click Interactive Pin Selection Buttons */}
                      <div className="flex gap-1.5 pt-2 border-t border-slate-200">
                        <button
                          onClick={() => {
                            setStartNodeId(node.id);
                            setActiveRoutePath([]);
                            setRouteCost(null);
                            setDrawnRouteCoords([]);
                            soundFX.playStepSound(320);
                          }}
                          className="flex-1 py-1 px-2 rounded bg-brand-emerald text-white text-[10px] font-semibold hover:bg-emerald-600 transition-colors cursor-pointer text-center"
                        >
                          Set Origin 🛵
                        </button>
                        <button
                          onClick={() => {
                            setTargetNodeId(node.id);
                            setActiveRoutePath([]);
                            setRouteCost(null);
                            setDrawnRouteCoords([]);
                            soundFX.playStepSound(340);
                          }}
                          className="flex-1 py-1 px-2 rounded bg-brand-rose text-white text-[10px] font-semibold hover:bg-rose-600 transition-colors cursor-pointer text-center"
                        >
                          Set Target 📦
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Map Overlay Badge: Active City & Traffic Mode */}
          <div className="absolute top-4 left-4 z-[400] bg-white/95 dark:bg-dark-900/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 dark:border-dark-800 text-[11px] font-mono shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
            <span className="font-bold text-slate-900 dark:text-white uppercase">{city} Real Road GIS</span>
            <span className="text-slate-400 capitalize">• {trafficMode.replace('_', ' ')} Traffic</span>
          </div>

          {/* Live In-Ride HUD (Speedometer & Street Name) */}
          {isSimulating && (
            <div className="absolute bottom-4 left-4 z-[400] bg-dark-950/90 text-white backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-brand-primary/40 shadow-xl flex items-center gap-4 text-xs font-mono animate-fade-in">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-brand-emerald animate-spin" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Speed</span>
                  <span className="text-base font-bold text-brand-emerald">{currentSpeed} km/h</span>
                </div>
              </div>
              <div className="h-6 w-px bg-slate-700" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-sans">Current Street</span>
                <span className="text-xs font-medium text-slate-200 truncate max-w-[200px] block">
                  {currentStreetName}
                </span>
              </div>
            </div>
          )}

          {/* Delivery Completion Badge */}
          {simulationComplete && (
            <div className="absolute bottom-4 right-4 z-[400] bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-bounce">
              <Award className="w-4 h-4" />
              <span>Package Delivered at Destination! 🎉</span>
            </div>
          )}
        </div>

        {/* Navigation & Dispatch Sidebar (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Dispatch Router Card */}
          <div className="ui-panel p-4 rounded-xl flex flex-col gap-3.5 transition-colors">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-200 dark:border-dark-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-brand-primary" />
                <span>GIS Real Road Dispatch</span>
              </div>
              <span className="text-[10px] text-brand-emerald font-mono font-semibold">Active</span>
            </h3>

            {/* Quick Route Presets */}
            <div className="flex flex-col gap-1.5 text-xs">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Quick Real-World Corridors:</span>
              <div className="flex flex-wrap gap-1">
                {city === 'kanpur' ? (
                  <>
                    <button
                      onClick={() => handleLoadPreset('psit', 'z_square')}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-dark-900 hover:bg-brand-primary/10 hover:text-brand-primary text-[11px] font-medium border border-slate-200 dark:border-dark-800 transition-colors"
                    >
                      PSIT ➔ Z Square Mall
                    </button>
                    <button
                      onClick={() => handleLoadPreset('iit_k', 'civil_lines')}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-dark-900 hover:bg-brand-primary/10 hover:text-brand-primary text-[11px] font-medium border border-slate-200 dark:border-dark-800 transition-colors"
                    >
                      IIT Kanpur ➔ Civil Lines
                    </button>
                    <button
                      onClick={() => handleLoadPreset('kalyanpur', 'govind_nagar')}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-dark-900 hover:bg-brand-primary/10 hover:text-brand-primary text-[11px] font-medium border border-slate-200 dark:border-dark-800 transition-colors"
                    >
                      Kalyanpur ➔ Govind Nagar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleLoadPreset('cp_hub', 'cyber_hub')}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-dark-900 hover:bg-brand-primary/10 hover:text-brand-primary text-[11px] font-medium border border-slate-200 dark:border-dark-800 transition-colors"
                    >
                      CP ➔ Cyber Hub (NH-48)
                    </button>
                    <button
                      onClick={() => handleLoadPreset('cp_hub', 'noida_sec18')}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-dark-900 hover:bg-brand-primary/10 hover:text-brand-primary text-[11px] font-medium border border-slate-200 dark:border-dark-800 transition-colors"
                    >
                      CP ➔ Noida (DND Flyway)
                    </button>
                    <button
                      onClick={() => handleLoadPreset('cp_hub', 'saket')}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-dark-900 hover:bg-brand-primary/10 hover:text-brand-primary text-[11px] font-medium border border-slate-200 dark:border-dark-800 transition-colors"
                    >
                      CP ➔ Saket Citywalk
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3 text-xs pt-1">
              {/* Origin Dropdown */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-500 uppercase flex items-center justify-between">
                  <span>Origin Location (Rider)</span>
                  <span className="text-brand-emerald font-semibold text-[10px]">Start 🛵</span>
                </label>
                <div className="relative">
                  <select
                    value={startNodeId}
                    onChange={(e) => setStartNodeId(e.target.value)}
                    className="w-full appearance-none bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-750 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary cursor-pointer pr-7"
                  >
                    {nodes.map(n => (
                      <option key={n.id} value={n.id}>{n.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Destination Dropdown */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-500 uppercase flex items-center justify-between">
                  <span>Destination Hub (Customer)</span>
                  <span className="text-brand-rose font-semibold text-[10px]">Dropoff 📦</span>
                </label>
                <div className="relative">
                  <select
                    value={targetNodeId}
                    onChange={(e) => setTargetNodeId(e.target.value)}
                    className="w-full appearance-none bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-750 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary cursor-pointer pr-7"
                  >
                    {nodes.map(n => (
                      <option key={n.id} value={n.id}>{n.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Routing Optimization Strategy */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-slate-500 uppercase">Routing Objective:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setRoutingAlgorithm('dijkstra')}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border text-center transition-all ${
                      routingAlgorithm === 'dijkstra'
                        ? 'bg-brand-primary text-white border-brand-primary font-semibold'
                        : 'bg-slate-50 dark:bg-dark-900 border-slate-200 dark:border-dark-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Shortest Distance
                  </button>
                  <button
                    onClick={() => setRoutingAlgorithm('traffic_aware')}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border text-center transition-all ${
                      routingAlgorithm === 'traffic_aware'
                        ? 'bg-brand-primary text-white border-brand-primary font-semibold'
                        : 'bg-slate-50 dark:bg-dark-900 border-slate-200 dark:border-dark-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Traffic-Optimized
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={handleComputeStreetRoute}
                  disabled={isCalculating}
                  className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm shadow-brand-primary/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Navigation className="w-3.5 h-3.5 fill-current" />
                  <span>{isCalculating ? 'Tracing Real Highway...' : 'Calculate Real Road Route'}</span>
                </button>

                {routeCost !== null && !isSimulating && (
                  <button
                    onClick={handleSimulateDeliveryRide}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer animate-fade-in"
                  >
                    <Truck className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Simulate Delivery Ride along Curves (🛵)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Live Courier Dispatch Odometer Progress */}
            {(isSimulating || simulationComplete) && (
              <div className="p-3 rounded-lg bg-brand-primary/10 border border-brand-primary/25 space-y-2 animate-fade-in">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-primary flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    {simulationComplete ? 'Delivery Delivered 🎉' : 'In Transit along Roads 🛵'}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {odometerKm} / {routeCost?.toFixed(2)} km
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-dark-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${Math.min(100, (odometerKm / (routeCost || 1)) * 100)}%` }} 
                    className="bg-brand-primary h-full rounded-full transition-all"
                  />
                </div>
              </div>
            )}

            {/* Route Distance & Timing Summary */}
            {routeCost !== null && (
              <div className="pt-2 border-t border-slate-200 dark:border-dark-800 space-y-2.5">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Street Distance</span>
                    <strong className="text-lg font-bold font-mono text-brand-primary block mt-0.5">{routeCost.toFixed(2)} km</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Estimated ETA</span>
                    <strong className="text-lg font-bold font-mono text-brand-emerald block mt-0.5">~{estimatedMins} mins</strong>
                  </div>
                </div>

                {/* Turn-by-Turn Real Street Corridor Breakdown */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase block">
                    Turn-by-Turn Real Street Navigation:
                  </span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {routeLegs.map((leg, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800 text-[11px] flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="w-4 h-4 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                              {i + 1}
                            </span>
                            <span className="font-semibold text-slate-900 dark:text-white truncate">
                              {leg.roadName}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-200 shrink-0">
                            {leg.distance} km
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pl-5">
                          <span>{leg.fromName} ➔ {leg.toName}</span>
                          <span className={`capitalize font-semibold ${
                            leg.traffic === 'high' ? 'text-rose-500' : leg.traffic === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                          }`}>
                            {leg.traffic} Traffic • {leg.speedLimit} km/h
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
