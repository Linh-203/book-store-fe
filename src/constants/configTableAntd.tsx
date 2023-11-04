// // import { IProductExpanded } from '../interfaces/product';
// import { IResponseHasPaginate } from '../interfaces/base';
// import { IUser } from '../interfaces/auth';
// type DataType = {
//    key: string;
//    _id: string;
// };
// type ProductDataType = DataType & {
//    image: string;
//    productName: string;
//    category: string;
//    subCategory: string;
//    brand: string;
//    price: number;
//    stock: 'Còn hàng' | 'Hết hàng';
// };

// type UserDataType = DataType & {
//    avatar?: string;
//    userName?: string;
//    email?: string;
//    phoneNumber?: string;
//    address?: string;
//    role?: 'admin' | 'member';
//    order?: string[];
//    notifications?: string[];
//    vouchers?: string[];
//    state?: boolean;
// };

// export const productData = (data: IResponseHasPaginate<IProductExpanded>): ProductDataType[] => {
//    return data.body.docs.map((product, index) => ({
//       key: index.toString(),
//       _id: product._id,
//       productName: product.productName,
//       price: product.price,
//       brand: product.brandId.brandName,
//       category: product.categoryId.cateName,
//       subCategory: product.subCateId.subCateName,
//       stock: product.amount > 0 ? 'Còn hàng' : 'Hết hàng',
//       image: product.images[0]
//    }));
// };

// export const userData = (data: IResponseHasPaginate<IUser>): UserDataType[] => {
//    return data.body.docs.map((user, index) => ({
//       key: index.toString(),
//       _id: user._id,
//       userName: user.userName,
//       avatar: user.avatar,
//       address: user.address,
//       phoneNumber: user.phoneNumber,
//       email: user.email,
//       role: user.role,
//       state: user.state,
//       order: user.orders,
//       notifications: user.notification,
//       vouchers: user.voucher
//    }));
// };
