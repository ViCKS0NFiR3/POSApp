import React from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addPaymentValue as add, setPaymentValue as set, clearPaymentValue as clear } from './actions'
import history from './History';

function PaymentHandler() {

  const payValue = useSelector(state => state.paymentHandler);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>PAYMENT HANDLER</h3>
      <table>
        <tbody>
          <tr>
            <td><button value="1000" onClick={(e) => dispatch(add(e.currentTarget.value))}>1000</button></td>
            <td><button value="500" onClick={(e) => dispatch(add(e.currentTarget.value))}>500</button></td>
          </tr>
          <tr>
            <td><button value="200" onClick={(e) => dispatch(add(e.currentTarget.value))}>200</button></td>
            <td><button value="100" onClick={(e) => dispatch(add(e.currentTarget.value))}>100</button></td>
          </tr>
          <tr>
            <td><button value="50" onClick={(e) => dispatch(add(e.currentTarget.value))}>50</button></td>
            <td><button value="20" onClick={(e) => dispatch(add(e.currentTarget.value))}>20</button></td>
          </tr>
          <tr>
            <td colsPan="2">
              <input type="textField" 
              value={payValue} 
              onFocus={() => dispatch(clear())}
              onInput={(e) => dispatch(set(e.target.value))}/></td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => dispatch(clear())}>CLEAR</button>
      <button onClick={() => history.push("/")}>CANCEL</button>
      <button onClick={() => history.push("/")}>PAY</button>
    </div>
  );
}

export default withRouter(PaymentHandler);