import { useEffect, useState } from 'react';
import Search from './Search';
import CharacterItem from './CharacterItem';
import Pagination from './Pagination';
import { Character, CharacterApiResponse } from '../../types';
import { EMPTY_DATA, LOADING_DATA } from '../../utils/constants';
import './MainPage.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getCharacters } from '../../services/ApiService';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const MainPage = () => {
  const [characters, setCharacters] = useState<CharacterApiResponse>();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getSearchValue } = useLocalStorage();

  useEffect(() => {
    const currentPage = searchParams.get('page')
      ? Number(searchParams.get('page'))
      : 1;
    if (isNaN(currentPage)) return navigate('/not-found');
    setPage(currentPage);
    const searchValue = getSearchValue();
    getCharacters(currentPage, searchValue ?? '').then(
      (value: CharacterApiResponse) => {
        if (value.detail) {
          return navigate('/not-found');
        }
        setCharacters(value);
      }
    );
  }, [location]);

  return characters === undefined ? (
    <>
      <div className="main-wrapper">
        <Search />
        <div className="characters-flex">
          <span>{LOADING_DATA}</span>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="main-wrapper">
        <Search />
        <div className="characters-flex">
          {characters?.results.map((x: Character) => (
            <CharacterItem key={x.name} character={x} />
          ))}
          {!characters?.results.length && <span>{EMPTY_DATA}</span>}
        </div>
        {characters?.results.length !== 0 && (
          <Pagination
            currentPage={page}
            nextPage={characters.next}
            previousPage={characters.previous}
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
