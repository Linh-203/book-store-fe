export interface IProduct {
   _id: string;
   name: string;
   price: number;
   categoryId: { cateName: string };
   author: string;
   desc: string;
   discount: number;
   // amount: number;
   image: { url: string }[];
   createAt: string;
}
export type InputProduct = Omit<IProduct, '_id' | 'createAt'>;
