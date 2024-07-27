import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../store/slices/appSlice';
import './Pagination.css';
import { RootState } from '../../store';

type PaginationProps = {
  isNextPage: string | null;
  isPreviousPage: string | null;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const Pagination = (props: PaginationProps) => {
  const { isNextPage, isPreviousPage, reload, setReload } = props;
  const currentPage = useSelector((state: RootState) => state.app.page);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changePage = (step: number) => {
    const newPage = currentPage + step;
    dispatch(setPage(newPage));
    setReload(!reload);
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
