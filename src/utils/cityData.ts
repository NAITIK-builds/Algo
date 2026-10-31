import { CityHubNode, CityEdge } from '../types/routing';

export const KANPUR_CITY_NODES: CityHubNode[] = [
  { 
    id: 'psit', 
    name: 'PSIT College of Higher Education', 
    lat: 26.4499, 
    lng: 80.1928, 
    type: 'hub',
    address: 'NH-19, Bhauti, Kanpur, UP 209305',
    landmark: 'Campus Main Gate & Innovation Labs'
  },
  { 
    id: 'kalyanpur', 
    name: 'Kalyanpur Metro Hub', 
    lat: 26.4920, 
    lng: 80.2580, 
    type: 'restaurant',
    address: 'Grand Trunk Rd, Kalyanpur, Kanpur',
    landmark: 'Metro Orange Line Terminal & Cloud Kitchens'
  },
  { 
    id: 'iit_k', 
    name: 'IIT Kanpur Tech Hub', 
    lat: 26.5123, 
    lng: 80.2329, 
    type: 'customer',
    address: 'Kalyanpur-Bithoor Road, Kanpur',
    landmark: 'Academic Block & Innovation Incubation Center'
  },
  { 
    id: 'rawatpur', 
    name: 'Rawatpur Junction', 
    lat: 26.4800, 
    lng: 80.2980, 
    type: 'hub',
    address: 'GT Road / Kakadeo Crossing, Kanpur',
    landmark: 'Rawatpur Metro & Student Coaching Corridor'
  },
  { 
    id: 'swaroop', 
    name: 'Swaroop Nagar Food Street', 
    lat: 26.4750, 
    lng: 80.3150, 
    type: 'restaurant',
    address: 'Motijheel Road, Swaroop Nagar, Kanpur',
    landmark: 'Motijheel Park Gate 2 & Restaurant Row'
  },
  { 
    id: 'civil_lines', 
    name: 'Civil Lines Executive Zone', 
    lat: 26.4720, 
    lng: 80.3450, 
    type: 'customer',
    address: 'VIP Road / Green Park Avenue, Kanpur',
    landmark: 'Green Park International Stadium'
  },
  { 
    id: 'z_square', 
    name: 'Z Square Mall (Bada Chauraha)', 
    lat: 26.4670, 
    lng: 80.3520, 
    type: 'darkstore',
    address: '16/113, MG Road, Bada Chauraha, Kanpur',
    landmark: 'Delivery Logistics Bay & Mall Entrance'
  },
  { 
    id: 'parade', 
    name: 'Parade Market Dark Store', 
    lat: 26.4600, 
    lng: 80.3400, 
    type: 'darkstore',
    address: 'Naveen Market Express Lane, Parade, Kanpur',
    landmark: 'Parade Ground Wholesale Center'
  },
  { 
    id: 'govind_nagar', 
    name: 'Govind Nagar Commercial Hub', 
    lat: 26.4480, 
    lng: 80.3100, 
    type: 'customer',
    address: 'Dada Nagar Overbridge Corridor, Kanpur',
    landmark: 'Govind Nagar Market & Industrial Siding'
  },
];

