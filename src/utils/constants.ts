import { SortPropertyEnum } from '../redux/slices/filter/types';

export const categories: string[] = [
  'All',
  'Meat',
  'Vegeterian',
  'Grill',
  'Hot',
  'Calcone',
];
export const typeDough = ['Thin', 'Traditional'];

export type sortListItem = {
  name: string;
  sort: SortPropertyEnum;
};

export const sortList: sortListItem[] = [
  { name: 'Popular(DESC)', sort: SortPropertyEnum.RATING_DESC },
  { name: 'Popular(ASC)', sort: SortPropertyEnum.RATING_ASC },
  { name: 'Price(DESC)', sort: SortPropertyEnum.PRICE_DESC },
  { name: 'Price(ASC)', sort: SortPropertyEnum.PRICE_ASC },
  { name: 'Abc(DESC)', sort: SortPropertyEnum.NAME_DESC },
  { name: 'Abc(ASC)', sort: SortPropertyEnum.NAME_ASC },
];
