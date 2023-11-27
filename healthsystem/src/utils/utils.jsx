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

export const timeIdTrueDefault = {
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
