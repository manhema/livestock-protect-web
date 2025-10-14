// import { localStorageService } from '@services/local-storage';
//
// const CURRENT_ORGANIZATION = 'cOrg';
//
// export const getCurrentOrganization = () => {
//   return localStorageService.get(CURRENT_ORGANIZATION);
// };
//
// export const setCurrentOrganization = (value: string | null) => {
//   return value
//     ? localStorageService.set(CURRENT_ORGANIZATION, value)
//     : localStorageService.remove(CURRENT_ORGANIZATION);
// };

export class OrganizationUtil {
  static CURRENT_ORGANIZATION = 'xcOrg';

  static getCurrentOrganization = () => {
    return localStorage.getItem(this.CURRENT_ORGANIZATION);
  };

  static setCurrentOrganization = (value: string | null) => {
    if (value){
      return  localStorage.setItem(this.CURRENT_ORGANIZATION, value);
    }

    return localStorage.removeItem(this.CURRENT_ORGANIZATION);
  };
}
