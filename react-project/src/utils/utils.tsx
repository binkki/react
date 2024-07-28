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

export const isValidNumber = (testString: string) => {
  const testNumber = Number(testString);
  return !(isNaN(testNumber) || testNumber < 1);
};

export const getCurrentTheme = (isDarkTheme: boolean) => (isDarkTheme ? 'dark' : 'light');

const removeCommainString = (tempalte: string) => tempalte.split(',').join('');

const generateCharacterString = (x: Character) =>
  `${x.name},${x.gender},${x.birth_year},${x.height},${x.mass},` +
  `${removeCommainString(x.eye_color)},${removeCommainString(x.hair_color)},${removeCommainString(x.skin_color)}` +
  END_OF_STRING;

export const generateDownloadDataLink = (data: Character[]): string => {
  const dataString = data
    .map((x: Character) => generateCharacterString(x))
    .reduce((result, current) => result + current, '');
  return URL.createObjectURL(new Blob([dataString], { type: 'text/csv' }));
};

export const generateDownloadFileName = (count: number): string =>
  `${count}_character${count > 1 ? 's' : ''}.csv`;