export const KANPUR_CITY_EDGES: CityEdge[] = [
  { 
    from: 'psit', 
    to: 'kalyanpur', 
    weight: 8.4, 
    traffic: 'low',
    roadName: 'NH-19 & Panki-Kalyanpur Arterial',
    roadType: 'highway',
    speedLimit: 70,
    geometry: [
      [26.4499, 80.1928], // PSIT Main Gate
      [26.4518, 80.2035], // Bhauti Flyover
      [26.4542, 80.2185], // NH-19 Bypass
      [26.4590, 80.2310], // Panki Power House Crossing
      [26.4665, 80.2395], // Panki Industrial Bypass
      [26.4740, 80.2455], // Panki Railway Overbridge
      [26.4820, 80.2515], // Kalyanpur-Panki Link
      [26.4880, 80.2555], // Kalyanpur Market Curve
      [26.4920, 80.2580]  // Kalyanpur Metro Hub
    ]
  },
  { 
    from: 'kalyanpur', 
    to: 'iit_k', 
    weight: 4.6, 
    traffic: 'low',
    roadName: 'Kalyanpur-Bithoor Road',
    roadType: 'arterial',
    speedLimit: 50,
    geometry: [
      [26.4920, 80.2580], // Kalyanpur Metro
      [26.4965, 80.2530], // Kalyanpur Crossing
      [26.5015, 80.2450], // GT Road Turn
      [26.5058, 80.2395], // Bithoor Road Bend
      [26.5090, 80.2355], // Nankari Crossing
      [26.5123, 80.2329]  // IIT Kanpur Main Gate
    ]
  },
  { 
    from: 'kalyanpur', 
    to: 'rawatpur', 
    weight: 4.8, 
    traffic: 'medium',
    roadName: 'Grand Trunk Road (Metro Orange Corridor)',
    roadType: 'metro_corridor',
    speedLimit: 60,
    geometry: [
      [26.4920, 80.2580], // Kalyanpur Metro
      [26.4905, 80.2665], // SPM Hospital
      [26.4880, 80.2745], // Gurudev Palace Chauraha
      [26.4855, 80.2825], // Geeta Nagar Metro
      [26.4830, 80.2905], // Kakadeo Coaching Hub
      [26.4800, 80.2980]  // Rawatpur Junction
    ]
  },
  { 
    from: 'rawatpur', 
    to: 'swaroop', 
    weight: 2.2, 
    traffic: 'low',
    roadName: 'Motijheel Boulevard & Benajhabar',
    roadType: 'city_avenue',
    speedLimit: 45,
    geometry: [
      [26.4800, 80.2980], // Rawatpur
      [26.4788, 80.3035], // Motijheel Lake Entrance
      [26.4772, 80.3090], // Benajhabar Curve
      [26.4750, 80.3150]  // Swaroop Nagar Food Street
    ]
  },
  { 
    from: 'rawatpur', 
    to: 'govind_nagar', 
    weight: 4.1, 
    traffic: 'medium',
    roadName: 'Fazalganj & Dada Nagar Overbridge',
    roadType: 'arterial',
    speedLimit: 50,
    geometry: [
      [26.4800, 80.2980], // Rawatpur
      [26.4725, 80.3015], // Fazalganj Chauraha
      [26.4630, 80.3045], // Industrial Estate Road
      [26.4550, 80.3075], // Dada Nagar Overbridge
      [26.4480, 80.3100]  // Govind Nagar Commercial Hub
    ]
  },
  { 
    from: 'swaroop', 
    to: 'civil_lines', 
    weight: 3.2, 
    traffic: 'low',
    roadName: 'VIP Road & Green Park Avenue',
    roadType: 'city_avenue',
    speedLimit: 55,
    geometry: [
      [26.4750, 80.3150], // Swaroop Nagar
      [26.4745, 80.3235], // Khalasi Line Curve
      [26.4735, 80.3320], // VIP Road Straight
      [26.4725, 80.3395], // Green Park Stadium Bend
      [26.4720, 80.3450]  // Civil Lines Executive Zone
    ]
  },
  { 
    from: 'civil_lines', 
    to: 'z_square', 
    weight: 1.8, 
    traffic: 'high',
    roadName: 'Mahatma Gandhi (MG) Road',
    roadType: 'city_avenue',
    speedLimit: 40,
    geometry: [
      [26.4720, 80.3450], // Civil Lines
      [26.4700, 80.3475], // Commissioners Camp Office
      [26.4685, 80.3500], // Mall Road / MG Road Cross
      [26.4670, 80.3520]  // Z Square Mall (Bada Chauraha)
    ]
  },
  { 
    from: 'z_square', 
    to: 'parade', 
    weight: 1.4, 
    traffic: 'high',
    roadName: 'Naveen Market Express Corridor',
    roadType: 'arterial',
    speedLimit: 35,
    geometry: [
      [26.4670, 80.3520], // Z Square Mall
      [26.4650, 80.3485], // Bada Chauraha Clocktower
      [26.4625, 80.3440], // Naveen Market Lane
      [26.4600, 80.3400]  // Parade Market Dark Store
    ]
  },
  { 
    from: 'govind_nagar', 
    to: 'parade', 
    weight: 4.5, 
    traffic: 'medium',
    roadName: 'Juhi Bridge & Parade Link',
    roadType: 'arterial',
    speedLimit: 45,
    geometry: [
      [26.4480, 80.3100], // Govind Nagar
      [26.4520, 80.3200], // Nirala Nagar Curve
      [26.4555, 80.3285], // Juhi Overbridge
      [26.4585, 80.3355], // Parade South Approach
      [26.4600, 80.3400]  // Parade Market Dark Store
    ]
  },
  { 
    from: 'psit', 
    to: 'govind_nagar', 
    weight: 12.2, 
    traffic: 'low',
    roadName: 'NH-19 Southern Ring Expressway',
    roadType: 'highway',
    speedLimit: 80,
    geometry: [
      [26.4499, 80.1928], // PSIT
      [26.4475, 80.2200], // NH-19 South Bypass
      [26.4455, 80.2500], // Sachendi Junction
      [26.4462, 80.2800], // Dada Nagar Southern Link
      [26.4480, 80.3100]  // Govind Nagar Commercial Hub
    ]
  },
  { 
    from: 'swaroop', 
    to: 'z_square', 
    weight: 4.2, 
    traffic: 'medium',
    roadName: 'Harsh Nagar & Mall Road Direct',
    roadType: 'city_avenue',
    speedLimit: 45,
    geometry: [
      [26.4750, 80.3150], // Swaroop Nagar
      [26.4710, 80.3275], // Harsh Nagar Crossing
      [26.4682, 80.3390], // Phool Bagh Mall Approach
      [26.4670, 80.3520]  // Z Square Mall
    ]
  },
];

