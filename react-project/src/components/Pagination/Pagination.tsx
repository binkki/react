import { useNavigate } from 'react-router-dom';
import './Pagination.css';

type PaginationProps = {
  currentPage: number;
  nextPage: string | null;
  previousPage: string | null;
};

const Pagination = (props: PaginationProps) => {
  const { currentPage, nextPage, previousPage } = props;
  const navigate = useNavigate();

  const changePage = (newPage: number) => {
    navigate(`/${currentPage + newPage}`);
  };

  return (
    <div className="pagination flex">
      <input
        type="submit"
        className="pagination-item clickable"
        value="<"
        disabled={previousPage ? false : true}
        onClick={() => changePage(-1)}
      />
      <span className="pagination-item">{currentPage}</span>
      <input
        type="submit"
        className="pagination-item clickable"
        value=">"
        disabled={nextPage ? false : true}
        onClick={() => changePage(1)}
      />
    </div>
  );
};

export default Pagination;
