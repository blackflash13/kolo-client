import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../service/AuthService";


export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  getUser(user: IUser) {
    return user;
  }

  async login(login: string, password: string) {
    try {
      const response = await AuthService.login(login, password);
      localStorage.setItem("token", response.data.token);
      //   DataManager.save(AuthEnum.USER_EMAIL_STORAGE_KEY, login);
      //   DataManager.save(AuthEnum.ACCESS_TOKEN_STORAGE_KEY, response.data.token);
      console.log(response)
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(login: string, password: string, name: string) {
    try {
      const response = await AuthService.registration(login, password, name);
      console.log(response)
    //   DataManager.save(AuthEnum.USER_EMAIL_STORAGE_KEY, login);
    //   DataManager.save(AuthEnum.ACCESS_TOKEN_STORAGE_KEY, response.data.token);

      localStorage.setItem("token", response.data.token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
        console.log(e);
    }
  }

//   async checkAuth() {
//     this.setLoading(true);
//     try {
//       const response = await axios.get<AuthResponse>(
//         `${UrlHelper.SERVER_URL}/${UrlHelper.REFRESH}`,
//         { withCredentials: true }
//       );

//       localStorage.setItem("token", response.data.accessToken);
//       this.setAuth(true);
//       this.setUser(response.data.user);
//     } catch (e) {
//       console.log(e);
//     } finally {
//       this.setLoading(false);
//     }
//   }
}
