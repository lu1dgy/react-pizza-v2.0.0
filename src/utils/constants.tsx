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
  sort: string;
};

export const sortList: sortListItem[] = [
  { name: 'Popular(DESC)', sort: 'rating' },
  { name: 'Popular(ASC)', sort: '-rating' },
  { name: 'Price(DESC)', sort: 'price' },
  { name: 'Price(ASC)', sort: '-price' },
  { name: 'Abc(DESC)', sort: 'name' },
  { name: 'Abc(ASC)', sort: '-name' },
];
