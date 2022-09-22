import React from 'react';
import { Link } from 'react-router-dom';
import './cartIteCard.css';

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="cartItemCart">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: Ksh.${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
