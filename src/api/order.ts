import { AxiosResponse } from 'axios';
import instance from './instance';
import { IResponse } from '../interfaces/base';
import { IOrderFull } from '../interfaces/order';

export const getDetailOrder = (id: string): Promise<AxiosResponse<IResponse<IOrderFull>>> => {
   return instance.get('orders/' + id);
};
export const getOrder = (): Promise<AxiosResponse<IResponse<IOrderFull[]>>> => {
   return instance.get('orders');
};

export const getOrderForMember = (): Promise<AxiosResponse<IResponse<IOrderFull[]>>> => {
   return instance.get('/orders-member', {
      withCredentials: true
   });
};
