import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProdDisp from './ProdDisp';
import { Row } from 'react-bootstrap';
import Cart from './Cart';

const Products = () => {
    const { catID } = useParams();
    const [prods, setProds] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [payNow, setPayNow] = useState(false);
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/';

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) setCart(storedCart);

        const fetchProducts = async () => {
            const endpoint = catID ? `${SERVER_URL}/${catID}` : SERVER_URL;
            const response = await axios.get(endpoint);
            setProds(response.data);
        };

        fetchProducts();
    }, [catID]);

    useEffect(() => {
        const tempTotal = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
        setTotal(parseFloat(tempTotal.toFixed(2)));
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const buy = (item, quantity = 1) => {
        const existingItem = cart.find(prod => prod.id === item.id);
        if (existingItem) {
            if (existingItem.amount + quantity <= 0) {
                updateCart(cart.filter(prod => prod.id !== item.id)); // Remove item from cart
            } else {
                updateCart(cart.map(prod => prod.id === item.id ? { ...prod, amount: prod.amount + quantity } : prod)); // Update item quantity
            }
        } else if (quantity > 0) {
            updateCart([...cart, { ...item, amount: quantity }]); // Add new item to cart
        }
    };

    return (
        <div className="products-layout">
            <div className="products-list">
                <Row xs={1} md={2} className="g-4">
                    {prods.map(prod => <ProdDisp key={prod.id} prod={prod} buy={buy} />)}
                </Row>
            </div>
            <div className="cart-divider"></div>
            <div className="cart-section">
                <Cart cart={cart} total={total} updateCart={updateCart} buy={buy} setPayNow={setPayNow} payNow={payNow} />
            </div>
        </div>
    );
};

export default Products;
