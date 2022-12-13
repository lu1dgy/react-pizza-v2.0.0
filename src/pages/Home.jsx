import React from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/index';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'Popular(DESC)',
    sort: 'rating',
  });

  //fetch options
  const category = categoryId > 0 ? `category=${categoryId}` : ``;
  const sortBy = sortType.sort.replace('-', '');
  const order = sortType.sort[0] === `-` ? `asc` : `desc`;
  const search = searchValue ? `&search=${searchValue}` : ``;

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6394ee6886829c49e82ab259.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((pizza) => (
    <PizzaBlock {...pizza} key={`${pizza.name}_${pizza.id}`} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(index) => setCategoryId(index)}
        />
        <Sort sortType={sortType} onClickType={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </div>
  );
}

export default Home;
