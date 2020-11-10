const productQuantity = (state=1, action) => {
    switch(action.type) {
        case 'ADD_QUANTITY':
            return state + 1;
        case 'SUB_QUANTITY':
            return state - 1;
        case 'CLEAR_QUANTITY':
            return 1;
        default: 
            return state;
    }
}

export default productQuantity;