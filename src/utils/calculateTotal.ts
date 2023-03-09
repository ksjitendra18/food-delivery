// this function calculates the total amount and total price.
//  As it is used in orderPrice and checkout index page for reusing it I have made this function.

import Item from "../types/ItemType";

/**
 *
 * @param cartItems
 * @returns totalQuantity and totalPrice
 */

const getTotal = (cartItem: Item[]) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  cartItem.forEach((item: Item) => {
    totalQuantity += item.quantity!;
    totalPrice += item.itemPrice! * item.quantity!;
  });
  return { totalPrice, totalQuantity };
};

export default getTotal;
