import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import {
  getCharacterIdFromPath,
  getCharacterIdFromUrl,
  getCharacterImageUrl,
  getPageIdFromPath,
  isValidNumber,
} from '../utils/utils';

describe('Utils tests', () => {
  it('Verify that getPageIdFromPath returns correct page id from path', async () => {
    let path = 'testsite/5';
    let pageId = getPageIdFromPath(path);
    expect(pageId).toBe('5');

    path = 'testsite/aaa';
    pageId = getPageIdFromPath(path);
    expect(pageId).toBe('aaa');
  });

  it('Verify that getCharacterIdFromPath returns correct character id from path', async () => {
    let path = 'testsite/1/5';
    let characterId = getCharacterIdFromPath(path);
    expect(characterId).toBe('5');

    path = 'testsite/1/aaa';
    characterId = getCharacterIdFromPath(path);
    expect(characterId).toBe('aaa');

    path = 'testsite/1';
    characterId = getCharacterIdFromPath(path);
    expect(characterId).toBe('');
  });

  it('Verify that getCharacterIdFromUrl returns correct character id from path', async () => {
    const path = 'https://swapi.dev/api/people/1';
    const characterId = getCharacterIdFromUrl(path);
    expect(characterId).toBe('1');
  });

  it('Verify that getCharacterImageUrl returns valid url to load character image', async () => {
    const path = 'https://swapi.dev/api/people/1';
    const imageUrl = getCharacterImageUrl(path);
    expect(imageUrl).toBe(
      'https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/1.jpg'
    );
  });

  it('Verify that isValidNumber return true if page or character with this id can exist ', async () => {
    let id = '1';
    let isValidId = isValidNumber(id);
    expect(isValidId).toBe(true);

    id = '0';
    isValidId = isValidNumber(id);
    expect(isValidId).toBe(false);

    id = '-5';
    isValidId = isValidNumber(id);
    expect(isValidId).toBe(false);

    id = 'aaa';
    isValidId = isValidNumber(id);
    expect(isValidId).toBe(false);
  });
});
