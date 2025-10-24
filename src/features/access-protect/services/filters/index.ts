// export interface IVisitorFilter {
//   name: string;
//   email: string;
//   phone: string;
// }
//
// export interface IMovementsFilter {
//   visitors: IVisitorFilter[];
//   vehicles: string[];
//   sites: string[];
// }

// import type {IVisitorFilter} from "../access-protect-services.ts";

// export interface IVisitsFilter {
//     keywords: string;
//     visitors: IVisitorFilter[];
//     vehicles: string[];
//     sites: string[];
// }

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
