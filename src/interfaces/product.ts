export interface IProduct {
   _id: string;
   name: string;
   price: number;
   categoryId: string;
   author: string;
   desc: string;
   discount: number;
   // amount: number;
   image: string[];
   createAt: string;
}
export type InputProduct = Omit<IProduct, '_id' | 'createAt'>;
