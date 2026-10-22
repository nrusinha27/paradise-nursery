
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate the total using each item's price and quantity.
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price =
        typeof item.cost === 'number'
          ? item.cost
          : parseFloat(String(item.cost).replace('$', '')) || 0;

      return total + price * (Number(item.quantity) || 1);
    }, 0);
  };

  // Update quantity through the existing Redux action.
  const changeQuantity = (item, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ name: item.name, quantity }));
    }
  };

  if (cartItems.length === 0) {
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
          <img
            className="cart-item-image"
            src={item.image}
            alt={item.name}
          />

          <div className="cart-item-details">
            <h3 className="cart-item-name">{item.name}</h3>
            <p className="cart-item-cost">Price: {item.cost}</p>

            <div className="cart-item-quantity">
              <button
                onClick={() =>
                  changeQuantity(item, (Number(item.quantity) || 1) - 1)
                }
                disabled={(Number(item.quantity) || 1) <= 1}
                aria-label={`Decrease ${item.name} quantity`}
              >
                −
              </button>

              <span>{item.quantity || 1}</span>

              <button
                onClick={() =>
                  changeQuantity(item, (Number(item.quantity) || 1) + 1)
                }
                aria-label={`Increase ${item.name} quantity`}
              >
                +
              </button>
            </div>

            <p>
              Item total: $
              {(
                (parseFloat(String(item.cost).replace('$', '')) || 0) *
                (Number(item.quantity) || 1)
              ).toFixed(2)}
            </p>

            <button
              onClick={() => dispatch(removeItem(item.name))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3 className="total-amount">
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
