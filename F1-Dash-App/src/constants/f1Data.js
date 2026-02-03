// constants/f1Data.js
// Shared F1 2026 data constants

export const TEAM_COLORS = {
    'Red Bull Racing': '#3671C6',
    'Ferrari': '#E8002D',
    'McLaren': '#FF8000',
    'Mercedes': '#27F4D2',
    'Aston Martin': '#229971',
    'Alpine': '#FF87BC',
    'Williams': '#64C4FF',
    'RB': '#6692FF',
    'Kick Sauber': '#52E252',
    'Haas': '#B6BABD',
};

export const F1_2026_TEAMS = [
    { name: 'McLaren', color: '#FF8000', gradientFrom: '#FF8000', gradientTo: '#FF6000', drivers: ['Lando Norris', 'Oscar Piastri'], country: '🇬🇧' },
    { name: 'Mercedes', color: '#27F4D2', gradientFrom: '#27F4D2', gradientTo: '#1AB5A0', drivers: ['George Russell', 'Andrea Kimi Antonelli'], country: '🇩🇪' },
    { name: 'Red Bull Racing', color: '#3671C6', gradientFrom: '#3671C6', gradientTo: '#1E3A5F', drivers: ['Max Verstappen', 'Liam Lawson'], country: '🇦🇹' },
    { name: 'Ferrari', color: '#E8002D', gradientFrom: '#E8002D', gradientTo: '#A50020', drivers: ['Charles Leclerc', 'Lewis Hamilton'], country: '🇮🇹' },
    { name: 'Williams', color: '#64C4FF', gradientFrom: '#64C4FF', gradientTo: '#3A8FD1', drivers: ['Alex Albon', 'Carlos Sainz'], country: '🇬🇧' },
    { name: 'RB', color: '#6692FF', gradientFrom: '#6692FF', gradientTo: '#4A6FCC', drivers: ['Yuki Tsunoda', 'Isack Hadjar'], country: '🇮🇹' },
    { name: 'Aston Martin', color: '#229971', gradientFrom: '#229971', gradientTo: '#1A7A5A', drivers: ['Fernando Alonso', 'Lance Stroll'], country: '🇬🇧' },
    { name: 'Alpine', color: '#FF87BC', gradientFrom: '#FF87BC', gradientTo: '#E05A9A', drivers: ['Pierre Gasly', 'Jack Doohan'], country: '🇫🇷' },
    { name: 'Kick Sauber', color: '#52E252', gradientFrom: '#52E252', gradientTo: '#3AB83A', drivers: ['Nico Hulkenberg', 'Gabriel Bortoleto'], country: '🇨🇭' },
    { name: 'Haas', color: '#B6BABD', gradientFrom: '#B6BABD', gradientTo: '#8A8D90', drivers: ['Esteban Ocon', 'Oliver Bearman'], country: '🇺🇸' },
];

export const F1_2026_DRIVERS = [
    { name: 'Max Verstappen', team: 'Red Bull Racing', code: 'VER', country: '🇳🇱' },
    { name: 'Liam Lawson', team: 'Red Bull Racing', code: 'LAW', country: '🇳🇿' },
    { name: 'Charles Leclerc', team: 'Ferrari', code: 'LEC', country: '🇲🇨' },
    { name: 'Lewis Hamilton', team: 'Ferrari', code: 'HAM', country: '🇬🇧' },
    { name: 'Lando Norris', team: 'McLaren', code: 'NOR', country: '🇬🇧' },
    { name: 'Oscar Piastri', team: 'McLaren', code: 'PIA', country: '🇦🇺' },
    { name: 'George Russell', team: 'Mercedes', code: 'RUS', country: '🇬🇧' },
    { name: 'Andrea Kimi Antonelli', team: 'Mercedes', code: 'ANT', country: '🇮🇹' },
    { name: 'Fernando Alonso', team: 'Aston Martin', code: 'ALO', country: '🇪🇸' },
    { name: 'Lance Stroll', team: 'Aston Martin', code: 'STR', country: '🇨🇦' },
    { name: 'Pierre Gasly', team: 'Alpine', code: 'GAS', country: '🇫🇷' },
    { name: 'Jack Doohan', team: 'Alpine', code: 'DOO', country: '🇦🇺' },
    { name: 'Alex Albon', team: 'Williams', code: 'ALB', country: '🇹🇭' },
    { name: 'Carlos Sainz', team: 'Williams', code: 'SAI', country: '🇪🇸' },
    { name: 'Yuki Tsunoda', team: 'RB', code: 'TSU', country: '🇯🇵' },
    { name: 'Isack Hadjar', team: 'RB', code: 'HAD', country: '🇫🇷' },
    { name: 'Nico Hulkenberg', team: 'Kick Sauber', code: 'HUL', country: '🇩🇪' },
    { name: 'Gabriel Bortoleto', team: 'Kick Sauber', code: 'BOR', country: '🇧🇷' },
    { name: 'Esteban Ocon', team: 'Haas', code: 'OCO', country: '🇫🇷' },
    { name: 'Oliver Bearman', team: 'Haas', code: 'BEA', country: '🇬🇧' },
];
