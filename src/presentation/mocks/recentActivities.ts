export type ActivityCategory =
  | 'Transporte'
  | 'Comida'
  | 'Ingreso'
  | 'Hogar'
  | 'Entretenimiento'
  | 'Salud'
  | 'Compras'
  | 'Servicios';

export type ActivityType = 'expense' | 'income';

export interface Activity {
  id: string;
  name: string;
  category: ActivityCategory;
  type: ActivityType;
  amount: number;
  date: Date;
}

const today = new Date();
const h = (hours: number, minutes = 0): Date => {
  const d = new Date(today);
  d.setHours(hours, minutes, 0, 0);
  return d;
};
const daysAgo = (days: number): Date => {
  const d = new Date(today);
  d.setDate(d.getDate() - days);
  d.setHours(10, 0, 0, 0);
  return d;
};

export const recentActivities: Activity[] = [
  {
    id: '1',
    name: 'Uber Ride',
    category: 'Transporte',
    type: 'expense',
    amount: 4.5,
    date: h(8, 15),
  },
  {
    id: '2',
    name: 'Almuerzo Oficina',
    category: 'Comida',
    type: 'expense',
    amount: 12.0,
    date: h(12, 30),
  },
  {
    id: '3',
    name: 'Pago Freelance',
    category: 'Ingreso',
    type: 'income',
    amount: 250.0,
    date: h(9, 0),
  },
  {
    id: '4',
    name: 'Netflix',
    category: 'Entretenimiento',
    type: 'expense',
    amount: 15.99,
    date: h(7, 0),
  },
  {
    id: '5',
    name: 'Farmacia',
    category: 'Salud',
    type: 'expense',
    amount: 8.75,
    date: h(14, 20),
  },
  {
    id: '6',
    name: 'Supermercado',
    category: 'Compras',
    type: 'expense',
    amount: 45.3,
    date: daysAgo(1),
  },
  {
    id: '7',
    name: 'Internet CANTV',
    category: 'Servicios',
    type: 'expense',
    amount: 10.0,
    date: daysAgo(1),
  },
  {
    id: '8',
    name: 'Gasolina',
    category: 'Transporte',
    type: 'expense',
    amount: 1.5,
    date: daysAgo(2),
  },
  {
    id: '9',
    name: 'Transferencia Recibida',
    category: 'Ingreso',
    type: 'income',
    amount: 100.0,
    date: daysAgo(2),
  },
  {
    id: '10',
    name: 'Pizza Delivery',
    category: 'Comida',
    type: 'expense',
    amount: 18.0,
    date: daysAgo(3),
  },
  {
    id: '11',
    name: 'Alquiler',
    category: 'Hogar',
    type: 'expense',
    amount: 350.0,
    date: daysAgo(4),
  },
  {
    id: '12',
    name: 'Spotify',
    category: 'Entretenimiento',
    type: 'expense',
    amount: 5.99,
    date: daysAgo(5),
  },
  {
    id: '13',
    name: 'Consulta Médica',
    category: 'Salud',
    type: 'expense',
    amount: 30.0,
    date: daysAgo(6),
  },
  {
    id: '14',
    name: 'Sueldo Quincenal',
    category: 'Ingreso',
    type: 'income',
    amount: 800.0,
    date: daysAgo(7),
  },
  {
    id: '15',
    name: 'Taxi al Centro',
    category: 'Transporte',
    type: 'expense',
    amount: 3.0,
    date: daysAgo(8),
  },
  {
    id: '16',
    name: 'Café & Snack',
    category: 'Comida',
    type: 'expense',
    amount: 6.5,
    date: daysAgo(10),
  },
  {
    id: '17',
    name: 'Reparación Tubería',
    category: 'Hogar',
    type: 'expense',
    amount: 25.0,
    date: daysAgo(12),
  },
  {
    id: '18',
    name: 'Ropa Online',
    category: 'Compras',
    type: 'expense',
    amount: 42.0,
    date: daysAgo(15),
  },
  {
    id: '19',
    name: 'Electricidad',
    category: 'Servicios',
    type: 'expense',
    amount: 20.0,
    date: daysAgo(20),
  },
  {
    id: '20',
    name: 'Bonus Proyecto',
    category: 'Ingreso',
    type: 'income',
    amount: 150.0,
    date: daysAgo(25),
  },
];
