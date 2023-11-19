import { createContext } from "react";

export const LoginContext = createContext({
  loggedIn: false,
  setLogin: () => {},
  user: "",
  role: "",
});

export const timeId = {
  1: "8:00",
  2: "9:00",
  3: "10:00",
  4: "11:00",
  5: "12:00",
  6: "13:00",
  7: "14:00",
  8: "15:00",
  9: "16:00",
  10: "17:00",
  11: "18:00",
  12: "19:00",
};
