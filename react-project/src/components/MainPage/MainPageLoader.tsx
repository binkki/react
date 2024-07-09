import { redirect } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import StorageService from '../../services/StorageService';

export const characterLoader = async ({ request }: { request: Request }) => {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const searchValue = StorageService.getLastSearchRequestParams() ?? '';
  if (!page) return redirect('/not-found');
  return ApiService.getCharacters(searchValue, page).then((value) => {
    if (value.detail) {
      return redirect('/not-found');
    }
    return value;
  });
};
