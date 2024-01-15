import { makeAutoObservable, runInAction } from "mobx";
import { LoginRequest, User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Router";

class UserStore {
  user: User | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: LoginRequest) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("document/documents");
    } catch (error) {
      throw error;
    }
  };

  logout = async() => {
    try {
        const user = await agent.Account.current();
        runInAction(() => (this.user = user))
    } catch (error) {
        console.log(error)
    }
  }

  register = async (creds: UserFormValues) => {
    try {
        const user = await agent.Account.register(creds);
        store.commonStore.setToken(user.token)
        runInAction(() => (this.user = user));
        router.navigate("/document/documents")
    } catch (error) {
        console.log(error);
    }
  }
}

export default UserStore;
