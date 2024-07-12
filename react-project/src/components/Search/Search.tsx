import { SubmitHandler, useForm } from 'react-hook-form';
import { SEARCH_PLACEHOLDER } from '../../utils/constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import { useEffect, useState } from 'react';

type SearchFormFields = {
  search: string;
};

type SearchProps = {
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
  isDisabled?: boolean;
};

const Search = (props: SearchProps) => {
  const { setSearch, isDisabled } = props;
  const { register, handleSubmit, reset } = useForm<SearchFormFields>();
  const { localValue } = useLocalStorage();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setSearchValue(localValue);
  }, [localValue]);

  const submitSearch: SubmitHandler<SearchFormFields> = async (data) => {
    setSearchValue(data.search);
    await setSearch(data.search);
    reset();
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
