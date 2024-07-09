import { useNavigate } from 'react-router-dom';

type PaginationProps = {
  currentPage: number;
  nextPage: string | null;
  previousPage: string | null;
};

const Pagination = (props: PaginationProps) => {
  const { currentPage, nextPage, previousPage } = props;
  const navigate = useNavigate();

  const changePage = (newPage: number) => {
    navigate(`/characters?page=${currentPage + newPage}`);
  };

  return (
    <div className="pagination">
      <input
        type="submit"
        className={previousPage ? 'search-submit' : 'button-disabled'}
        value="Prew"
        onClick={() => changePage(-1)}
      />
      <span>{currentPage}</span>
      <input
        type="submit"
        className={nextPage ? 'search-submit' : 'button-disabled'}
        value="Next"
        onClick={() => changePage(1)}
      />
    </div>
  );
};

export default Pagination;
