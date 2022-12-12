import React from 'react';
import { categories } from '../utils/constants';
function Categories({ categoryId, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={`${category}_${index}`}
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
