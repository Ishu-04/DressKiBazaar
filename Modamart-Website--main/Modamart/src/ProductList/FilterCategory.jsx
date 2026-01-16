// src/components/FilterCategory.jsx
import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FilterCategory = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="filter-category">
      <div className="filter-header" onClick={toggleOpen}>
        <span>{title}</span>
        <span className="toggle-icon">{isOpen ? <FaMinus /> : <FaPlus />}</span>
      </div>
      {isOpen && <div className="filter-content">{children}</div>}
    </div>
  );
};

export default FilterCategory;