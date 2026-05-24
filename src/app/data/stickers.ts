export interface Sticker {
  id: number;
  number: string;
  section: string;
  country: string;
  group: string;
  type: 'especiales_1' | 'escudo' | 'equipo' | 'jugador' | 'estadio' | 'COCA_COLA';
  description: string;
}

interface Team {
  code: string;
  country: string;
  group: string;
}

const teams: Team[] = [
  { code: 'MEX', country: 'México', group: 'A' },
  { code: 'RSA', country: 'South Africa', group: 'A' },
  { code: 'KOR', country: 'Korea Republic', group: 'A' },
  { code: 'CZE', country: 'Czechia', group: 'A' },

  { code: 'CAN', country: 'Canada', group: 'B' },
  { code: 'BIH', country: 'Bosnia-Herzegovina', group: 'B' },
  { code: 'QAT', country: 'Qatar', group: 'B' },
  { code: 'SUI', country: 'Switzerland', group: 'B' },

  { code: 'BRA', country: 'Brazil', group: 'C' },
  { code: 'MAR', country: 'Morocco', group: 'C' },
  { code: 'HAI', country: 'Haiti', group: 'C' },
  { code: 'SCO', country: 'Scotland', group: 'C' },

  { code: 'USA', country: 'USA', group: 'D' },
  { code: 'PAR', country: 'Paraguay', group: 'D' },
  { code: 'AUS', country: 'Australia', group: 'D' },
  { code: 'TUR', country: 'Türkiye', group: 'D' },

  { code: 'GER', country: 'Germany', group: 'E' },
  { code: 'CUW', country: 'Curaçao', group: 'E' },
  { code: 'CIV', country: "Côte d'Ivoire", group: 'E' },
  { code: 'ECU', country: 'Ecuador', group: 'E' },

  { code: 'NED', country: 'Netherlands', group: 'F' },
  { code: 'JPN', country: 'Japan', group: 'F' },
  { code: 'SWE', country: 'Sweden', group: 'F' },
  { code: 'TUN', country: 'Tunisia', group: 'F' },

  { code: 'BEL', country: 'Belgium', group: 'G' },
  { code: 'EGY', country: 'Egypt', group: 'G' },
  { code: 'IRN', country: 'IR Iran', group: 'G' },
  { code: 'NZL', country: 'New Zealand', group: 'G' },

  { code: 'ESP', country: 'Spain', group: 'H' },
  { code: 'CPV', country: 'Cabo Verde', group: 'H' },
  { code: 'KSA', country: 'Saudi Arabia', group: 'H' },
  { code: 'URU', country: 'Uruguay', group: 'H' },

  { code: 'FRA', country: 'France', group: 'I' },
  { code: 'SEN', country: 'Senegal', group: 'I' },
  { code: 'IRQ', country: 'Iraq', group: 'I' },
  { code: 'NOR', country: 'Norway', group: 'I' },

  { code: 'ARG', country: 'Argentina', group: 'J' },
  { code: 'ALG', country: 'Algeria', group: 'J' },
  { code: 'AUT', country: 'Austria', group: 'J' },
  { code: 'JOR', country: 'Jordan', group: 'J' },

  { code: 'POR', country: 'Portugal', group: 'K' },
  { code: 'COD', country: 'Congo DR', group: 'K' },
  { code: 'UZB', country: 'Uzbekistan', group: 'K' },
  { code: 'COL', country: 'Colombia', group: 'K' },

  { code: 'ENG', country: 'England', group: 'L' },
  { code: 'CRO', country: 'Croatia', group: 'L' },
  { code: 'GHA', country: 'Ghana', group: 'L' },
  { code: 'PAN', country: 'Panama', group: 'L' },
];

export const stickersData: Sticker[] = [
  {
    id: 1,
    number: '00',
    section: 'Introducción',
    country: 'Mundial',
    group: '',
    type: 'especiales_1',
    description: 'Especial'
  },

  ...Array.from({ length: 19 }, (_, i) => ({
    id: i + 2,
    number: `FWC${i + 1}`,
    section: 'Copa del Mundo',
    country: 'Mundial',
    group: '',
    type: 'especiales_1' as const,
    description: `FWC${i + 1}`
  })),

  ...Array.from({ length: 14 }, (_, i) => ({
    id: i + 2,
    number: `CC${i + 1}`,
    section: 'Coca Cola',
    country: 'Coca Cola',
    group: '',
    type: 'COCA_COLA' as const,
    description: `FWC${i + 1}`
  })),

  ...teams.flatMap((team, teamIndex) =>
    Array.from({ length: 20 }, (_, i) => ({
      id: 19 + teamIndex * 20 + i,
      number: `${team.code}${i + 1}`,
      section: `Grupo ${team.group}`,
      country: team.country,
      group: team.group,
      type: i === 0 ? 'escudo' as const : i === 1 ? 'equipo' as const : 'jugador' as const,
      description: i === 0 ? 'Escudo' : i === 1 ? 'Equipo' : 'Jugador'
    }))
  )
];

export const getSections = () => {
  return Array.from(new Set(stickersData.map(s => s.section))).sort();
};

export const getCountries = () => {
  return Array.from(new Set(stickersData.map(s => s.country))).sort();
};

export const getGroups = () => {
  return Array.from(
    new Set(stickersData.map(s => s.group).filter(g => g !== ''))
  ).sort();
};