import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, decreaseCart, addToCart, clearCart, getTotal } from "../features/cartSlice";
import { useEffect } from "react";
export function Cart() {
    const select = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotal());
    },[dispatch, select]);

    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    }

    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem))
    }

    const handleIncreaseCart = (cartItem) => {
        dispatch(addToCart(cartItem));
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <div className="container cart-container">
            <h2>Shooping Cart</h2>
            {
                select.cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <p>Your cart is currently empty</p>
                        <div className="start-shopping">
                            <Link to="/">
                                <svg fill="rgb(177 177 177)" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                                <span>Start Shopping</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="titles">
                            <h3 className="product-title">Product</h3>
                            <h3 className="price">Price</h3>
                            <h3 className="quantity">Quantity</h3>
                            <h3 className="total">Total</h3>
                        </div>
                        <div className="cart-items">
                            {select.cartItems?.map(
                                cartItem => <div key={cartItem.id} className="cart-item">
                                    <div className="cart-product">
                                        <img src={cartItem.image} alt={cartItem.name} />
                                        <div>
                                            <h3>{cartItem.name}</h3>
                                            <p>{cartItem.desc}</p>
                                            <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                                        </div>
                                    </div>
                                    <div className="cart-product-price">${cartItem.price}</div>
                                    <div className="cart-product-quantity">
                                        <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                                        <div className="count">{cartItem.cartQuantity}</div>
                                        <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                                    </div>
                                    <div className="cart-product-total-price">
                                        ${cartItem.price * cartItem.cartQuantity}
                                    </div>
                                </div>
                            )}
                            <div className="cart-summary">
                                <button className="clear-cart" onClick={() => handleClearCart()}>Clear Cart</button>
                                <div className="cart-checkout">
                                    <div className="subtotal">
                                        <span>Subtotal</span>
                                        <span className="amount">${select.cartTotalAmount}</span>
                                    </div>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <button>Check out</button>
                                    <div className="start-shopping">
                                        <Link to="/">
                                            <svg fill="rgb(177 177 177)" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}