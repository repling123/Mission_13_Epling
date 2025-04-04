import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import AdminBooksPage from "./pages/AdminBooks";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
