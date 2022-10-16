export const fetchUser = () => {
  const userInfo =
    typeof window !== "undefined"
      ? localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear()
      : null;

  return userInfo;
};

export const fetchCart = () => {
  const cartInfo =
    typeof window !== "undefined"
      ? localStorage.getItem("cartItems") !== "undefined"
        ? JSON.parse(localStorage.getItem("cartItems"))
        : localStorage.clear()
      : null;

  return cartInfo ? cartInfo : [];
};
