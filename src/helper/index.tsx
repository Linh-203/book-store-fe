import { ORDER_OF_STATUS } from '../constants/orderStatus';

export const formatStringToDate = (isoString: string) => {
   const date = new Date(isoString);
   const RETURN_MONTH_FROM_0_TO_11 = 1;
   return `${date.getDate()}/${date.getMonth() + RETURN_MONTH_FROM_0_TO_11}/${date.getFullYear()}`;
};

export const uppercaseFirstLetter = (string: string) => {
   return string.charAt(0).toUpperCase() + string.slice(1);
};

export const transformCurrency = (value: string | number) => {
   const vndLocale = Intl.NumberFormat('vn', { style: 'currency', currency: 'vnd' });
   return vndLocale.format(Number(value));
};

export const transformStatusOrder = (status: string) => {
   let returnValue = { status: '', color: '' };
   ORDER_OF_STATUS.forEach((rawStatus) => {
      if (rawStatus.status.toLowerCase() === status) {
         returnValue = rawStatus;
      }
   });
   return returnValue;
};
