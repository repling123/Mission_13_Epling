import { Book } from "../types/Book";

interface FetchBookResponse {
  bookList: Book[];
  totalNumberBooks: number;
}

const api_url = "https:/localhost:5000/api/Book";

export const fetchBooks = async (
  pageSize: number,
  pageNumber: number,
  sortBy: string,
  selectedCategories: string[]
): Promise<FetchBookResponse> => {
  try {
    const categoryParameters = selectedCategories
      .map((c) => `categories=${encodeURIComponent(c)}`)
      .join("&");

    const url = `${api_url}/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortBy}${
      selectedCategories.length ? `&${categoryParameters}` : ""
    }`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books", error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    let url = `${api_url}/Add`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to add book :(");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding book", error);
    throw error;
  }
};

export const editBook = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    let url = `${api_url}/Edit/${bookId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error("Failed to edit book :(");
    }

    return await response.json();
  } catch (error) {
    console.error("Error editing book", error);
    throw error;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    let url = `${api_url}/Delete/${bookId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete book, huh");
    }
  } catch (error) {
    console.error("Error deleting book", error);
    throw error;
  }
};
