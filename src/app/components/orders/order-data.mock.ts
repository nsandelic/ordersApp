import {Order} from "./model/order";


export const MOCK_ORDERS: Order[] = [
  { id: 1, name: 'Air Filter', customer: 'Ana', status: false, date: new Date('2023.03.15'), price: 15.50 },
  { id: 2, name: 'Fuel Filter', customer: 'Marko', status: false, date: new Date('2023.03.23'), price: 6.60 },
  { id: 3, name: 'Spring', customer: 'Ivana', status: true, date: new Date('2023.04.05'), price: 17.40 },
  { id: 4, name: 'Water pump', customer: 'Tomislav', status: false, date: new Date('2023.04.29'), price: 30.65 },
  { id: 5, name: 'Spark plug', customer: 'Marija', status: true, date: new Date('2023.05.11'), price: 5.50 },
  { id: 6, name: 'Engine Oil', customer: 'Željko', status: true, date: new Date('2023.05.18'), price: 15.49 },
  { id: 7, name: 'Fog light', customer: 'Marica', status: false, date: new Date('2023.06.06'), price: 37.90 },
  { id: 8, name: 'Headlight', customer: 'Ivan', status: false, date: new Date('2023.06.19'), price: 125.50 },
  { id: 9, name: 'Brake Disc', customer: 'Barbara', status: true, date: new Date('2023.07.07'), price: 23.80 },
  { id: 10, name: 'Clutch', customer: 'Stipe', status: true, date: new Date('2023.07.14'), price: 105.30 },

];
