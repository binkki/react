import { SubmitHandler, useForm } from 'react-hook-form';
import StorageService from '../../services/StorageService';
import { SEARCH_PLACEHOLDER } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

type SearchFormFields = {
  search: string;
};

const Search = () => {
  const { register, handleSubmit, reset } = useForm<SearchFormFields>();
  const navigate = useNavigate();

  const submitSearch: SubmitHandler<SearchFormFields> = (data) => {
    reset();
    StorageService.saveSearchRequestParams(data.search);
    navigate(`/characters?page=1`);
  };

  return (
    <>
      <form className="search-wrapper" onSubmit={handleSubmit(submitSearch)}>
        <input
          id="search-input"
          type="search"
          defaultValue={StorageService.getLastSearchRequestParams()}
          placeholder={SEARCH_PLACEHOLDER}
          {...register('search')}
        />
        <input type="submit" className="search-submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
