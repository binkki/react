import { useEffect, useState } from 'react';
import Search from './Search';
import CharacterItem from './CharacterItem';
import Pagination from './Pagination';
import { Character, CharacterApiResponse } from '../../types';
import { EMPTY_DATA, LOADING_DATA } from '../../utils/constants';
import './MainPage.css';
import {
  useLoaderData,
  useLocation,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';

const MainPage = () => {
  const characters: CharacterApiResponse =
    useLoaderData() as CharacterApiResponse;
  const [page, setPage] = useState(0);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    setPage(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
  }, [location, searchParams]);

  return navigation.state === 'loading' ? (
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
