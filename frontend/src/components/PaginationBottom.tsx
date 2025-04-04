interface PaginationBottomProps {
  pageNumber: number;
  totalPages: number;
  setPageNumber: (newPage: number) => void;
}

const PaginationBottom = ({
  pageNumber,
  totalPages,
  setPageNumber,
}: PaginationBottomProps) => {
  return (
    <div className="d-flex">
      <button
        disabled={pageNumber === 1}
        onClick={() => setPageNumber(pageNumber - 1)}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={`p${i + 1}`}
          onClick={() => setPageNumber(i + 1)}
          disabled={pageNumber === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNumber === totalPages}
        onClick={() => setPageNumber(pageNumber + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationBottom;
