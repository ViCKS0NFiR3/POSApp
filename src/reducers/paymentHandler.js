const paymentHandler = (state=0, action) => {
    switch(action.type) {
        case 'ADD_VALUE':
            return state + parseInt(action.payload);
        case 'SET_VALUE':
            return parseInt(action.payload);
        case 'CLEAR_VALUE':
            return '';
        case 'RESET_VALUE':
            return 0;
        default:
            return state;
    }
}

export default paymentHandler;