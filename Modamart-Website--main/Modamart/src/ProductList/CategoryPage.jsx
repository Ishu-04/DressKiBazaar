import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import mockDataWomen from '../data/mockDataWomen';
import mockDataMen from '../data/mockDataMen';
import mockDataKids from '../data/mockDataKids';
import mockDataUnisex from '../data/mockDataUnisex';
import mockDataAccessories from '../data/mockDataAcc';
import FilterCategory from '../ProductList/FilterCategory';
import { getFavourites, toggleFavourite } from '../Utils/favourites';
import './CategoryPage.css';
const rawImages = import.meta.glob('/src/assets/CategoryImage/*.{jpg,jpeg,png}', { eager: true });
const images = Object.entries(rawImages).reduce((acc, [path, module]) => {
  const filename = path.split('/').pop();
  acc[filename] = module.default;
  return acc;
}, {});

const rawAccImages = import.meta.glob('/src/assets/AccImage/*.{jpg,jpeg,png}', { eager: true });
const accImages = Object.entries(rawAccImages).reduce((acc, [path, module]) => {
  const filename = path.split('/').pop();
  acc[filename] = module.default;
  return acc;
}, {});

const priceRanges = [
  { label: 'Under ₹1000', test: (price) => price < 1000 },
  { label: '₹1000 - ₹5000', test: (price) => price >= 1000 && price <= 5000 },
  { label: 'Above ₹5000', test: (price) => price > 5000 },
];

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  // Controlled filter state
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    subCategory: [],
    color: [],
    size: [],
    pattern: [],
    occasion: [],
    embellishment: [],
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [likedIds, setLikedIds] = useState(getFavourites());

  // Reset filters when category changes for smooth navigation
  useEffect(() => {
    setSelectedFilters({
      price: [],
      subCategory: [],
      color: [],
      size: [],
      pattern: [],
      occasion: [],
      embellishment: [],
    });
  }, [categoryName]);

  // Filtering logic
  const applyFilters = () => {
    let dataSource;
    switch (categoryName.toLowerCase()) {
      case 'men':
        dataSource = mockDataMen;
        break;
      case 'women':
        dataSource = mockDataWomen;
        break;
      case 'kids':
        dataSource = mockDataKids;
        break;
      case 'unisex':
        dataSource = mockDataUnisex;
        break;
      case 'accessories':
        dataSource = mockDataAccessories;
        break;
      default:
        dataSource = [];
    }

    let results = dataSource.filter(
      (item) => item.category && item.category.toLowerCase() === categoryName.toLowerCase()
    );

    // Price filter
    if (selectedFilters.price.length > 0) {
      results = results.filter((product) =>
        selectedFilters.price.some((range) => {
          const rangeObj = priceRanges.find((r) => r.label === range);
          return rangeObj ? rangeObj.test(product.price) : true;
        })
      );
    }

    // Sub Category
    if (selectedFilters.subCategory.length > 0) {
      results = results.filter((product) =>
        selectedFilters.subCategory.includes(product.subCategory)
      );
    }

    // Color
    if (selectedFilters.color.length > 0) {
      results = results.filter((product) =>
        selectedFilters.color.includes(product.color)
      );
    }

    // Size
    if (selectedFilters.size.length > 0) {
      results = results.filter((product) =>
        selectedFilters.size.includes(product.size)
      );
    }

    // Pattern
    if (selectedFilters.pattern.length > 0) {
      results = results.filter((product) =>
        selectedFilters.pattern.includes(product.pattern)
      );
    }

    // Occasion
    if (selectedFilters.occasion.length > 0) {
      results = results.filter((product) =>
        selectedFilters.occasion.includes(product.occasion)
      );
    }

    // Embellishment
    if (selectedFilters.embellishment.length > 0) {
      results = results.filter((product) =>
        selectedFilters.embellishment.includes(product.embellishment)
      );
    }

    setFilteredProducts(results);
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line
  }, [selectedFilters, categoryName]);

  useEffect(() => {
    const handler = () => setLikedIds(getFavourites());
    window.addEventListener('likedCountUpdated', handler);
    return () => window.removeEventListener('likedCountUpdated', handler);
  }, []);

  // Find image for product (fallback to empty string if not found)
  const getProductImage = (product) => {
    if (categoryName.toLowerCase() === 'accessories') {
      return accImages[product.image] || '';
    }
    return images[product.imageName] || '';
  };

  const handleShare = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.origin + `/category-product/${product.id}`,
        files: undefined
      });
    } else {
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(product.title + '\n' + window.location.origin + `/category-product/${product.id}`)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const arr = prev[filterType];
      return {
        ...prev,
        [filterType]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const getSubCategories = () => {
    switch (categoryName.toLowerCase()) {
      case 'women':
        return [...new Set(mockDataWomen.map((item) => item.subCategory).filter(Boolean))];
      case 'men':
        return [...new Set(mockDataMen.map((item) => item.subCategory).filter(Boolean))];
      case 'kids':
        return [...new Set(mockDataKids.map((item) => item.subCategory).filter(Boolean))];
      case 'unisex':
        return [...new Set(mockDataUnisex.map((item) => item.subcategory || item.subCategory).filter(Boolean))];
      case 'accessories':
        return [...new Set(mockDataAccessories.map((item) => item.type).filter(Boolean))];
      default:
        return [];
    }
  };

  return (
    <div className="category-page">
      <h2>{categoryName.toUpperCase()} COLLECTION</h2>
      <div className="category-layout">
        <aside className="filter-section">
          <h3>FILTERS</h3>

          <FilterCategory title="Price">
            {priceRanges.map((range) => (
              <label key={range.label}>
                <input
                  type="checkbox"
                  checked={selectedFilters.price.includes(range.label)}
                  onChange={() => handleFilterChange('price', range.label)}
                />
                {range.label}
              </label>
            ))}
          </FilterCategory>

          <FilterCategory title="Sub Categories">
            {getSubCategories().map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={selectedFilters.subCategory.includes(item)}
                  onChange={() => handleFilterChange('subCategory', item)}
                />
                {item}
              </label>
            ))}
          </FilterCategory>

          <FilterCategory title="Color">
            {[
              'Red', 'Blue', 'Gold', 'Black', 'Pink', 'Violet', 'Lavender',
              'Brown', 'Yellow', 'Orange', 'White', 'Beige', 'Cream', 'Grey',
              'Purple', 'Peach', 'Maroon', 'Green', 'Ivory'
            ].map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  checked={selectedFilters.color.includes(color)}
                  onChange={() => handleFilterChange('color', color)}
                />
                {color}
              </label>
            ))}
          </FilterCategory>

          <FilterCategory title="Size">
            {['S', 'M', 'L', 'XL', 'XXL', 'Free'].map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  checked={selectedFilters.size.includes(size)}
                  onChange={() => handleFilterChange('size', size)}
                />
                {size}
              </label>
            ))}
          </FilterCategory>

          <FilterCategory title="Print & Patterns">
            {['Print', 'Floral', 'Jaipuri', 'Block Print', 'Viscose Rayon'].map((pattern) => (
              <label key={pattern}>
                <input
                  type="checkbox"
                  checked={selectedFilters.pattern.includes(pattern)}
                  onChange={() => handleFilterChange('pattern', pattern)}
                />
                {pattern}
              </label>
            ))}
          </FilterCategory>

          <FilterCategory title="Occasion">
            {['Wedding', 'Festive', 'Haldi', 'Mehendi', 'Sangeet', 'Reception', 'Pooja', 'Casual'].map((occ) => (
              <label key={occ}>
                <input
                  type="checkbox"
                  checked={selectedFilters.occasion.includes(occ)}
                  onChange={() => handleFilterChange('occasion', occ)}
                />
                {occ}
              </label>
            ))}
          </FilterCategory>

          <FilterCategory title="Embellishment">
            {['Resham Work', 'Sequins Work', 'Cutdana', 'Mirror Work', 'Pearl Work', 'Stone Work', 'Thread Work', 'Zari Work', 'Leather Work'].map((embellish) => (
              <label key={embellish}>
                <input
                  type="checkbox"
                  checked={selectedFilters.embellishment.includes(embellish)}
                  onChange={() => handleFilterChange('embellishment', embellish)}
                />
                {embellish}
              </label>
            ))}
          </FilterCategory>
        </aside>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              style={{ cursor: 'pointer', position: 'relative' }}
              onClick={() => navigate(`/category-product/${product.id}`)}
            >
              <img
                src={getProductImage(product)}
                alt={product.title || product.name}
                className="product-img"
              />
              <div
                style={{
                  position: 'absolute',
                  top: 11,
                  right: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 6,
                  zIndex: 2,
                }}
              >
                <FaHeart
                  className="like-icon"
                  color={likedIds.includes(product.id) ? 'red' : 'gray'}
                  style={{
                    background: 'black',
                    borderRadius: '50%',
                    padding: 6,
                    fontSize: 22,
                    cursor: 'pointer',
                    opacity: 1,
                    visibility: 'visible',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourite(product.id);
                    setLikedIds(getFavourites());
                  }}
                />
                <FaShareAlt
                  className="share-icon"
                  style={{
                    background: 'black',
                    borderRadius: '50%',
                    padding: 6,
                    fontSize: 22,
                    cursor: 'pointer',
                    opacity: 1,
                    visibility: 'visible',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(product);
                  }}
                  title="Share"
                />
              </div>
              <h3>{product.title || product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p>No products found for selected filters in {categoryName}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

























































































































































