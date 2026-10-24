import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(true);
    const [addedToCart, setAddedToCart] = useState({});

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // Calculate total quantity of items in cart for the navbar badge
    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg",
                    description: "Removes mold spores and purifies indoor air.",
                    cost: "$18"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1000&auto=format&fit=crop",
                    description: "Calming scent, helps reduce stress and anxiety.",
                    cost: "$20"
                },
                {
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1000&auto=format&fit=crop",
                    description: "Sweet fragrance, promotes relaxation and sleep.",
                    cost: "$16"
                },
                {
                    name: "Rosemary",
                    image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                    description: "Invigorating aroma, enhances memory and focus.",
                    cost: "$14"
                }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-vera-3283110_1280.jpg",
                    description: "Soothes skin irritations and promotes skin healing.",
                    cost: "$10"
                },
                {
                    name: "Echinacea",
                    image: "https://cdn.pixabay.com/photo/2014/12/02/22/04/echinacea-554555_1280.jpg",
                    description: "Boosts the immune system and fights off colds.",
                    cost: "$15"
                }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                {
                    name: "ZZ Plant",
                    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=1000&auto=format&fit=crop",
                    description: "Thrives in low light and requires minimal watering.",
                    cost: "$22"
                },
                {
                    name: "Pothos",
                    image: "https://images.unsplash.com/photo-1596724817753-149303531124?q=80&w=1000&auto=format&fit=crop",
                    description: "Fast-growing vine, extremely easy to care for.",
                    cost: "$12"
                }
            ]
        }
    ];

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
        setShowPlants(false);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowPlants(true);
    };

    return (
        <div>
            {/* Navbar */}
            <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="tag">
                    <div className="luxury">
                        <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
                            <div>
                                <h3 style={{ margin: 0 }}>Paradise Nursery</h3>
                                <i style={{ fontSize: '14px' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div>
                        <a href="#" onClick={(e) => handlePlantsClick(e)} style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>
                            Plants
                        </a>
                    </div>
                    <div>
                        <a href="#" onClick={(e) => handleCartClick(e)} style={{ color: 'white', fontSize: '20px', textDecoration: 'none', position: 'relative' }}>
                            <h1 className="cart" style={{ margin: 0 }}>
                                🛒 <span className="cart_quantity_count">{calculateTotalQuantity()}</span>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>

            {/* Product Grid / Cart Toggle */}
            {showPlants && (
                <div className="product-grid">
                    {plantsArray.map((categoryObj, index) => (
                        <div key={index} className="category-section">
                            <h2 className="plant_heading" style={{ textAlign: 'center', marginTop: '20px' }}>
                                {categoryObj.category}
                            </h2>
                            <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '20px' }}>
                                {categoryObj.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '250px', textAlign: 'center' }}>
                                        <img className="product-image" src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '6px' }} />
                                        <div className="product-title" style={{ fontWeight: 'bold', fontSize: '18px', margin: '10px 0' }}>{plant.name}</div>
                                        <p>{plant.description}</p>
                                        <div className="product-price" style={{ fontWeight: 'bold', color: '#2e7d32', margin: '10px 0' }}>{plant.cost}</div>
                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                                            style={{
                                                backgroundColor: (addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)) ? '#ccc' : '#4CAF50',
                                                color: 'white',
                                                border: 'none',
                                                padding: '10px 15px',
                                                borderRadius: '4px',
                                                cursor: (addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)) ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            {(addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)) ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showCart && (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
