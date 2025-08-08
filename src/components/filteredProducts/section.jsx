import { useEffect } from "react";

import style from "./style.module.scss";

const SectionList = ({
  filters,
  setFilters,
  isMobile,
  sortCriteria,
  setSortCriteria,
  products,
  setProducts,
}) => {
  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const categories = [...new Set(products.map((item) => item.category))];
  const brands = [...new Set(products.map((item) => item.brand))];
  const maxPrice = Math.max(...products.map((item) => item.price));

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <section
      className={`${isMobile ? style.container_sec : style.container_first}`}
    >
      <h3>Filters</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div className={style.container_options}>
          <select
            id="category-select"
            onChange={(e) => handleFilterChange("category", e.target.value)}
            value={filters.category}
          >
            <option value="all">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            id="brand-select"
            onChange={(e) => handleFilterChange("brand", e.target.value)}
            value={filters.brand}
          >
            <option value="">All Brands</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className={style.container_priceRange}>
          <label>
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </label>
          <input
            id="price-range"
            type="range"
            min="0"
            max={maxPrice}
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFilterChange("priceRange", [0, Number(e.target.value)])
            }
          />
        </div>

        <select
          id="rating-select"
          onChange={(e) => handleFilterChange("rating", Number(e.target.value))}
          value={filters.rating}
        >
          <option value={0}>All Ratings</option>
          <option value={4.5}>4.5 & Up</option>
          <option value={4}>4 & Up</option>
          <option value={3.5}>3.5 & Up</option>
        </select>
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className={style.sort}
        >
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    </section>
  );
};

export default SectionList;