export const DELHI_CITY_NODES: CityHubNode[] = [
  { 
    id: 'cp_hub', 
    name: 'Connaught Place Central Hub', 
    lat: 28.6304, 
    lng: 77.2177, 
    type: 'darkstore',
    address: 'Outer Circle, Connaught Place, New Delhi',
    landmark: 'Rajiv Chowk Metro & Central Dispatch'
  },
  { 
    id: 'india_gate', 
    name: 'India Gate Delivery Corridor', 
    lat: 28.6129, 
    lng: 77.2295, 
    type: 'hub',
    address: 'Kartavya Path, India Gate, New Delhi',
    landmark: 'C-Hexagon & National War Memorial'
  },
  { 
    id: 'hauz_khas', 
    name: 'Hauz Khas Social Hub', 
    lat: 28.5494, 
    lng: 77.2001, 
    type: 'restaurant',
    address: 'Aurobindo Marg, Hauz Khas, New Delhi',
    landmark: 'Hauz Khas Village & Social Dining'
  },
  { 
    id: 'saket', 
    name: 'Saket Select Citywalk', 
    lat: 28.5284, 
    lng: 77.2192, 
    type: 'customer',
    address: 'A-3, District Centre, Saket, New Delhi',
    landmark: 'Select Citywalk Mall & DLF Avenue'
  },
  { 
    id: 'aerocity', 
    name: 'Aerocity Logistics Terminal', 
    lat: 28.5500, 
    lng: 77.1200, 
    type: 'darkstore',
    address: 'IGI Airport Hospitality District, New Delhi',
    landmark: 'Terminal 3 Gateway & Cargo Wing'
  },
  { 
    id: 'cyber_hub', 
    name: 'Gurugram DLF Cyber Hub', 
    lat: 28.4950, 
    lng: 77.0895, 
    type: 'restaurant',
    address: 'DLF Cyber City, Phase 2, Gurugram, Haryana',
    landmark: 'Cyber City Rapid Metro & Tech Park'
  },
  { 
    id: 'dwarka', 
    name: 'Dwarka Sector 21 Terminal', 
    lat: 28.5521, 
    lng: 77.0588, 
    type: 'customer',
    address: 'Sector 21 Metro Interchange, Dwarka, Delhi',
    landmark: 'Airport Express Metro Terminal'
  },
  { 
    id: 'noida_sec18', 
    name: 'Noida Sector 18 Commercial Hub', 
    lat: 28.5708, 
    lng: 77.3261, 
    type: 'restaurant',
    address: 'Atta Market, Sector 18, Noida, UP',
    landmark: 'DLF Mall of India & Metro Station'
  },
];

