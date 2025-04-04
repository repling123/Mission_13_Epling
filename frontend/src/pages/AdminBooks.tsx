import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import PaginationTop from "../components/PaginationTop";
import PaginationBottom from "../components/PaginationBottom";
import BookForm from "../components/BookForm";
import { useNavigate } from "react-router-dom";

const AdminBooksPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("asc");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNumber, sortBy, []);
        setBooks(data.bookList);
        setTotalPages(Math.ceil(data.totalNumberBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [pageSize, pageNumber, sortBy]);

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm(
      "Hey, you sure about deleting this book?"
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.bookId !== bookId));
    } catch (error) {
      alert("Falied to delete the book. Please try again.");
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      <h1> Admin Page</h1>
      <button onClick={() => navigate("/")}>Back to Store</button>

      {/* Add and Edit form */}
      {!showForm && <button onClick={() => setShowForm(true)}>Add Book</button>}

      {showForm && (
        <BookForm
          book={null}
          onSuccess={() => {
            setShowForm(false);
            fetchBooks(pageSize, pageNumber, sortBy, []).then((data) => {
              setBooks(data.bookList);
            });
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingBook && (
        <BookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            fetchBooks(pageSize, pageNumber, sortBy, []).then((data) => {
              setBooks(data.bookList);
            });
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

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
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookId}>
              <td>{b.bookId}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>{b.price}</td>
              <td>{b.isbn}</td>
              <td>
                <button className="w-100" onClick={() => setEditingBook(b)}>
                  Edit
                </button>
                <button
                  className="w-100"
                  onClick={() => handleDelete(b.bookId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Page Controls */}
      <PaginationBottom
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default AdminBooksPage;
