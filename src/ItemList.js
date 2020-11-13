import React from 'react';
import { useSelector } from 'react-redux';

function ItemList() {
    const itemList = useSelector(state => state.listItem)
    const list = itemList.map((item,key) => <p key={key}>{item.name} {item.quantity} {item.price.toFixed(2)}</p>);
    let total = 0
    itemList.map((item) => total = total + item.price);
  return (
    <div>
        <h3>ITEM LIST:</h3>
        <div>{list}</div>
        <h3>Total: Php {total.toFixed(2)}</h3>
    </div>
  );
}

export default ItemList;
