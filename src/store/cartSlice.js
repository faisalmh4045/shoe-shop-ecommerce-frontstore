import { createSlice } from "@reduxjs/toolkit";

const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  isOffcanvasOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const {
        productId,
        variantId,
        quantity,
        title,
        price,
        image,
        attributes,
      } = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          productId,
          variantId,
          quantity,
          title,
          price,
          image,
          attributes,
        });
      }

      saveCartToStorage(state.items);
    },

    removeItem: (state, action) => {
      const { productId, variantId } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId),
      );

      saveCartToStorage(state.items);
    },

    updateQuantity: (state, action) => {
      const { productId, variantId, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );

      if (item) {
        item.quantity = quantity;
      }

      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
