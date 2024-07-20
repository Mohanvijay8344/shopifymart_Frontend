import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      console.log(action);
      state.productList = [...action.payload];
    },
    addToCart: (state, action) => {
      const isCheck = state.cartItem.some((e) => e._id === action.payload._id);
      if (isCheck) {
        toast.error("Product already in cart...");
        return;
      } else {
        toast.success("Product added to cart successfully!");
        const product = action.payload;
        const newItem = { ...product, qty: 1, total: product.price };
        state.cartItem = [...state.cartItem, newItem];
        return;
      }
    },
    deleteCart: (state, action) => {
      console.log(action.payload);
      const index = state.cartItem.findIndex((e) => e._id === action.payload);
      console.log(index);
      state.cartItem.splice(index, 1);
      toast.error("Item Deleted...");
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((e) => e._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((e) => e._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
  },
});

export const {
  setDataProduct,
  addToCart,
  deleteCart,
  increaseQty,
  decreaseQty,
} = productSlice.actions;

export default productSlice.reducer;
