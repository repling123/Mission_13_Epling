import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import HandleCart from "./HandleCart";
import { fetchBooks } from "../api/BooksAPI";
import PaginationBottom from "./PaginationBottom";
import PaginationTop from "./PaginationTop";
import "../App.css";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("asc");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNumber,
          sortBy,
          selectedCategories
        );
        setBooks(data.bookList);
        setTotalPages(Math.ceil(data.totalNumberBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNumber, sortBy, selectedCategories]);

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <>
      <div className="d-flex flex-column gap-3">
        {/* Items per page and Sort */}
        <PaginationTop
          pageSize={pageSize}
          sortBy={sortBy}
          changePageSize={(newSize) => {
            setPageSize(newSize);
            setPageNumber(1);
          }}
          changeSortBy={(sortString) => {
            setSortBy(sortString);
          }}
        />
        {/* Cards */}
        {books.map((b) => (
          <div className="card" key={`b_id${b.bookId}`}>
            <div className="card-header">
              <h2 className="card-title">
                {b.title} &ndash; {b.author}
              </h2>
            </div>
            <div className="card-body">
              <p className="card-price">${b.price}</p>
              <p className="card-info">
                {b.classification}, {b.category} | {b.pageCount} pages |
                Published by {b.publisher}
              </p>
              <p className="card-isbn">ISBN: {b.isbn}</p>
              <HandleCart bookId={b.bookId} title={b.title} price={b.price} />
            </div>
          </div>
        ))}

        {/* Page Controls */}
        <PaginationBottom
          pageNumber={pageNumber}
          totalPages={totalPages}
          setPageNumber={setPageNumber}
        />
      </div>
    </>
  );
}

export default BookList;
