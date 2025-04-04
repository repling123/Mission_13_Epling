using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Epling.Data;

namespace Mission11_Epling.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookContext _bookContext;

        public BookController(BookContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNumber = 1, string sortBy = "asc", [FromQuery] List<string>? categories = null)
        {
            // Create query object from db table
            var booksQuery = _bookContext.Books.AsQueryable();

            // Ignore "The " when a tital starts with "The " for sorting purposes
            if (sortBy.ToLower() == "desc")
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title.StartsWith("The ")
                    ? b.Title.Substring(4)
                    : b.Title);
            }
            else
            {
                booksQuery = booksQuery.OrderBy(b => b.Title.StartsWith("The ")
                    ? b.Title.Substring(4)
                    : b.Title);
            }

            // Filter by categories
            if (categories != null && categories.Any())
            {
                booksQuery = booksQuery.Where(b => categories.Contains(b.Category));
            }

            int totalNumberBooks = booksQuery.Count();

            // Main query
            var bookList = booksQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Return object includes two items
            var returnObject = new
            {
                BookList = bookList,
                TotalNumberBooks = totalNumberBooks
            };

            return Ok(returnObject);
        }

        [HttpGet("AllBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }

        [HttpPost("Add")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("Edit/{bookId}")]
        public IActionResult EditBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);

            if (existingBook == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("Delete/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var bookToDelete = _bookContext.Books.Find(bookId);

            if (bookToDelete == null)
            {
                return NotFound(new { message = "Book not found." });
            }

            _bookContext.Books.Remove(bookToDelete);
            _bookContext.SaveChanges();

            return NoContent();
        }
    }
}