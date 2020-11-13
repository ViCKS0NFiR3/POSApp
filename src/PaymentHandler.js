import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch  } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as action from './actions';
import history from './History';

function PaymentHandler() {
  const clearOnSuccess = () => {
    dispatch(action.clear_char());
    dispatch(action.clear_sku());
    dispatch(action.clear_quantity());
    dispatch(action.clearItem())
  };

  const onPay = (itemList, payValue) => {
    let total_price = 0
    let total_change = 0
    if (itemList.length !== 0 ){
      itemList.map((item) => total_price += item.price); 
      if(total_price <= payValue){
        total_change = payValue - total_price;
        console.log(`Total Price: ${total_price} Total Change: ${total_change} Total Pay: ${payValue}`);
        const url_path = `http://localhost:5000/pos/pay`;
        axios.post(url_path,{
          itemList, 
          total_price,
          total_change,
          total_pay: payValue
        }).then( (response) => {
          const { data } = response;
          console.log(data)});
          clearOnSuccess();
          history.push("/")
      } else {
        console.log("Insufficient Funds");
      }
    } else {
      console.log("No items in list.");
    }
  };

  const itemList = useSelector(state => state.listItem);
  const payValue = useSelector(state => state.paymentHandler);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>PAYMENT HANDLER</h3>
      <table>
        <tbody>
          <tr>
            <td><button value="1000" onClick={(e) => dispatch(action.addPaymentValue(e.currentTarget.value))}>1000</button></td>
            <td><button value="500" onClick={(e) => dispatch(action.addPaymentValue(e.currentTarget.value))}>500</button></td>
          </tr>
          <tr>
            <td><button value="200" onClick={(e) => dispatch(action.addPaymentValue(e.currentTarget.value))}>200</button></td>
            <td><button value="100" onClick={(e) => dispatch(action.addPaymentValue(e.currentTarget.value))}>100</button></td>
          </tr>
          <tr>
            <td><button value="50" onClick={(e) => dispatch(action.addPaymentValue(e.currentTarget.value))}>50</button></td>
            <td><button value="20" onClick={(e) => dispatch(action.addPaymentValue(e.currentTarget.value))}>20</button></td>
          </tr>
          <tr>
            <td colSpan="2">
              <input type="textField" 
              value={payValue} 
              onFocus={() => dispatch(action.clearPaymentValue())}
              onInput={(e) => dispatch(action.setPaymentValue(e.target.value))}/></td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => dispatch(action.resetPaymentValue())}>CLEAR</button>
      <button onClick={() => history.push("/")}>CANCEL</button>
      <button onClick={() => onPay(itemList, payValue)}>PAY</button>
    </div>
  );
}

export default withRouter(PaymentHandler);