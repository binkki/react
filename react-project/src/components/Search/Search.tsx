import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PLACEHOLDER } from '../../utils/constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { setPage, setSearchValue } from '../../store/slices/appSlice';
import './Search.css';

type SearchFormFields = {
  search: string;
};

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<SearchFormFields>();
  const { localValue, setLocalValue } = useLocalStorage();
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(localValue);
  }, [localValue]);

  const submitSearch: SubmitHandler<SearchFormFields> = async (data) => {
    setLocalValue(data.search.trim());
    dispatch(setSearchValue(data.search.trim()));
    dispatch(setPage(1));
    navigate('/1');
  };

  return (
    <form className="search-wrapper flex" onSubmit={handleSubmit(submitSearch)}>
      <input
        id="search-input"
        type="text"
        autoComplete="off"
        placeholder={search ? `Search result for '${search}'` : SEARCH_PLACEHOLDER}
        {...register('search')}
      />
      <button className="search-button" data-testid="search-button" />
    </form>
  );
};

export default Search;
