import { STORAGE_SEARCH } from '../utils/constants';

class StorageService {
  static getLastSearchRequestParams = (): string => {
    return localStorage.getItem(STORAGE_SEARCH) ?? '';
  };

  static saveSearchRequestParams = (params: string) => {
    localStorage.setItem(STORAGE_SEARCH, params);
  };
}

export default StorageService;
