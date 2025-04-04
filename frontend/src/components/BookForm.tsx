import { useState } from "react";
import { Book } from "../types/Book";
import { addBook, editBook } from "../api/BooksAPI";

interface BookFormProps {
  book: Book | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const BookForm = ({ book, onSuccess, onCancel }: BookFormProps) => {
  const isEdit = book !== null ? true : false;
  const [formData, setFormData] = useState<Book>(
    book || {
      bookId: 0,
      title: "",
      author: "",
      publisher: "",
      isbn: "",
      classification: "",
      category: "",
      pageCount: 0,
      price: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await editBook(formData.bookId, formData);
    } else {
      await addBook(formData);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      <h2>{isEdit ? "Edit Book" : "Add New Book"}</h2>
      <div className="d-flex flex-column">
        <label htmlFor="form_title">Title:</label>
        <input
          type="text"
          name="title"
          id="form_title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="form_author">Author:</label>
        <input
          type="text"
          name="author"
          id="form_author"
          value={formData.author}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="form_publisher">Publisher:</label>
        <input
          type="text"
          name="publisher"
          id="form_publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="form_isbn">ISBN:</label>
        <input
          type="text"
          name="isbn"
          id="form_isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="form_classification">Classification:</label>
        <input
          type="text"
          name="classification"
          id="form_classification"
          value={formData.classification}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="form_category">Category:</label>
        <input
          type="text"
          name="category"
          id="form_category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="form_page_count">Page Count:</label>
        <input
          type="number"
          name="pageCount"
          id="form_page_count"
          value={formData.pageCount}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="form_price">Price:</label>
        <input
          type="number"
          name="price"
          id="form_price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <button type="submit">{isEdit ? "Update Book" : "Add Book"}</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default BookForm;
