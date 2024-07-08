import { SubmitHandler, useForm } from 'react-hook-form';
import StorageService from '../../services/StorageService';
import { SEARCH_PLACEHOLDER } from '../../utils/constants';

type SearchFormFields = {
  search: string;
};

type SearchProps = {
  searchCharacters: () => Promise<void>;
};

const Search = (props: SearchProps) => {
  const { register, handleSubmit, reset } = useForm<SearchFormFields>();
  const { searchCharacters } = props;

  const submitSearch: SubmitHandler<SearchFormFields> = (data) => {
    reset();
    StorageService.saveSearchRequestParams(data.search);
    searchCharacters();
  };

  return (
    <>
      <form className="search-wrapper" onSubmit={handleSubmit(submitSearch)}>
        <input
          id="search-input"
          type="input"
          placeholder={SEARCH_PLACEHOLDER}
          {...register('search')}
        />
        <input type="submit" className="search-submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
