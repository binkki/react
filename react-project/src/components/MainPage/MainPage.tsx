import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import CharacterItem from './CharacterItem';
import Pagination from '../Pagination/Pagination';
import { Character, CharacterApiResponse } from '../../types';
import { EMPTY_DATA } from '../../utils/constants';
import { getCharacters } from '../../services/ApiService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getPageIdFromPath, isValidNumber } from '../../utils/utils';
import './MainPage.css';

const MainPage = () => {
  const [characters, setCharacters] = useState<CharacterApiResponse>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLocalValue, getLocalValue } = useLocalStorage();
  const searchRef = useRef<string>('');

  useEffect(() => {
    let localSearch = getLocalValue() ?? '';
    if (lastSearch !== null) {
      localSearch = lastSearch;
    }
    searchRef.current = localSearch;
    setLoading(true);
    if (!isValidNumber(getPageIdFromPath(location.pathname))) return navigate('/not-found');
    const currentPage = Number(getPageIdFromPath(location.pathname));
    setPage(currentPage);
    getCharacters(currentPage, localSearch).then((value: CharacterApiResponse) => {
      if (value.detail) {
        navigate('/not-found');
      }
      setCharacters(value);
      setLoading(false);
    });
  }, [location, lastSearch]);

  useEffect(() => {
    return () => {
      setLocalValue(searchRef.current);
    };
  });

  return loading ? (
    <div className="main-wrapper">
      <Search setSearch={setLastSearch} isDisabled={loading} />
    </div>
  ) : (
    <div className="main-wrapper flex">
      <Search setSearch={setLastSearch} />
      <div className="main-container flex">
        <div className="characters-flex flex">
          {characters?.results.map((x: Character) => <CharacterItem key={x.name} character={x} />)}
          {!characters?.results.length && <span>{EMPTY_DATA}</span>}
        </div>
        <Outlet />
      </div>
      {characters?.results.length !== 0 && (
        <Pagination
          currentPage={page}
          nextPage={characters?.next ?? null}
          previousPage={characters?.previous ?? null}
        />
      )}
    </div>
  );
};

export default MainPage;
