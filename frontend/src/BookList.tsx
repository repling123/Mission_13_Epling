import { useEffect, useState } from "react";
import { Book } from "./types/Book";
import "./App.css";

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("asc");

  useEffect(() => {
    const fetchBooks = async () => {
      const url = `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortBy}`;
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.bookList);
      setTotalItems(data.totalNumberBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNumber, sortBy]);

  return (
    <>
      <div className="d-flex flex-column gap-3">
        {/* Controls: Results Per Page & Sorting */}
        <div className="d-flex justify-content-between">
          {/* Results Per Page */}
          <div className="d-flex gap-3">
            <label htmlFor="resultsPerPage">Results per page:</label>
            <select
              id="resultsPerPage"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="d-flex gap-3">
            <label htmlFor="sortBySelect">Sort by title:</label>
            <select
              id="sortBySelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>

        {/* Books List */}
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

              {/* Add to Cart Button */}
              <button
                style={{ backgroundColor: "#007bff", color: "blue" }}
                className="cart-scale"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="pagination-container">
          <button
            className="btn-custom-secondary"
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={`p${i + 1}`}
              className={`btn-custom-primary ${
                pageNumber === i + 1 ? "btn-active" : ""
              }`}
              onClick={() => setPageNumber(i + 1)}
              disabled={pageNumber === i + 1}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn-custom-secondary"
            disabled={pageNumber === totalPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default BookList;
