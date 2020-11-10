import skuInput from './skuInput';
import findProduct from './findProduct';
import listItem from './listItems';
import productQuantity from './productQuantity';
import paymentHandler from './paymentHandler';

import { combineReducers } from 'redux';

const allReducer = combineReducers({
    skuInput,
    findProduct,
    listItem,
    productQuantity,
    paymentHandler
})

export default allReducer;