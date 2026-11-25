
import { Search, X } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar premium-search-bar">
      <Search size={19} className="search-icon" />

      <input
        type="search"
        placeholder="Search by product name, ID, brand or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search products"
      />

      {searchTerm && (
        <button
          type="button"
          className="clear-search"
          onClick={() => setSearchTerm("")}
          aria-label="Clear search"
          title="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
