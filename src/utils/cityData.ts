import { CityHubNode, CityEdge } from '../types/routing';

export const KANPUR_CITY_NODES: CityHubNode[] = [
  { id: 'hub_main', name: 'Zomato Dark Store (Mall Road)', lat: 26.4670, lng: 80.3500, type: 'darkstore' },
  { id: 'iit_k', name: 'IIT Kanpur Hub', lat: 26.5123, lng: 80.2329, type: 'customer' },
  { id: 'parade', name: 'Parade Market Food Hub', lat: 26.4600, lng: 80.3400, type: 'restaurant' },
  { id: 'swaroop', name: 'Swaroop Nagar Delivery Zone', lat: 26.4750, lng: 80.3150, type: 'customer' },
  { id: 'civil_lines', name: 'Civil Lines Executive Hub', lat: 26.4700, lng: 80.3450, type: 'hub' },
  { id: 'kalyanpur', name: 'Kalyanpur Express Hub', lat: 26.4950, lng: 80.2580, type: 'restaurant' },
];

export const KANPUR_CITY_EDGES: CityEdge[] = [
  { from: 'hub_main', to: 'civil_lines', weight: 3.2, traffic: 'low' },
  { from: 'civil_lines', to: 'parade', weight: 2.1, traffic: 'medium' },
  { from: 'civil_lines', to: 'swaroop', weight: 4.5, traffic: 'low' },
  { from: 'swaroop', to: 'kalyanpur', weight: 8.0, traffic: 'high' },
  { from: 'kalyanpur', to: 'iit_k', weight: 5.4, traffic: 'low' },
  { from: 'hub_main', to: 'parade', weight: 1.8, traffic: 'low' },
];

export const DELHI_CITY_NODES: CityHubNode[] = [
  { id: 'cp_hub', name: 'Connaught Place Mega Hub', lat: 28.6304, lng: 77.2177, type: 'darkstore' },
  { id: 'cyber_hub', name: 'Gurugram Cyber Hub', lat: 28.4950, lng: 77.0895, type: 'restaurant' },
  { id: 'saket', name: 'Saket Select City', lat: 28.5284, lng: 77.2192, type: 'customer' },
  { id: 'noida_sec18', name: 'Noida Sector 18 Hub', lat: 28.5708, lng: 77.3261, type: 'restaurant' },
  { id: 'dwarka', name: 'Dwarka Sector 21', lat: 28.5521, lng: 77.0588, type: 'customer' },
];

export const DELHI_CITY_EDGES: CityEdge[] = [
  { from: 'cp_hub', to: 'saket', weight: 14.5, traffic: 'high' },
  { from: 'cp_hub', to: 'noida_sec18', weight: 16.2, traffic: 'medium' },
  { from: 'saket', to: 'cyber_hub', weight: 18.0, traffic: 'high' },
  { from: 'cyber_hub', to: 'dwarka', weight: 12.4, traffic: 'low' },
];
