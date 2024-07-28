import { Character } from '../types';
import { CHARACTER_IMAGE_URL, END_OF_STRING } from './constants';

export const getPageIdFromPath = (pathname: string): string => pathname.split('/')[1];

export const getCharacterIdFromPath = (pathname: string): string => {
  const path = pathname.split('/');
  return path.length === 3 ? path[2] : '';
};

export const getCharacterIdFromUrl = (url: string): string => url.split('/')[5];

export const getCharacterImageUrl = (characterUrl: string) =>
  `${CHARACTER_IMAGE_URL}${getCharacterIdFromUrl(characterUrl)}.jpg`;

export const isValidNumber = (testString: string): boolean => {
  const testNumber = Number(testString);
  return !(isNaN(testNumber) || testNumber < 1);
};

export const getCurrentTheme = (isDarkTheme: boolean): string => (isDarkTheme ? 'dark' : 'light');

export const removeCommaInString = (tempalte: string): string => tempalte.split(',').join('');

export const generateCharacterString = (x: Character): string =>
  `${x.name},${x.gender},${x.birth_year},${x.height},${x.mass},` +
  `${removeCommaInString(x.eye_color)},` +
  `${removeCommaInString(x.hair_color)},` +
  `${removeCommaInString(x.skin_color)}` +
  END_OF_STRING;

export const generateCSV = (data: Character[]): string =>
  data
    .map((x: Character) => generateCharacterString(x))
    .reduce((result, current) => result + current, '');

export const generateDownloadFileName = (count: number): string =>
  `${count}_character${count > 1 ? 's' : ''}.csv`;
