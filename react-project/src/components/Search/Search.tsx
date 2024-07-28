import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PLACEHOLDER } from '../../utils/constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { RootState } from '../../store';
import { setReload } from '../../store/slices/appSlice';
import './Search.css';

type SearchFormFields = {
  search: string;
};

const Search = () => {
  const { register, handleSubmit } = useForm<SearchFormFields>();
  const { localValue, setLocalValue } = useLocalStorage();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const isDisabled = useSelector((state: RootState) => state.app.isMainLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchValue(localValue);
  }, [localValue]);

  const submitSearch: SubmitHandler<SearchFormFields> = async (data) => {
    setLocalValue(data.search.trim());
    dispatch(setReload());
    navigate('/1');
  };

  return (
    <form className="search-wrapper flex" onSubmit={handleSubmit(submitSearch)}>
      <input
        id="search-input"
        className={isDisabled ? 'loading' : ''}
        type="text"
        autoComplete="off"
        placeholder={
          searchValue && !isDisabled ? `Search result for '${searchValue}'` : SEARCH_PLACEHOLDER
        }
        disabled={isDisabled ?? false}
        {...register('search')}
      />
      <button
        className={isDisabled ? 'loading search-button' : 'search-button'}
        data-testid="search-button"
        disabled={isDisabled ?? false}
      />
    </form>
  );
};

export default Search;
