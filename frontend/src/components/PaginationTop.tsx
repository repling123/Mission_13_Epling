interface PaginationTopProps {
  pageSize: number;
  sortBy: string;
  changePageSize: (newSize: number) => void;
  changeSortBy: (sortString: string) => void;
}

const PaginationTop = ({
  pageSize,
  sortBy,
  changePageSize,
  changeSortBy,
}: PaginationTopProps) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex gap-3">
        <label htmlFor="resultsPerPage">Results per page:</label>
        <select
          id="resultsPerPage"
          value={pageSize}
          onChange={(p) => changePageSize(Number(p.target.value))}
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>
      </div>
      <div className="d-flex gap-3">
        <label htmlFor="sortBySelect">Sort by title:</label>
        <select
          id="sortBySelect"
          value={sortBy}
          onChange={(p) => changeSortBy(p.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationTop;
