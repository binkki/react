import { Character, CharacterApiResponse } from '../types';
import { CHARACTER_URL } from '../utils/constants';
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
    return ApiService.get(
      `${CHARACTER_URL}?search=${StorageService.getLastSearchRequestParams()}`
    )
      .then((value: Response) => value.json())
      .then((value: CharacterApiResponse) => value.results);
  };
}

export default ApiService;
