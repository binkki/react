import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/Search/Search';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import Flyout from '../../components/Flyout/Flyout';
import CharacterList from './CharacterList';
import { ThemeContext } from '../../context/ThemeContext';
import * as utils from '../../utils/utils';
import { setCharacterApiResult, setPage } from '../../store/slices/appSlice';
import { useGetCharacterListQuery } from '../../store/api/characterApi';
import { RootState } from '../../store';
import './MainPage.css';

const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkTheme = useContext(ThemeContext);

  const page = useSelector((state: RootState) => state.app.page);
  const search = useSelector((state: RootState) => state.app.searchValue);
  const { data, isLoading, error, refetch } = useGetCharacterListQuery({ search, page });
  const [loading, setLoadng] = useState(false);

  useEffect(() => {
    dispatch(setPage(Number(utils.getPageIdFromPath(location.pathname))));
  }, [location]);

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setCharacterApiResult(data));
    }
  }, [data]);

  useEffect(() => {
    if (!utils.isValidNumber(utils.getPageIdFromPath(location.pathname)) || error) {
      return navigate('/not-found');
    } else {
      setLoadng(true);
      refetch().then(() => {
        dispatch(setCharacterApiResult(data));
        setLoadng(false);
      });
    }
  }, [search, refetch, error]);

  const changeTheme = () => {
    darkTheme.setTheme();
  };

  return isLoading || loading ? (
    <div className={`main-wrapper ${utils.getCurrentTheme(darkTheme.theme)}`}>
      <Search />
      <div className="main-container flex">
        <Loader />
      </div>
    </div>
  ) : (
    <div className={`main-wrapper flex ${utils.getCurrentTheme(darkTheme.theme)}`}>
      <button className="theme-button" onClick={changeTheme} />
      <Search />
      <div className="main-container flex">
        <CharacterList />
        <Outlet />
      </div>
      {data && data.results.length > 0 && <Pagination />}
      <Flyout />
    </div>
  );
};

export default MainPage;
