import React from 'react';
import axios from 'axios';
import Product from './Product';
import { useSelector, useDispatch } from 'react-redux';
import * as action from './actions';

function App(props) {
  const postRequest = (path) => {
    //if (sku.length >= 12 ){
    const sku = props.store.getState().skuInput;
    //console.log(sku)
    if(sku.length >= 13){
      const url_path = `http://localhost:5000/${path}`;
      axios.post(url_path,{
        sku 
      }).then( (response) => {
          //console.log(response);
          const { data } = response;
          dispatch(action.search_sku(data));
      },(error) => {
      console.error(error);
      });
    } 
  };

  const onEnter = ( sku, event) => {
    dispatch(action.add_char(event.currentTarget.value));
    postRequest("pos/get/product",sku);
  }
  
  const skuInput = ( sku, event) => {
    dispatch(action.set_sku(event.target.value));
    postRequest("pos/get/product",sku); 
  };

  const add_prod_q = () => {
    console.log(props.store.getState().skuInput);
    if (quantity < 99){
      dispatch(action.add_quantity());
    } 
  };

  const sub_prod_q = () => {
    console.log(props.store.getState().skuInput);
    if (quantity > 1) {
      dispatch(action.sub_quantity());
    }
  };

  const submit = (product, quantity, itemList) => {
    const itemEntry = {...product};
    itemEntry.price = parseFloat(itemEntry.price.replace('Php ','')) * quantity;
    itemEntry.quantity = quantity;
    itemEntry.sku = product.sku;
    console.log(`SKU: ${product.sku}`);
    console.log(`ITEM ENTRY: ${itemEntry.sku}`);
    for (let i=0; i <= itemList.length; i++){
      console.log(itemList)
      if (itemList.length === 0){
        console.log('Added new Item')
        dispatch(action.submitItem(itemEntry));
        break;
      } else if(Object.values(itemList[i]).includes(product.short_name)){
        dispatch(action.updateItem(itemEntry));
        break;
      } else {
        console.log('Added new Item')
        dispatch(action.submitItem(itemEntry));
        break;
      }
    };
    dispatch(action.clear_char())
    dispatch(action.clear_sku());
    dispatch(action.clear_quantity());
  };

  const onPay = (itemList) => {
    if (itemList.length !== 0 ){
      const url_path = `http://localhost:5000/pos/pay`;
      axios.post(url_path,{
        itemList 
      }).then( (response) => {
        const { data } = response;
        console.log(data);
      },(error) => {
      console.error(error);
      });
    } else {
      console.log("No items in List.");
    }
  };

  const dispatch = useDispatch();
  const sku = useSelector(state => state.skuInput);
  const quantity = useSelector(state => state.productQuantity);
  const product = useSelector(state => state.findProduct);
  const itemList = useSelector(state => state.listItem);

  return (
    <div>
      <h1>Point-of-Sale System</h1>
      <Product />
      <input id="sku" 
      onInput={(e) => {skuInput( sku, e )}} 
      onFocus = {() => dispatch(action.clear_char())} 
      type="textField" value={sku}/><br/>
      <h3>Quantity: 
        <input type="number" value={quantity}></input>
        <button onClick={() => {add_prod_q()}}>+</button>
        <button onClick={() => {sub_prod_q()}}>-</button>
      </h3>
      <table>
        <tbody>
          <tr>
            <td><button value="1" onClick={(e) => {onEnter(sku, e)}}>1</button></td>
            <td><button value="2" onClick={(e) => {onEnter(sku, e)}}>2</button></td>
            <td><button value="3" onClick={(e) => {onEnter(sku, e)}}>3</button></td>
            <td><button onClick={() => dispatch(action.bksp_char())}>X</button></td>
          </tr>
          <tr>
            <td><button value="4" onClick={(e) => {onEnter(sku, e)}}>4</button></td>
            <td><button value="5" onClick={(e) => {onEnter(sku, e)}}>5</button></td>
            <td><button value="6" onClick={(e) => {onEnter(sku, e)}}>6</button></td>
            <td><button onClick={() => dispatch(action.clear_char())}>CLEAR</button></td>
          </tr>
          <tr>
            <td><button value="7" onClick={(e) => {onEnter(sku, e)}}>7</button></td>
            <td><button value="8" onClick={(e) => {onEnter(sku, e)}}>8</button></td>
            <td><button value="9" onClick={(e) => {onEnter(sku, e)}}>9</button></td>
            <td><button>VOID</button></td>
          </tr>
          <tr>
            <td><button>.</button></td>
            <td><button value="0" onClick={(e) => {onEnter(sku, e)}}>0</button></td>
            <td><button>#</button></td>
            <td><button onClick={() => submit(product, quantity, itemList)}>ENTER</button></td>
          </tr>
          <tr>
            <td colSpan="4">
              <button onClick={props.onClick}>PAY</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
