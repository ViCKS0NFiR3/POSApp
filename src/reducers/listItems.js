const listItem = (state=[], action) => {
    switch(action.type) {
        case 'ADD_ITEM':
            return [...state, 
                {
                    name: action.payload.name,
                    quantity: action.payload.quantity,
                    price: action.payload.price,
                    sku: action.payload.sku
                }
            ];
        case 'VOID_ITEM':
            return {};
        
        case 'UPDATE_EXISTING':
            return state.map(item => 
                item.name !== action.payload.name ? item: {...item, 
                    quantity:item.quantity + action.payload.quantity,
                    price:item.price + action.payload.price
                }
            );

        default:
            return state;
    }
}

export default listItem;
