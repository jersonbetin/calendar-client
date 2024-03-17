export interface IAuthData {
  email: string;
  password: string;
}

export interface IAuth {
  id: string;
  email: string;
}

export interface ILoginData{
  token: string;
  user: IAuth;
}
