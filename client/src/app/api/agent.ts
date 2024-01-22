import axios, { AxiosResponse } from "axios";

import { MissingDocument } from "../models/missingDocument";
import User, { LoginRequest, UserFormValues } from "../models/user";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = false;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async (response) => {
  if (import.meta.env.DEV) await sleep();
  return response;
});

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Document = {
  list: () => requests.get<MissingDocument>("documents"),
  addDocument: (missingDocument: Partial<MissingDocument>) =>
    requests.post("documents", missingDocument),
  details: (id: Number) => requests.get(`documents/${id}`),
};

const Account = {
  current: () => requests.get<User>("accounts"),
  login: (loginRequest: LoginRequest) =>
    requests.post<User>("/account/login", loginRequest),
  register: (user: UserFormValues) =>
    requests.post<User>("account/register", user),
  setToken: (token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
};

const agent = {
  Document,
  Account,
};

export default agent;
