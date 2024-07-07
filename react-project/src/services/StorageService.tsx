import { STORAGESEARCH } from '../utils/constants';

class StorageService {
  static getLastSearchRequestParams = (): string => {
    return localStorage.getItem(STORAGESEARCH) ?? '';
  };

  static saveSearchRequestParams = (params: string) => {
    localStorage.setItem(STORAGESEARCH, params);
  };
}

export default StorageService;
