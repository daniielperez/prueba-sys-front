import {Department} from './department';

export interface City {
  id: number,
  code: string,
  name: string,
  department: Department,
}
