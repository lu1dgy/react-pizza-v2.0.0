import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/index';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

function Home() {
  //redux
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sortProp.sort);

  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onCLickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  //fetch options
  const category = categoryId > 0 ? `category=${categoryId}` : ``;
  const sortBy = sortType.replace('-', '');
  const order = sortType[0] === `-` ? `asc` : `desc`;
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
        <Categories categoryId={categoryId} onClickCategory={onCLickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </div>
  );
}

export default Home;
