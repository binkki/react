import { http, HttpResponse } from 'msw';
import { CHARACTER_URL } from '../utils/constants';
import { testCharacterList } from './testData';

const handlers = [
  http.get(`${CHARACTER_URL}`, () => {
    return HttpResponse.json({
      results: testCharacterList,
      next: '/1',
    });
  }),
  http.get(`${CHARACTER_URL}*`, () => {
    return HttpResponse.json(testCharacterList[0]);
  }),
];

export { handlers };
