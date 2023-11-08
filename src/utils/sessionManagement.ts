import { deleteData, getData, setData } from "./storageService";

export const clearSession = (): void => {
  deleteData();
};

type Session = {
  token?: string;
  userName?: string;
  isLoggedIn: boolean;
};

export const addSession = (session: Session): void => {
  setData("userName", session.userName);
  setData("isLoggedIn", session.isLoggedIn);
  setData("Token", session.token);
};

export const checkIfLogin = (): boolean => !!getData("isLoggedIn") || false;

export const getAuthHeader = (): object | string | null => getData(`Token`);

export const getUserName = (): string => getData("userName");
