export interface IEvent {
  _id: string | number;
  name: string;
  date: string;
  icon: string;
  description: string;
  images: string[];
  latitude: number;
  longitude: number;
  categoriesId: string[];
  address: string;
}
