
import { Filter } from "lucide-react";

function CategoryFilter({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="category-filter">
      <div className="filter-label">
        <Filter size={18} />
        <span>Category:</span>
      </div>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
