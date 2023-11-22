import { createContext } from "react";

export const LoginContext = createContext({
  loggedIn: false,
  setLogin: () => {},
  user: "",
  role: "",
});

export const timeId = {
  "8:00": true,
  "9:00": true,
  "10:00": true,
  "11:00": true,
  "12:00": true,
  "13:00": true,
  "14:00": true,
  "15:00": true,
  "16:00": true,
  "17:00": true,
  "18:00": true,
  "19:00": true,
};
