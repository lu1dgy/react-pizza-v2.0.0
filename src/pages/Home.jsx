import React from 'react';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/index';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';
import NotFound from './NotFound';
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  SetFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, pizzaDataSelector } from '../redux/slices/pizzasSlice';
import { sortList } from '../utils/constants';

function Home() {
  //redux
  const { items, status } = useSelector(pizzaDataSelector);
  const { sortProp, categoryId, currentPage, searchValue } =
    useSelector(filterSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);

  const onCLickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const getPizzas = async () => {
    //axios options
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const sortBy = sortProp.sort.replace('-', '');
    const order = sortProp.sort[0] === `-` ? `asc` : `desc`;
    const search = searchValue ? `&search=${searchValue}` : ``;

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        search,
        currentPage,
      })
    );
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProp: sortProp.sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [categoryId, sortProp, searchValue, currentPage]);

  //if 1st render then fetch
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sort === params.sortProp);
      dispatch(
        SetFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sortProp, searchValue, currentPage]);

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
      {status === 'error' ? (
        <NotFound />
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
