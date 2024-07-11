import { SubmitHandler, useForm } from 'react-hook-form';
import { SEARCH_PLACEHOLDER } from '../../utils/constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import './Search.css';

type SearchFormFields = {
  search: string;
};

type SearchProps = {
  isDisabled?: boolean;
};

const Search = (props: SearchProps) => {
  const { isDisabled } = props;
  const { register, handleSubmit, reset } = useForm<SearchFormFields>();
  const { setSearchValue, getSearchValue } = useLocalStorage();
  const searchValue = getSearchValue();
  const navigate = useNavigate();

  const submitSearch: SubmitHandler<SearchFormFields> = (data) => {
    setSearchValue(data.search);
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
        placeholder={searchValue ? `Search result for '${searchValue}'` : SEARCH_PLACEHOLDER}
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
