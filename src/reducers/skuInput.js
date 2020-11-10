const skuInput = (state="",action) => {
    switch(action.type){
        case 'CHAR_INPUT':
            if (state.length >= 13){
                return state;
            } else {
                return state + action.payload;
            }
        case 'CHAR_BKSPC':
            return state.slice(0,-1);
        case 'CHAR_CLEAR':
            return "";
        case 'SET_SKU':
            return action.payload;
        default:
            return state;
    }
};

export default skuInput;
