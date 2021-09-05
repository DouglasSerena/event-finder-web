import { ICategory } from './category.interface';

export interface IEvent {
  id: string | number;
  name: string;
  date: string;
  description: string;
  imagens: string[];
  latitude: number;
  longitude: number;
  category: ICategory;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
