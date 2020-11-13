import React from 'react';
import axios from 'axios';
import Product from './Product';
import { useSelector, useDispatch } from 'react-redux';
import * as action from './actions';
import history from './History';
import Modal from '@material-ui/core/Modal';

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
  
  const prodOnSubmit = (product, quantity, itemList) => {
    if(Object.keys(product).length !== 0){
      submitProcess(product, quantity, itemList);
    } else {
      productModalOpen(true);
    }
  }

  const submitProcess = (product, quantity, itemList) => {
    const itemEntry = {...product};
    itemEntry.price = parseFloat(itemEntry.price.replace('Php ','')) * quantity;
    itemEntry.quantity = quantity;
    itemEntry.sku = product.sku;
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
    clearOnSubmit();
  };

  const clearOnSubmit = () => {
    dispatch(action.clear_char())
    dispatch(action.clear_sku());
    dispatch(action.clear_quantity());
  };


  const dispatch = useDispatch();
  const sku = useSelector(state => state.skuInput);
  const quantity = useSelector(state => state.productQuantity);
  const product = useSelector(state => state.findProduct);
  const itemList = useSelector(state => state.listItem);
  const [payOpen, payModalOpen] = React.useState(false);
  const [prodOpen, productModalOpen] = React.useState(false);

  const payErrorOpen = () => {
    payModalOpen(true);
  };

  const payErrorClose = () => {
    payModalOpen(false);
  };

  const prodErrorClose = () => {
    productModalOpen(false);
  };

  const payErrorModal = (
    <div>
      <h3>NOTICE</h3>
      <p>No items in Item List</p>
    </div>
  );

  const prodErrorModal = (
    <div>
      <h3>NOTICE</h3>
      <p>Item Not Found</p>
    </div>
  );

  const switchToPay = () => {
    if(Object.keys(itemList).length !== 0){
      console.log("Switch to Payment Page");
      history.push("/pay");
    } else {
      console.log("Error Encountered");
      payErrorOpen();
    }
  };

  return (
    <div>
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
      <Modal
        open={prodOpen}
        onClose={prodErrorClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {prodErrorModal}
      </Modal>
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
            <td><button onClick={() => dispatch(action.clearItem())}>VOID</button></td>
          </tr>
          <tr>
            <td><button>.</button></td>
            <td><button value="0" onClick={(e) => {onEnter(sku, e)}}>0</button></td>
            <td><button>#</button></td>
            <td><button onClick={() => prodOnSubmit(product, quantity, itemList)}>ENTER</button></td>
          </tr>
          <tr>
            <td colSpan="4">
              <button onClick={switchToPay}>PAY</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal
        open={payOpen}
        onClose={payErrorClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {payErrorModal}
      </Modal>
    </div>
  );
}

export default App;
