
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity
} from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate the total price of all cart items.
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(String(item.cost).replace(/[^0-9.]/g, '')) || 0;
      const quantity = Number(item.quantity) || 1;
      return total + price * quantity;
    }, 0);
  };

  // Display an empty-cart message when no products are present.
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <p>Your cart is empty.</p>
        <button onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {cartItems.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} width="100" />

          <div>
            <h3>{item.name}</h3>
            <p>Price: {item.cost}</p>

            <button
              onClick={() => dispatch(decreaseItemQuantity(item))}
              disabled={(item.quantity || 1) <= 1}
            >
              −
            </button>

            <span> {item.quantity || 1} </span>

            <button
              onClick={() => dispatch(increaseItemQuantity(item))}
            >
              +
            </button>

            <button onClick={() => dispatch(removeItem(item))}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3>
        Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
      </h3>

      <button onClick={onContinueShopping}>
        Continue Shopping
      </button>

      <button
        onClick={() => window.alert('Checkout functionality coming soon!')}
      >
        Checkout
      </button>
    </div>
  );
}

export default CartItem;
