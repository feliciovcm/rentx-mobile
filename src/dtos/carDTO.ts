export interface Rent {
  period: string;
  price: number;
}

export interface Accessory {
  type: string;
  name: string;
}

export interface Car {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: Rent;
  fuel_type: string;
  thumbnail: string;
  accessories: Accessory[];
  photos: string[];
}

export interface SchedulesBycar {
  id: string;
  unavailable_dates: string[];
}

export interface Rent2 {
  period: string;
  price: number;
}

export interface Accessory2 {
  type: string;
  name: string;
}

export interface Car2 {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: Rent2;
  fuel_type: string;
  thumbnail: string;
  accessories: Accessory2[];
  photos: string[];
}

export interface SchedulesByuser {
  user_id: number;
  car: Car2;
  startDate: string;
  endDate: string;
  id: number;
}

export interface carDTO {
  cars: Car[];
  schedules_bycars: SchedulesBycar[];
  schedules_byuser: SchedulesByuser[];
}
