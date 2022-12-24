import React from 'react';
import { categories } from '../utils/constants';

type CategoriesProps = {
  categoryId: number;
  onClickCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({
  categoryId,
  onClickCategory,
}) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
