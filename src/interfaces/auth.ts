export interface ErrorResponse {
   data: {
      message: string;
   };
}

export interface DataAuthResponse {
   accessToken: string;
   message: string;
   expires: number;
   data: IUser;
}

export interface AuthSignupInput {
   email: string;
   userName: string;
   password: string;
   avatar?: string;
   confirmPassword: string;
}

export interface AuthLoginInput {
   email: string;
   password: string;
}

export interface IUser {
   _id?: string;
   name: string;
   email: string;
   password?: string;
   phoneNumber?: string;
   address?: string;
   avatar?: string;
   role?: 'admin' | 'member';
   cartId?: string;
   orders?: string[];
   notifications?: string[];
   voucher?: string[];
   state?: boolean;
   createAt?: string;
}

export type InputUser = Omit<IUser, '_id' | 'createAt'>;

export interface TokenResponse {
   accessToken: string;
   data: IUser;
}
