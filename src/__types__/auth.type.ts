export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

interface ILogin {
  type: typeof LOGIN;
  payload: {
    phoneNumber: string;
    password: string;
  };
}
