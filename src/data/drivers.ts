export interface Driver {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    rating: number;
    deliveries: number;
    status: 'available' | 'delivering' | 'offline';
    vehicle: string;
    latitude: number;
    longitude: number;
    eta?: number; // minutes
  }
  
  export const DRIVERS: Driver[] = [
    {
      id: 'd1', name: 'Marco Rossi', avatar: 'https://i.pravatar.cc/100?img=3',
      phone: '+48 600 100 200', rating: 4.9, deliveries: 1243,
      status: 'delivering', vehicle: 'Scooter · KR 12345',
      latitude: 52.237049, longitude: 21.017532, eta: 8,
    },
    {
      id: 'd2', name: 'Anna Kowalska', avatar: 'https://i.pravatar.cc/100?img=9',
      phone: '+48 600 200 300', rating: 4.7, deliveries: 876,
      status: 'available', vehicle: 'E-bike',
      latitude: 52.229676, longitude: 21.012229,
    },
    {
      id: 'd3', name: 'Piotr Wiśniewski', avatar: 'https://i.pravatar.cc/100?img=11',
      phone: '+48 600 300 400', rating: 4.8, deliveries: 2011,
      status: 'delivering', vehicle: 'Scooter · WA 99887',
      latitude: 52.240137, longitude: 21.024681, eta: 15,
    },
    {
      id: 'd4', name: 'Karolina Nowak', avatar: 'https://i.pravatar.cc/100?img=5',
      phone: '+48 600 400 500', rating: 4.6, deliveries: 534,
      status: 'offline', vehicle: 'E-bike',
      latitude: 52.233541, longitude: 21.009421,
    },
  ];