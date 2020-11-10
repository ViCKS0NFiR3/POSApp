
const findProduct = (state={},action) => {
    switch(action.type){
        case 'SEARCH_SKU':
            return  {...action.payload}
        case 'CLEAR_SKU':
            return {};
        default:
            return state;
    }
};

export default findProduct;