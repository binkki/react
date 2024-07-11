import { CHARACTER_IMAGE_URL } from './constants';

export const getPageIdFromPath = (pathname: string): string => pathname.split('/')[1];

export const getCharacterIdFromPath = (pathname: string): string => {
  const path = pathname.split('/');
  return path.length === 3 ? path[2] : '';
};

export const getCharacterIdFromUrl = (url: string): string => url.split('/')[5];

export const getCharacterImageUrl = (characterUrl: string) =>
  `${CHARACTER_IMAGE_URL}${getCharacterIdFromUrl(characterUrl)}.jpg`;

export const isValidNumber = (testString: string) => {
  const testNumber = Number(testString);
  return !(isNaN(testNumber) || testNumber < 1);
};
