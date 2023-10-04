import { IImageResponse } from '../interfaces/image';
import instance from './instance';

export const uploadImages = (files: File[]) => {
   const formData = new FormData();
   for (const file of files) {
      formData.append('images', file);
   }
   return instance.post<IImageResponse>('/images', formData, { headers: { 'Content-Type': ' multipart/form-data' } });
};
