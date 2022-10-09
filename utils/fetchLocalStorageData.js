export const fetchUser = () => {
  const userInfo =
    typeof window !== "undefined"
      ? localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear()
      : null;

  return userInfo;
};
