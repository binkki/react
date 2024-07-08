import { useEffect, useState } from 'react';
import ErrorButton from './ErrorButton';
import Search from './Search';
import CharacterItem from './CharacterItem';
import ApiService from '../../services/ApiService';
import { Character } from '../../types';
import { LOADING_DATA, EMPTY_DATA } from '../../utils/constants';
import './MainPage.css';

const MainPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    setLoading(true);
    ApiService.getCharacters().then((value: Character[]) => {
      setCharacters(value);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="main-wrapper">
        <Search searchCharacters={search} />
        <ErrorButton />
        <div className="characters-flex">
          {loading && <span>{LOADING_DATA}</span>}
          {!loading &&
            characters.map((x: Character) => (
              <CharacterItem key={x.name} character={x} />
            ))}
          {!characters.length && !loading && <span>{EMPTY_DATA}</span>}
        </div>
      </div>
    </>
  );
};

export default MainPage;
