import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import * as utils from '../utils/utils';
import { END_OF_STRING } from '../utils/constants';
import { testCharacterList } from './testData';

describe('Utils tests', () => {
  it('Verify that getPageIdFromPath returns correct page id from path', async () => {
    let path = 'testsite/5';
    let pageId = utils.getPageIdFromPath(path);
    expect(pageId).toBe('5');

    path = 'testsite/aaa';
    pageId = utils.getPageIdFromPath(path);
    expect(pageId).toBe('aaa');
  });

  it('Verify that getCharacterIdFromPath returns correct character id from path', async () => {
    let path = 'testsite/1/5';
    let characterId = utils.getCharacterIdFromPath(path);
    expect(characterId).toBe('5');

    path = 'testsite/1/aaa';
    characterId = utils.getCharacterIdFromPath(path);
    expect(characterId).toBe('aaa');

    path = 'testsite/1';
    characterId = utils.getCharacterIdFromPath(path);
    expect(characterId).toBe('');
  });

  it('Verify that getCharacterIdFromUrl returns correct character id from path', async () => {
    const path = 'https://swapi.dev/api/people/1';
    const characterId = utils.getCharacterIdFromUrl(path);
    expect(characterId).toBe('1');
  });

  it('Verify that getCharacterImageUrl returns valid url to load character image', async () => {
    const path = 'https://swapi.dev/api/people/1';
    const imageUrl = utils.getCharacterImageUrl(path);
    expect(imageUrl).toBe(
      'https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/1.jpg'
    );
  });

  it('Verify that isValidNumber return true if page or character with this id can exist ', async () => {
    let id = '1';
    let isValidId = utils.isValidNumber(id);
    expect(isValidId).toBe(true);

    id = '0';
    isValidId = utils.isValidNumber(id);
    expect(isValidId).toBe(false);

    id = '-5';
    isValidId = utils.isValidNumber(id);
    expect(isValidId).toBe(false);

    id = 'aaa';
    isValidId = utils.isValidNumber(id);
    expect(isValidId).toBe(false);
  });

  it('removeCommaInString should replace comma in string to space', async () => {
    const commaString = '1, 2, 3';
    const spacedString = utils.removeCommaInString(commaString);
    expect(spacedString).toBe('1 2 3');
  });

  it('Verify that generateCharacterString returns valid data to write to csv file', async () => {
    const character = testCharacterList[0];
    const validReasut =
      `${character.name},${character.gender},${character.birth_year},${character.height},${character.mass},` +
      `${utils.removeCommaInString(character.eye_color)},` +
      `${utils.removeCommaInString(character.hair_color)},` +
      `${utils.removeCommaInString(character.skin_color)}` +
      END_OF_STRING;
    const generatedString = utils.generateCharacterString(character);
    expect(generatedString).toBe(validReasut);
  });

  it('Verify that generateDownloadFileName returns valid file name', async () => {
    let count = 1;
    let expectedName = '1_character.csv';
    let resultName = utils.generateDownloadFileName(count);
    expect(resultName).toBe(expectedName);

    count = 5;
    expectedName = '5_characters.csv';
    resultName = utils.generateDownloadFileName(count);
    expect(resultName).toBe(expectedName);
  });
});
