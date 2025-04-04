import { useEffect, useState } from "react";

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = "https://localhost:5000/api/Book/AllBookCategories";
        const response = await fetch(url);
        const data = await response.json();

        setCategories(data);
      } catch (e) {
        console.log("Error fetching book categories:", e);
      }
    };
    fetchCategories();
  }, []);

  function handleCheckbox({ target }: { target: HTMLInputElement }) {
    let updatedCategories;
    if (selectedCategories.includes(target.value)) {
      updatedCategories = selectedCategories.filter((x) => x !== target.value);
    } else {
      updatedCategories = [...selectedCategories, target.value];
    }
    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filters-container">
      {/* Bootstrap feature not covered! Text Alignment at https://getbootstrap.com/docs/5.3/content/typography/#alignment */}
      <h2 className="text-start">Book Categories</h2>
      <div className="category-filters-list">
        {categories.map((c) => (
          <div key={c} className="d-flex gap-2">
            <input type="checkbox" id={c} value={c} onChange={handleCheckbox} />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
