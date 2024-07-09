import { SubmitHandler, useForm } from 'react-hook-form';
import { SEARCH_PLACEHOLDER } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type SearchFormFields = {
  search: string;
};

const Search = () => {
  const { register, handleSubmit, reset } = useForm<SearchFormFields>();
  const navigate = useNavigate();
  const { setSearchValue, getSearchValue } = useLocalStorage();
  const searchValue = getSearchValue();

  const submitSearch: SubmitHandler<SearchFormFields> = (data) => {
    reset();
    setSearchValue(data.search);
    navigate(`/characters?page=1`);
  };

  return (
    <>
      <form className="search-wrapper" onSubmit={handleSubmit(submitSearch)}>
        <input
          id="search-input"
          type="search"
          placeholder={searchValue ? `Showing search result for '${searchValue}'` : SEARCH_PLACEHOLDER}
          {...register('search')}
        />
        <input type="submit" className="search-submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
