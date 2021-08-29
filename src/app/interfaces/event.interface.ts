import { ICategory } from './category.interface';

export interface IEvent {
  id: string | number;
  name: string;
  imagem: string;
  latitude: number;
  longitude: number;
  category: ICategory;
}
