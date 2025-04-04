import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import Header from "../components/Header";
import CartLink from "../components/CartLink";
import { useNavigate } from "react-router-dom";

function BooksPage() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <CartLink />
      <Header />
      <button
        style={{ backgroundColor: "#007bff", color: "white" }}
        className="cart-scale"
        onClick={() => navigate("/admin")}
      >
        Admin Page
      </button>
      <div className="container w-100">
        <div className="row w-100">
          <div className="col-lg-2">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-lg-10">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;
