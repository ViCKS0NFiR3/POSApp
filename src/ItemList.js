import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

function ItemList() {
    const itemList = useSelector(state => state.listItem)
    const list = itemList.map( (item,key) => <p key={key}>{item.name} {item.quantity} {item.price}</p>);
  return (
    <div>
        <h3>ITEM LIST:</h3>
        {list}
    </div>
  );
}

export default withRouter(ItemList);
