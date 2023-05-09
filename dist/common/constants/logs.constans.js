"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.META_CONTENT = exports.TRANSACTION_LOG_EVENT = void 0;
exports.TRANSACTION_LOG_EVENT = {
    CANCEL: 'ORDER_CANCEL',
    CANCEL_FROM_DMS: 'ORDER_CANCEL_FROM_DMS',
    RETURN: 'ORDER_RETURN',
    UPDATE_CSV: 'ORDER_UPDATE_OUTSTANDING_CSV',
    ORDER_DELIVERY_UPDATED: 'ORDER_DELIVERY_UPDATE_AMOUNT',
    ORDER_UPDATED: 'ORDER_UPDATED',
    CREATE_BNPL_ORDER_PAYMENT: 'CREATE_BNPL_ORDER_PAYMENT',
    UPDATE_BNPL_ORDER_PAYMENT: 'UPDATE_BNPL_ORDER_PAYMENT',
    AUTO_CALC_ORDER_FEE: 'AUTO_CALC_ORDER_FEE'
};
exports.META_CONTENT = {
    ORDER_SVC_CANCEL: 'Order service cancels an order',
    ORDER_SVC_CANCEL_FROM_DMS: 'DMS cancels an order',
    ORDER_SVC_RETURN: 'Order service returns an order',
    ORDER_OUTSTANDING_CSV: 'Update by outstanding csv upload',
    ORDER_DELIVERY_UPDATED: 'Update amount when delivered',
    ORDER_UPDATED_BY_PHOENIX: 'Order updated by phoenix',
    BNPL_ORDER_PAYMENT_CREATED_BY_CSV: 'Payment created by csv upload',
    BNPL_ORDER_PAYMENT_CREATED_BY_UPLOAD_PAYMENT_IMAGE: 'Payment created by upload payment image',
    BNPL_ORDER_PAYMENT_UPDATED_BY_CSV: 'Payment updated by csv upload',
    ORDER_AUTO_CALC_FEE: 'Order auto calc fee',
};
