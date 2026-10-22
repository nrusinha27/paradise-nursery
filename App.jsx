
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  // Plant catalogue organized into three categories.
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "An elegant, low-maintenance indoor plant.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "A popular green plant for indoor spaces.",
          cost: "$12"
        }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1000&auto=format&fit=crop",
          description: "A fragrant plant with purple flowers.",
          cost: "$20"
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592729808999-652d231c0b6e?q=80&w=1000&auto=format&fit=crop",
          description: "A beautiful plant known for its fragrance.",
          cost: "$18"
        }
      ]
    },
    {
      category: "Succulent Plants",
      plants: [
        {
          name: "Aloe Vera",
          image: "https://images.unsplash.com/photo-1509423350716-97f2360af9e4?q=80&w=1000&auto=format&fit=crop",
          description: "A hardy succulent that is easy to care for.",
          cost: "$10"
        },
        {
          name: "Echeveria",
          image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1000&auto=format&fit=crop",
          description: "A compact succulent with a rosette shape.",
          cost: "$14"
        }
      ]
    }
  ];

  // Add a selected plant to the Redux shopping cart.
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));

    setAddedToCart((previousState) => ({
      ...previousState,
      [plant.name]: true
    }));
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>

        <button onClick={() => setShowCart(!showCart)}>
          {showCart ? "Plants" : "Cart"}
        </button>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj) => (
            <div key={categoryObj.category}>
              <h1>{categoryObj.category}</h1>

              <div className="plant-list">
                {categoryObj.plants.map((plant) => (
                  <div className="plant-card" key={plant.name}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      width="150"
                    />

                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p>{plant.cost}</p>

                    <button
                      disabled={Boolean(addedToCart[plant.name])}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name]
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
