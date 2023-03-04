import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Item from "../../types/ItemType";

export interface CartState {
  cart: Item[];
}

interface AddToCartPayload extends Item {
  id?: string;
}

interface IncreaseQuantityPayload {
  id: string;
}

interface DecreaseQuantityPayload {
  id: string;
}

interface RemoveItemPayload {
  id: string;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] } as CartState,
  reducers: {
    // addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
    //   const itemInCart = state.cart.find(
    //     (item: Item) => item._id === action.payload._id
    //   );
    //   console.log("action", action.payload._id);
    //   console.log("itemincart", itemInCart);
    //   if (itemInCart) {
    //     console.log("item is in cart", itemInCart);
    //     if (itemInCart.quantity !== undefined) {
    //       console.log("quantity", itemInCart.quantity);
    //       itemInCart.quantity++;
    //     }
    //   } else {
    //     console.log("this is called");
    //     state.cart.push({ ...action.payload, quantity: 1 });
    //   }
    // },

    addToCart: (state, action) => {
      console.log("add to cart ran");
      const itemInCart = state.cart.find(
        (item: Item) => item._id === action.payload._id
      );
      if (itemInCart) {
        if (itemInCart.quantity !== undefined) {
          console.log("item is in cart");
          itemInCart.quantity++;
        }
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        console.log("item is not in cart");
      }
    },
    increaseQuantity: (
      state,
      action: PayloadAction<IncreaseQuantityPayload>
    ) => {
      const item = state.cart.find((item) => item._id === action.payload.id);
      if (item && item.quantity !== undefined) {
        item.quantity++;
      }
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<DecreaseQuantityPayload>
    ) => {
      const item = state.cart.find((item) => item._id === action.payload.id);
      if (item && item.quantity !== undefined && item.quantity > 1) {
        item.quantity--;
      }
    },
    removeItem: (state, action: PayloadAction<RemoveItemPayload>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload.id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
