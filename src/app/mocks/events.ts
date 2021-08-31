import { IEvent } from '../interfaces/event.interface';
import { categories } from './category';

export const events: IEvent[] = [
  {
    id: 1,
    name: 'Teatro',
    longitude: -29.7369,
    latitude: -50.0137984,
    category: categories[3],
    imagem: '/assets/images/event-default.jpg',
  },
  {
    id: 2,
    name: 'Vingadores',
    longitude: -29.74,
    latitude: -50.01,
    category: categories[4],
    imagem: '/assets/images/event-default.jpg',
  },
  {
    id: 3,
    name: 'Corrida na praia',
    longitude: -29.732,
    latitude: -50.0137914,
    category: categories[1],
    imagem: '/assets/images/event-default.jpg',
  },
  {
    id: 4,
    name: 'Caminhada para show',
    longitude: -29.732,
    latitude: -50.0137874,
    category: categories[1],
    imagem: '/assets/images/event-default.jpg',
  },
  {
    id: 5,
    name: 'Futebol infantojuvenil',
    longitude: -29.731,
    latitude: -50.0137904,
    category: categories[2],
    imagem: '/assets/images/event-default.jpg',
  },
  {
    id: 6,
    name: 'Ginásio',
    longitude: -29.72,
    latitude: -50.0137904,
    category: categories[2],
    imagem: '/assets/images/event-default.jpg',
  },
  {
    id: 7,
    name: 'peter pan',
    longitude: -29.7328,
    latitude: -50.0137914,
    category: categories[3],
    imagem: '/assets/images/event-default.jpg',
  },
];
