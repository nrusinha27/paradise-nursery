
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  updateQuantity,
} from "./CartSlice";

function CartItem() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate the total price of all cart items.
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.cost) || 0;
      const quantity = Number(item.quantity) || 0;

      return total + price * quantity;
    }, 0);
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: Number(item.quantity) + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (Number(item.quantity) > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: Number(item.quantity) - 1,
        })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                src={item.image}
                alt={item.name}
                width="100"
              />

              <div>
                <h3>{item.name}</h3>
                <p>
                  Price: ${Number(item.cost).toFixed(2)}
                </p>

                <div>
                  <button
                    onClick={() => handleDecrement(item)}
                    disabled={Number(item.quantity) <= 1}
                  >
                    -
                  </button>

                  <span> {item.quantity} </span>

                  <button
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <p>
                  Subtotal: $
                  {(
                    Number(item.cost) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </p>

                <button onClick={() => handleRemove(item)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>
            Total Amount: ${calculateTotalAmount().toFixed(2)}
          </h2>
        </>
      )}
    </div>
  );
}

export default CartItem;
