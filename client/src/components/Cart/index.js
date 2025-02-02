import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import './style.css';
//import { Button } from "@chakra-ui/core";
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';
import imgShopCart from "./shopping_cart.png";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        async function getCart() {
          const cart = await idbPromise('cart', 'get');
          dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        };
      
        if (!state.cart.length) {
          getCart();
        }
    }, [state.cart.length, dispatch]);

    //hook for stripe
    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
      }, [data]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
          sum += item.donation;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productsCard = [];
      
        state.cart.forEach((item) => {
          productsCard.push({_id: item._id, 
                            name: item.name,  
                            shortDescription: item.shortDescription,
                            donation: item.donation,
                            author: "HotDogMan"
                          });
        });

        getCheckout({
            variables: { products: productsCard }
          });
    }

    if (!state.cartOpen) {
        return (
          // <div className="cart-closed" onClick={toggleCart}>
            <img src={imgShopCart} className="cart-closed" onClick={toggleCart} alt="shopping cart"></img>
          // </div>
        );
    }

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        <button onClick={submitCheckout}>
                        checkout</button>
                    </div>
                </div>
            ) : (
                <h2>
                <span role="img" aria-label="shocked">
                    😱
                </span>
                You haven't added anything to your cart yet!
                </h2>
            )}
        </div>
    );
};

export default Cart;