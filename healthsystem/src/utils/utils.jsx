import { createContext } from "react";

export const LoginContext = createContext({
  loggedIn: false,
  setLogin: () => {},
  user: "",
  role: "",
});

export const timeId = {
  "8:00": false,
  "9:00": false,
  "10:00": false,
  "11:00": false,
  "12:00": false,
  "13:00": false,
  "14:00": false,
  "15:00": false,
  "16:00": false,
  "17:00": false,
  "18:00": false,
  "19:00": false,
};
