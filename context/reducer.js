export const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CARTITEMS: "SET_CARTITEMS",
  SET_SHIPPING_ADDRESS: "SET_SHIPPING_ADDRESS",
  SET_PAYMENT_METHOD: "SET_PAYMENT_METHOD",
  SET_SHIPPING_FEE: "SET_SHIPPING_FEE",
  SET_TOTAL_FEE: " SET_TOTAL_FEE",
  SET_ORDERS: "SET_ORDERS",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };

    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    case actionType.SET_CARTITEMS:
      // const newItem = action.items;
      // const existItem = state.cartItems.find(
      //   (product) => product.title === newItem.title
      // );

      // const cartItems = existItem ? state.cartItems.map((item)=> item.title === existItem.title ? newItem: item)
      // :[...state.cartItems, newItem];
      // return { ...state, cartItems };
      return {
        ...state,
        cartItems: action.cartItems,
      };
    case actionType.SET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.shippingAddress,
      };

    case actionType.SET_PAYMENT_METHOD:
      return {
        ...state,
        savePaymentMethod: action.savePaymentMethod,
      };

    case actionType.SET_SHIPPING_FEE:
      return {
        ...state,
        shippingFee: action.shippingFee,
      };

    case actionType.SET_TOTAL_FEE:
      return {
        ...state,
        totalFee: action.totalFee,
      };

    case actionType.SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };

    // case "CART_ADD_ITEM": {
    //   const newItem = action.newItem;
    //   const existItem = state.cart.cartItems.find(
    //     (item) => item.name === newItem.name
    //   );

    //   const cartItems = existItem
    //     ? state.cart.cartItems.map((item) =>
    //         item.name === existItem.name ? newItem : item
    //       )
    //     : [...state.cart.cartItems, newItem];
    //   return { ...state, cart: { ...state.cart, cartItems } };
    // }

    default:
      return state;
  }
};

export default reducer;
