export interface IPagination {
  offset: number;
  limit: number;
}

export interface IVisitorFilter {
  name: string;
  email: string;
  phone: string;
}

export interface IMovementsFilter {
  visitors: IVisitorFilter[];
  vehicles: string[];
  sites: string[];
}

export interface IVisitsFilter {
  keywords?: string;
  visitors: IVisitorFilter[];
  vehicles: string[];
  sites: string[];
}
