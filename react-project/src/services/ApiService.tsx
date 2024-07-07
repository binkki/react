import { Character, CharacterApiResponse } from '../types';
import { CHARACTERURL } from '../utils/constants';
import StorageService from './StorageService';

class ApiService {
  static get = (url: string): Promise<Response> =>
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  static getCharacters = (): Promise<Character[]> => {
    const searchValue = StorageService.getLastSearchRequestParams();
    const url = searchValue
      ? `${CHARACTERURL}?search=${searchValue}`
      : CHARACTERURL;
    return ApiService.get(url)
      .then((value: Response) => value.json())
      .then((value: CharacterApiResponse) => value.results);
  };
}

export default ApiService;
