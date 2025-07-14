import {City} from './city';
import {Status} from './state';

export interface Material {
  id: number,
  name: string,
  description: string,
  type: string,
  price: number,
  datePurchase: Date,
  dateSale: Date,
  status: Status,
  city: City
}
