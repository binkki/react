import { useEffect, useState } from 'react';
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
import Loader from '../Loader/Loader';

const MainPage = () => {
  const [characters, setCharacters] = useState<CharacterApiResponse>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getLocalValue } = useLocalStorage();

  useEffect(() => {
    if (!isValidNumber(getPageIdFromPath(location.pathname))) return navigate('/not-found');
    setLoading(true);
    const currentPage = Number(getPageIdFromPath(location.pathname));
    const localSearch = getLocalValue() ?? '';
    getCharacters(currentPage, localSearch).then((value: CharacterApiResponse) => {
      if (value.detail) {
        navigate('/not-found');
      }
      setCharacters(value);
      setPage(currentPage);
      setLoading(false);
    });
  }, [reload]);

  return loading ? (
    <div className="main-wrapper">
      <Search isDisabled={loading} reload={reload} setReload={setReload} />
      <div className="main-container flex">
        <Loader />
      </div>
    </div>
  ) : (
    <div className="main-wrapper flex">
      <Search reload={reload} setReload={setReload} />
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
          reload={reload}
          setReload={setReload}
        />
      )}
    </div>
  );
};

export default MainPage;
