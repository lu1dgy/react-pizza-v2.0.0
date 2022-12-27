import React from 'react';
import { categories } from '../utils/constants';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (arg0: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => {
            return (
              <li
                key={index}
                onClick={() => onChangeCategory(index)}
                className={categoryId === index ? 'active' : ''}>
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default Categories;
