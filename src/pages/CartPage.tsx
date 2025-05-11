import { useNavigate, Link } from "react-router-dom";

import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { deleteItem, increaseQuantity, decreaseQuantity } from "../features/cartStore";
import Header from "../components/Header";
import Footer from "../components/Fotter";

function CartPage() {

    const navigate = useNavigate();
    const cartItems = useSelector((state: any) => state.cart.items);
    const cartItemNumber = useSelector((state: any) => state.cart.totalQuantity);
    const dispatch = useDispatch();


    const totalCartPrice = cartItems.reduce((sum: number, item: any) => {
        const unitPrice = item.price.main + item.price.fractional / 100;
        return sum + unitPrice * item.quantity;
    }, 0).toFixed(2);


    return (<>
        <div>
            <Header />
            <div className="main-container">

                <div className="main-list-container">
                    <h1 className="main-text">
                        Koszyk
                    </h1>


                    <ul className="list-container ">
                        <li className="list-item-cart list-container-header" key={0}>
                            <h3 className="product-name-cart">Nazwa produktu</h3>
                            <p className="product-price-cart">Cena</p>
                            <p className="product-quantity product-quantity-header">Ilość</p>
                            <p className="product-delite">Usuń </p>
                            <p className="product-final-price">Całkowita Kwota</p>
                        </li>

                        {cartItems.map((product: any) => {
                            const unitPrice = product.price.main + product.price.fractional / 100;
                            const totalPrice = (product.quantity * unitPrice).toFixed(2);

                            return (
                                <li className="list-item-cart" key={product.id}>
                                    <h3 className="product-name-cart">{product.name}</h3>
                                    <p className="product-price-cart">{unitPrice.toFixed(2)} zł</p>
                                    <div className="product-quantity">
                                        <button className="change-quantity-button" onClick={() => dispatch(decreaseQuantity(product.id))}>-</button>
                                        <span>{product.quantity}</span>
                                        <button className="change-quantity-button" onClick={() => dispatch(increaseQuantity(product.id))}>+</button>
                                    </div>
                                    <button className="product-delite button-delite" onClick={() => dispatch(deleteItem(product.id))}>Usuń</button>
                                    <p className="product-price-cart"> {totalPrice} zł</p>
                                </li>
                            );
                        })}
                        <div className="total-price-text-container">
                            <p >Całkowita kwota do zapłaty: </p>
                            <p className="total-price">{totalCartPrice} zł</p>
                        </div>
                        

                    </ul>

                    <div className="navigate-to-container">
                        <button className="go-to-cart-button" onClick={() => navigate("/Summary")} > Podsumownie </button>
                        <Link className="go-to-list" to="/">  Lista produktów </Link>
                    </div>
                </div>
                <div className="cart-number-of-elements-container">
                    <span className="number-of-cart-items-text">Liczba produktów:</span>
                    <h2 className="number-of-cart-items">{cartItemNumber}</h2>
                    
                </div>
            </div>
            <Footer />
        </div >

    </>);
}

export default CartPage