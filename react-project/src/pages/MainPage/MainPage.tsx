import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/Search/Search';
import Pagination from '../../components/Pagination/Pagination';
import { CharacterApiResponse } from '../../types';
import { getCharacters } from '../../services/ApiService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getCurrentTheme, getPageIdFromPath, isValidNumber } from '../../utils/utils';
import './MainPage.css';
import Loader from '../../components/Loader/Loader';
import CharacterList from './CharacterList';
import { ThemeContext } from '../../context/ThemeContext';
import { setMainLoading, setPage } from '../../store/slices/appSlice';
import { RootState } from '../../store';

const MainPage = () => {
  const [characters, setCharacters] = useState<CharacterApiResponse>();
  const [reload, setReload] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getLocalValue } = useLocalStorage();
  const darkTheme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.app.isMainLoading);

  useEffect(() => {
    if (!isValidNumber(getPageIdFromPath(location.pathname))) return navigate('/not-found');
    dispatch(setMainLoading(true));
    const currentPage = Number(getPageIdFromPath(location.pathname));
    const localSearch = getLocalValue() ?? '';
    getCharacters(currentPage, localSearch).then((value: CharacterApiResponse) => {
      if (value.detail) {
        navigate('/not-found');
      }
      setCharacters(value);
      dispatch(setPage(currentPage));
      dispatch(setMainLoading(false));
    });
  }, [reload]);

  const changeTheme = () => {
    darkTheme.setTheme();
  };

  return loading ? (
    <div className={`main-wrapper ${getCurrentTheme(darkTheme.theme)}`}>
      <Search reload={reload} setReload={setReload} />
      <div className="main-container flex">
        <Loader />
      </div>
    </div>
  ) : (
    <div className={`main-wrapper flex ${getCurrentTheme(darkTheme.theme)}`}>
      <button className="theme-button" onClick={changeTheme} />
      <Search reload={reload} setReload={setReload} />
      <div className="main-container flex">
        <CharacterList characters={characters?.results ?? []} />
        <Outlet />
      </div>
      {characters?.results.length !== 0 && (
        <Pagination
          isNextPage={characters?.next ?? null}
          isPreviousPage={characters?.previous ?? null}
          reload={reload}
          setReload={setReload}
        />
      )}
    </div>
  );
};

export default MainPage;
