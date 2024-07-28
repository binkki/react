import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../store/slices/appSlice';
import { RootState } from '../../store';
import './Pagination.css';

const Pagination = () => {
  const currentPage = useSelector((state: RootState) => state.app.page);
  const characters = useSelector((state: RootState) => state.app.characters);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changePage = (step: number) => {
    const newPage = currentPage + step;
    dispatch(setPage(newPage));
    navigate(`/${newPage}`);
  };

  return (
    <div className="pagination flex">
      <input
        type="submit"
        className="pagination-item clickable"
        value="<"
        disabled={characters && characters.previous ? false : true}
        onClick={() => changePage(-1)}
      />
      <span className="pagination-item" data-testid="pagination-page">
        {currentPage}
      </span>
      <input
        type="submit"
        className="pagination-item clickable"
        value=">"
        disabled={characters && characters.next ? false : true}
        onClick={() => changePage(1)}
      />
    </div>
  );
};

export default Pagination;
