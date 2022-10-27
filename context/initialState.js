import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
  shippingAddress: {},
  savePaymentMethod: "",
  shippingFee: 0,
  totalFee: 0,
  orders:{},
};