export const DELHI_CITY_EDGES: CityEdge[] = [
  { 
    from: 'cp_hub', 
    to: 'india_gate', 
    weight: 3.2, 
    traffic: 'medium',
    roadName: 'Janpath & Rajpath Boulevard',
    roadType: 'city_avenue',
    speedLimit: 50,
    geometry: [
      [28.6304, 77.2177], // CP
      [28.6250, 77.2190], // Janpath Market
      [28.6200, 77.2215], // Windsor Place Roundabout
      [28.6160, 77.2250], // Ashoka Road Junction
      [28.6129, 77.2295]  // India Gate C-Hexagon
    ]
  },
  { 
    from: 'india_gate', 
    to: 'hauz_khas', 
    weight: 7.8, 
    traffic: 'high',
    roadName: 'Aurobindo Marg & Lodhi Corridor',
    roadType: 'arterial',
    speedLimit: 60,
    geometry: [
      [28.6129, 77.2295], // India Gate
      [28.6060, 77.2270], // Shershah Road
      [28.5910, 77.2220], // Lodhi Road
      [28.5750, 77.2120], // Safdarjung / INA
      [28.5670, 77.2080], // AIIMS Flyover
      [28.5580, 77.2040], // Green Park
      [28.5494, 77.2001]  // Hauz Khas
    ]
  },
  { 
    from: 'hauz_khas', 
    to: 'saket', 
    weight: 3.4, 
    traffic: 'low',
    roadName: 'Aurobindo Marg & Press Enclave Expressway',
    roadType: 'arterial',
    speedLimit: 50,
    geometry: [
      [28.5494, 77.2001], // Hauz Khas
      [28.5430, 77.1980], // IIT Flyover
      [28.5380, 77.2050], // Adchini Crossing
      [28.5320, 77.2130], // Press Enclave Marg
      [28.5284, 77.2192]  // Saket Select Citywalk
    ]
  },
  { 
    from: 'cp_hub', 
    to: 'noida_sec18', 
    weight: 14.5, 
    traffic: 'high',
    roadName: 'Barakhamba & DND Flyway (Yamuna Expressway)',
    roadType: 'expressway',
    speedLimit: 80,
    geometry: [
      [28.6304, 77.2177], // CP
      [28.6270, 77.2250], // Barakhamba Road
      [28.6240, 77.2340], // Mandi House
      [28.6150, 77.2480], // Pragati Maidan
      [28.5880, 77.2560], // Sarai Kale Khan Ring Road
      [28.5780, 77.2750], // DND Flyway Toll Gate
      [28.5740, 77.2950], // DND Bridge over Yamuna River
      [28.5720, 77.3100], // Film City Sector 16A
      [28.5708, 77.3261]  // Noida Sector 18 Mall Hub
    ]
  },
  { 
    from: 'india_gate', 
    to: 'noida_sec18', 
    weight: 12.1, 
    traffic: 'medium',
    roadName: 'Purana Qila & DND Flyway',
    roadType: 'expressway',
    speedLimit: 80,
    geometry: [
      [28.6129, 77.2295], // India Gate
      [28.6080, 77.2420], // Purana Qila Road
      [28.5800, 77.2650], // DND Approach
      [28.5750, 77.2900], // DND Bridge
      [28.5708, 77.3261]  // Sector 18 Noida
    ]
  },
  { 
    from: 'cp_hub', 
    to: 'aerocity', 
    weight: 13.8, 
    traffic: 'medium',
    roadName: 'Sardar Patel Marg & NH-48 Expressway',
    roadType: 'expressway',
    speedLimit: 70,
    geometry: [
      [28.6304, 77.2177], // CP
      [28.6250, 77.2080], // Baba Kharak Singh Marg
      [28.5980, 77.1750], // Sardar Patel Marg
      [28.5920, 77.1580], // Dhaula Kuan Multi-level
      [28.5720, 77.1350], // NH-48 Airport Highway
      [28.5500, 77.1200]  // Aerocity Logistics Hub
    ]
  },
  { 
    from: 'aerocity', 
    to: 'cyber_hub', 
    weight: 8.6, 
    traffic: 'low',
    roadName: 'NH-48 Delhi-Gurgaon Expressway',
    roadType: 'expressway',
    speedLimit: 80,
    geometry: [
      [28.5500, 77.1200], // Aerocity
      [28.5300, 77.1080], // Mahipalpur Flyover
      [28.5080, 77.0980], // Sirhaul Border Toll
      [28.4950, 77.0895]  // DLF Cyber Hub
    ]
  },
  { 
    from: 'aerocity', 
    to: 'dwarka', 
    weight: 6.2, 
    traffic: 'low',
    roadName: 'Airport Tunnel & UER-II Corridor',
    roadType: 'expressway',
    speedLimit: 65,
    geometry: [
      [28.5500, 77.1200], // Aerocity
      [28.5550, 77.0950], // Northern Access Road
      [28.5560, 77.0750], // Urban Extension Road
      [28.5521, 77.0588]  // Dwarka Sector 21 Terminal
    ]
  },
  { 
    from: 'cyber_hub', 
    to: 'dwarka', 
    weight: 11.4, 
    traffic: 'medium',
    roadName: 'Dwarka Expressway & Kapashera Link',
    roadType: 'expressway',
    speedLimit: 60,
    geometry: [
      [28.4950, 77.0895], // Cyber Hub
      [28.5150, 77.0780], // Kapashera Border
      [28.5380, 77.0680], // Dwarka Link Road
      [28.5521, 77.0588]  // Dwarka Sector 21
    ]
  },
  { 
    from: 'saket', 
    to: 'cyber_hub', 
    weight: 16.2, 
    traffic: 'high',
    roadName: 'Mehrauli-Gurgaon (MG) Road',
    roadType: 'arterial',
    speedLimit: 60,
    geometry: [
      [28.5284, 77.2192], // Saket
      [28.5200, 77.1850], // Mehrauli Badarpur Rd
      [28.5180, 77.1700], // Qutub Minar Bypass
      [28.5020, 77.1250], // MG Road Sultanpur
      [28.4950, 77.0895]  // DLF Cyber Hub
    ]
  },
];
