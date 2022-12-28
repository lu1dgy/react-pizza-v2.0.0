import { cartItem } from './../redux/slices/cart/types';
export const countTotalPrice = (state: cartItem[]) => {
  return state.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
