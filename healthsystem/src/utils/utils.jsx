import { createContext } from "react";

export const LoginContext = createContext({
  loggedIn: false,
  setLogin: () => {},
  user: "",
});
