import { useNavigate } from 'react-router-dom';
import './Pagination.css';
import React from 'react';

type PaginationProps = {
  currentPage: number;
  nextPage: string | null;
  previousPage: string | null;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const Pagination = (props: PaginationProps) => {
  const { currentPage, nextPage, previousPage, reload, setReload } = props;
  const navigate = useNavigate();

  const changePage = (step: number) => {
    const newPage = currentPage + step;
    setReload(!reload);
    navigate(`/${newPage}`);
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
