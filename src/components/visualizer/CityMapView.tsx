import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { KANPUR_CITY_NODES, KANPUR_CITY_EDGES, DELHI_CITY_NODES, DELHI_CITY_EDGES } from '../../utils/cityData';
import { Compass } from 'lucide-react';
import L from 'leaflet';
import { soundFX } from '../../utils/SoundFX';

// Custom neon marker creator
const createCustomMarker = (type: 'darkstore' | 'restaurant' | 'customer' | 'hub', label: string, isSelected: boolean) => {
  let bg = '#10B981'; // emerald
  let border = '#6EE7B7';
  if (type === 'darkstore') {
    bg = '#06B6D4';
    border = '#67E8F9';
  } else if (type === 'restaurant') {
    bg = '#F59E0B';
    border = '#FCD34D';
  } else if (type === 'customer') {
    bg = '#F43F5E';
    border = '#FDA4AF';
  }

  const ringStyle = isSelected ? 'box-shadow: 0 0 16px 2px ' + bg + ';' : '';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="background-color: #0D1117; color: #F1F5F9; border: 2px solid ${border}; ${ringStyle} border-radius: 8px; padding: 3px 8px; font-family: monospace; font-size: 11px; font-weight: bold; white-space: nowrap; display: flex; align-items: center; gap: 5px;">
      <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${bg};"></span>
      ${label}
    </div>`,
    iconSize: [110, 28],
    iconAnchor: [55, 14]
  });
};

// Map Recenter Component
const MapRecenter: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.flyTo(center, zoom, { duration: 1.5 });
  return null;
};

export const CityMapView: React.FC = () => {
  const [city, setCity] = useState<'kanpur' | 'delhi'>('kanpur');
  const [startNodeId, setStartNodeId] = useState<string>('');
  const [targetNodeId, setTargetNodeId] = useState<string>('');
  const [activeRoutePath, setActiveRoutePath] = useState<string[]>([]);
  const [routeCost, setRouteCost] = useState<number | null>(null);

  const nodes = city === 'kanpur' ? KANPUR_CITY_NODES : DELHI_CITY_NODES;
  const edges = city === 'kanpur' ? KANPUR_CITY_EDGES : DELHI_CITY_EDGES;

  const center: [number, number] = city === 'kanpur' ? [26.4700, 80.3200] : [28.5800, 77.2000];

  const handleComputeStreetRoute = () => {
    if (!startNodeId || !targetNodeId || startNodeId === targetNodeId) {
      alert('Please select two distinct hubs (Origin & Destination) to calculate the shortest street route.');
      return;
    }

    soundFX.playSuccessSound();

    // Simple Graph Dijkstra over city graph
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
          const alt = distances[currentId] + e.weight;
          if (alt < distances[neighborId]) {
            distances[neighborId] = alt;
            previous[neighborId] = currentId;
          }
        }
      });
    }

    // Reconstruct path
    const path: string[] = [];
    let curr: string | null = targetNodeId;
    while (curr) {
      path.unshift(curr);
      curr = previous[curr];
    }

    if (path.length > 1 && path[0] === startNodeId) {
      setActiveRoutePath(path);
      setRouteCost(distances[targetNodeId]);
    } else {
      alert('No direct road connectivity found between these two hubs in current city graph.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-wrap justify-between items-center gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
              <Compass className="w-4 h-4" />
            </span>
            <h2 className="font-mono text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              REAL-WORLD CITY STREET ROUTE NAVIGATOR
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
            Interactive road graph pathfinding across darkstore hubs, cloud kitchens, and customer destinations in real metro coordinates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setCity('kanpur'); setActiveRoutePath([]); setRouteCost(null); }}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
              city === 'kanpur'
                ? 'bg-brand-cyan text-dark-950 shadow-glow-cyan/30 shadow-md'
                : 'bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
            }`}
          >
            📍 Kanpur Logistics Metro
          </button>
          <button
            onClick={() => { setCity('delhi'); setActiveRoutePath([]); setRouteCost(null); }}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
              city === 'delhi'
                ? 'bg-brand-cyan text-dark-950 shadow-glow-cyan/30 shadow-md'
                : 'bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
            }`}
          >
            📍 Delhi NCR Metro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Leaflet Dark / Light Map Renderer */}
        <div className="lg:col-span-3 glass-panel p-2 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark h-[520px] relative overflow-hidden transition-colors">
          <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
          >
            <MapRecenter center={center} zoom={city === 'kanpur' ? 12 : 11} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render Street Edges as Polylines */}
            {edges.map((edge, idx) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              return (
                <Polyline
                  key={idx}
                  positions={[[fromNode.lat, fromNode.lng], [toNode.lat, toNode.lng]]}
                  pathOptions={{ color: 'rgba(99, 102, 241, 0.4)', weight: 3, dashArray: '4, 4' }}
                />
              );
            })}

            {/* Render Active Calculated Optimal Route in Neon Cyan */}
            {activeRoutePath.length > 1 && (
              <Polyline
                positions={activeRoutePath.map(id => {
                  const n = nodes.find(node => node.id === id)!;
                  return [n.lat, n.lng];
                })}
                pathOptions={{ color: '#06B6D4', weight: 6, opacity: 0.9 }}
              />
            )}

            {/* Render Nodes */}
            {nodes.map(node => {
              const isSelected = node.id === startNodeId || node.id === targetNodeId || activeRoutePath.includes(node.id);
              return (
                <Marker
                  key={node.id}
                  position={[node.lat, node.lng]}
                  icon={createCustomMarker(node.type, node.name, isSelected)}
                  eventHandlers={{
                    click: () => {
                      if (!startNodeId) setStartNodeId(node.id);
                      else if (!targetNodeId && node.id !== startNodeId) setTargetNodeId(node.id);
                      else {
                        setStartNodeId(node.id);
                        setTargetNodeId('');
                        setActiveRoutePath([]);
                      }
                    }
                  }}
                >
                  <Popup>
                    <div className="font-mono text-xs">
                      <strong className="text-slate-900 dark:text-white text-sm">{node.name}</strong>
                      <br />
                      <span className="text-slate-500 dark:text-slate-400">HUB CATEGORY:</span> <strong className="text-brand-cyan uppercase">{node.type}</strong>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Street Route Planning & Hub Specs */}
        <div className="flex flex-col gap-4">
          <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-col gap-3 transition-colors">
            <h3 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-200 dark:border-white/10">
              DISPATCH ROUTE CALCULATOR
            </h3>

            <div className="space-y-2">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono font-bold text-brand-emerald uppercase">ORIGIN (START HUB)</label>
                <select
                  value={startNodeId}
                  onChange={(e) => { setStartNodeId(e.target.value); setActiveRoutePath([]); }}
                  className="bg-white dark:bg-dark-900 border border-slate-300 dark:border-white/15 rounded-xl font-mono text-xs font-semibold p-2 text-slate-800 dark:text-slate-100 focus:outline-none shadow-sm"
                >
                  <option value="">-- Select Origin Hub --</option>
                  {nodes.map(n => (
                    <option key={n.id} value={n.id}>{n.name} ({n.type.toUpperCase()})</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono font-bold text-brand-rose uppercase">DESTINATION (TARGET HUB)</label>
                <select
                  value={targetNodeId}
                  onChange={(e) => { setTargetNodeId(e.target.value); setActiveRoutePath([]); }}
                  className="bg-white dark:bg-dark-900 border border-slate-300 dark:border-white/15 rounded-xl font-mono text-xs font-semibold p-2 text-slate-800 dark:text-slate-100 focus:outline-none shadow-sm"
                >
                  <option value="">-- Select Target Destination --</option>
                  {nodes.map(n => (
                    <option key={n.id} value={n.id}>{n.name} ({n.type.toUpperCase()})</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleComputeStreetRoute}
                className="w-full mt-2 py-2.5 bg-gradient-to-r from-brand-cyan to-brand-indigo text-dark-950 font-mono font-extrabold text-xs rounded-xl shadow-glow-cyan/20 shadow-md hover:brightness-110 transition-all uppercase cursor-pointer"
              >
                COMPUTE REAL STREET ROUTE
              </button>
            </div>

            {routeCost !== null && (
              <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl border border-brand-cyan/30 mt-2 font-mono text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">ESTIMATED TRAVEL DISTANCE:</span>
                  <strong className="text-brand-cyan font-bold">{routeCost} km</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">WAYPOINTS TRAVERSED:</span>
                  <strong className="text-brand-emerald font-bold">{activeRoutePath.length} stops</strong>
                </div>
              </div>
            )}
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark font-mono text-xs space-y-2 transition-colors">
            <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">HUB NETWORK LEGEND</h4>
            <div className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-cyan inline-block"></span>
                <span>Darkstore & Logistics Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-amber inline-block"></span>
                <span>Cloud Kitchen / Restaurant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-rose inline-block"></span>
                <span>Customer Delivery Zone</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
