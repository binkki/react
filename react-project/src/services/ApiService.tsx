import { CharacterApiResponse } from '../types';
import { CHARACTER_URL } from '../utils/constants';

class ApiService {
  static get = (url: string): Promise<Response> =>
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  static getCharacters = (
    searchQuery: string,
    page: number
  ): Promise<CharacterApiResponse> => {
    return ApiService.get(
      `${CHARACTER_URL}?page=${page}&search=${searchQuery}`
    ).then((value: Response) => value.json());
  };
}

export default ApiService;
