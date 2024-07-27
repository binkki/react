import { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/Search/Search';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import CharacterList from './CharacterList';
import { CharacterApiResponse } from '../../types';
import { getCharacters } from '../../services/ApiService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getCurrentTheme, getPageIdFromPath, isValidNumber } from '../../utils/utils';
import { ThemeContext } from '../../context/ThemeContext';
import { setMainLoading, setPage, setCharacterApiResult } from '../../store/slices/appSlice';
import { RootState } from '../../store';
import './MainPage.css';
import Flyout from '../../components/Flyout/Flyout';

const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getLocalValue } = useLocalStorage();
  const darkTheme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.app.isMainLoading);
  const reload = useSelector((state: RootState) => state.app.isReload);
  const characters = useSelector((state: RootState) => state.app.characters);

  useEffect(() => {
    if (!isValidNumber(getPageIdFromPath(location.pathname))) return navigate('/not-found');
    dispatch(setMainLoading(true));
    const currentPage = Number(getPageIdFromPath(location.pathname));
    const localSearch = getLocalValue() ?? '';
    getCharacters(currentPage, localSearch).then((value: CharacterApiResponse) => {
      if (value.detail) {
        dispatch(setMainLoading(false));
        navigate('/not-found');
      }
      dispatch(setCharacterApiResult(value));
      dispatch(setPage(currentPage));
      dispatch(setMainLoading(false));
    });
  }, [reload]);

  const changeTheme = () => {
    darkTheme.setTheme();
  };

  return loading ? (
    <div className={`main-wrapper ${getCurrentTheme(darkTheme.theme)}`}>
      <Search />
      <div className="main-container flex">
        <Loader />
      </div>
    </div>
  ) : (
    <div className={`main-wrapper flex ${getCurrentTheme(darkTheme.theme)}`}>
      <button className="theme-button" onClick={changeTheme} />
      <Search />
      <div className="main-container flex">
        <CharacterList />
        <Outlet />
      </div>
      {characters && characters.results.length !== 0 && <Pagination />}
      <Flyout />
    </div>
  );
};

export default MainPage;
