import React, { Fragment } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import './confirmOrder.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const ConfirmOrder = ({ history }) => {
  const { shipingInfo, cartItems } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.user);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = subtotal > 1000 ? 200 : 0;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shipingInfo.address}, ${shipingInfo.city}, ${shipingInfo.state}, ${shipingInfo.pinCode}, ${shipingInfo.country}`;

  const proceedToPayment = () => {
    const data = { subtotal, shippingCharges, tax, totalPrice };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    history.push('/process/payment');
  };
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div>
              <p>Name:</p>
              <span>{user.name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{shipingInfo.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>{address}</span>
            </div>
          </div>
        </div>
        <div className="confirmCartItems">
          <Typography>Your Cart Items:</Typography>
          <div className="confirmCartItemsContainer">
            {cartItems &&
              cartItems.map(item => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>{' '}
                  <span>
                    {item.quantity} X Ksh.{item.price}={''}
                    <b>Ksh.{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* */}
      <div>
        <div className="orderSummary">
          <Typography>Order Summary</Typography>
          <div>
            <div>
              <p>Subtotal:</p>
              <span>Ksh.{subtotal}</span>
            </div>
            <div>
              <p>Shipping Charges:</p>
              <span>Ksh.{shippingCharges}</span>
            </div>
            <div>
              <p>GST:</p>
              <span>Ksh.{tax}</span>
            </div>
          </div>
          <div className="orderSummaryTotal">
            <p>
              <b>Total:</b>
            </p>
            <span>Ksh.{totalPrice}</span>
          </div>
          <button onClick={proceedToPayment}>Proceed To Payment</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
