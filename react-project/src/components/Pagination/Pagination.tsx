import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setReload } from '../../store/slices/appSlice';
import { RootState } from '../../store';
import './Pagination.css';

const Pagination = () => {
  const currentPage = useSelector((state: RootState) => state.app.page);
  const isNextPage = useSelector((state: RootState) => state.app.characters.next);
  const isPreviousPage = useSelector((state: RootState) => state.app.characters.previous);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changePage = (step: number) => {
    const newPage = currentPage + step;
    dispatch(setPage(newPage));
    dispatch(setReload());
    navigate(`/${newPage}`);
  };

  return (
    <div className="pagination flex">
      <input
        type="submit"
        className="pagination-item clickable"
        value="<"
        disabled={isPreviousPage ? false : true}
        onClick={() => changePage(-1)}
      />
      <span className="pagination-item" data-testid="pagination-page">
        {currentPage}
      </span>
      <input
        type="submit"
        className="pagination-item clickable"
        value=">"
        disabled={isNextPage ? false : true}
        onClick={() => changePage(1)}
      />
    </div>
  );
};

export default Pagination;
