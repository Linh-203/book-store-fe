export const SUCCESS_ORDER = 'Giao hàng thành công';
export const PENDING_ORDER = 'Chờ xác nhận';
export const SHIPPING_ORDER = 'Đang giao hàng';
export const FAIL_ORDER = 'Đã hủy đơn hàng';
export const DONE_ORDER = 'Đã nhận được hàng';

export const ORDER_OF_STATUS = [
   { status: PENDING_ORDER, color: '#e3dc1c' },
   { status: SHIPPING_ORDER, color: '#e77e18' },
   { status: SUCCESS_ORDER, color: '#80b235' }
];
