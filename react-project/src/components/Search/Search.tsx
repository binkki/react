import { SubmitHandler, useForm } from 'react-hook-form';
import { SEARCH_PLACEHOLDER } from '../../utils/constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

type SearchFormFields = {
  search: string;
};

type SearchProps = {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = (props: SearchProps) => {
  const { reload, setReload } = props;
  const { register, handleSubmit } = useForm<SearchFormFields>();
  const { localValue, setLocalValue } = useLocalStorage();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const isDisabled = useSelector((state: RootState) => state.app.isMainLoading);

  useEffect(() => {
    setSearchValue(localValue);
  }, [localValue]);

  const submitSearch: SubmitHandler<SearchFormFields> = async (data) => {
    setLocalValue(data.search.trim());
    setReload(!reload);
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
        disabled={isDisabled ?? false}
      />
    </form>
  );
};

export default Search;
