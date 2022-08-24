import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
  static async login(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("auth/login", { login, password });
  }

  static async registration(
    login: string,
    password: string,
    name: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("auth/register", { login, password, name });
  }

  static async logout(): Promise<void> {
    // return $api.post(UrlHelper.LOGOUT);
    return $api.post("auth/logout");
  }
}
