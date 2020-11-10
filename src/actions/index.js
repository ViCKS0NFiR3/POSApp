export const add_char = char => {
    return {
        type: 'CHAR_INPUT',
        payload: char
    };
};

export const set_sku = sku => {
    return {
        type: 'SET_SKU',
        payload: sku
    };
};

export const bksp_char = () => {
    return {
        type: 'CHAR_BKSPC'
    };
};

export const clear_char = () => {
    return {
        type: 'CHAR_CLEAR'
    };
};

export const search_sku = (payload) => {
    return {
        type: 'SEARCH_SKU',
        payload
    };
};

export const clear_sku = () => {
    return {
        type: 'CLEAR_SKU'
    };
};

export const add_quantity = () => {
    return {
        type: 'ADD_QUANTITY'
    };
};

export const sub_quantity = () => {
    return {
        type: 'SUB_QUANTITY'
    };
};

export const clear_quantity = () => {
    return {
        type: 'CLEAR_QUANTITY'
    };
};

let listId = 0;

export const submitItem = (item_entry) => {
    return {
        type: 'ADD_ITEM',
        payload: {
            id: ++listId,
            name: item_entry.short_name,
            quantity: item_entry.quantity,
            price: item_entry.price,
            sku: item_entry.sku
        }
    };
};

export const updateItem = (item_entry) => {
    return {
        type: 'UPDATE_EXISTING',
        payload: {
            name: item_entry.short_name,
            quantity: item_entry.quantity,
            price: item_entry.price,
            sku: item_entry.sku
        }
    };
};

export const addPaymentValue = (value) => {
    return {
        type: 'ADD_VALUE',
        payload: value
    };
};

export const setPaymentValue = (value) => {
    return {
        type: 'SET_VALUE',
        payload: value

    };
};

export const clearPaymentValue = () => {
    return {
        type: 'RESET_VALUE'
    };
};