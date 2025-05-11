import { Link } from "react-router-dom";

import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cartStore";
import Header from "../components/Header";
import Footer from "../components/Fotter";



function SummaryPage() {

    const cartItems = useSelector((state: any) => state.cart.items);
    const cartItemNumber = useSelector((state: any) => state.cart.totalQuantity);
    const dispatch = useDispatch();


    const totalCartPriceNumber = cartItems.reduce((sum: number, item: any) => {
        const unitPrice = item.price.main + item.price.fractional / 100;
        return sum + unitPrice * item.quantity;
    }, 0);

    const totalCartPrice = totalCartPriceNumber.toFixed(2);



    return (<>
        <div>
            <Header />
            <div className="main-container">

                <div className="main-list-container main-list-container-summary">
                    <h1 className="main-text main-text-summary">
                        Podsumownie
                    </h1>


                    <ul className="list-container list-container-summary ">
                        <li className="list-item-cart list-container-header list-item-cart-summary" key={0}>
                            <h3 className="product-name-cart">Nazwa produktu</h3>
                            <p className="product-quantity product-quantity-header">Ilość</p>
                            <p className="product-price-cart product-price-cart-summary">Cena</p>
                            <p className="product-final-price">Całkowita Kwota</p>
                        </li>

                        {cartItems.map((product: any) => {
                            const unitPrice = product.price.main + product.price.fractional / 100;
                            const totalPrice = (product.quantity * unitPrice).toFixed(2);

                            return (
                                <li className="list-item-cart list-item-cart-summary" key={product.id}>
                                    <h3 className="product-name-cart">{product.name}</h3>
                                    <span className="product-quantity">{product.quantity}</span>
                                    <p className="product-price-cart product-price-cart-summary">{unitPrice.toFixed(2)} zł</p>
                                    <p className="product-price-cart"> {totalPrice} zł</p>
                                </li>
                            );
                        })}
                        <div className="list-item-cart list-item-cart-summary list-item-cart-summary-total" >
                            <p> Całkowita liczba produktów:  {cartItemNumber}</p>
                            <p >Całkowita kwota do zapłaty:  {totalCartPrice} zł </p>
                        </div>

                    </ul>

                    <div className="navigate-to-container">
                        <button className="go-to-cart-button go-to-summary" 
                        disabled={cartItems.length === 0}
                        onClick={() => {
                            localStorage.setItem("orderItems", JSON.stringify(cartItems)); 
                            localStorage.setItem("orderPrice", totalCartPrice);
                            localStorage.setItem("totalQuantity", cartItemNumber.toString());

                            localStorage.removeItem("cart");
                            dispatch(clearCart());


                            window.location.href = "/zdrowy-talerz/confirmation.html";

                        }}> Złóż Zamówienie</button>
                        <Link className="go-to-list go-to-list-summary" to="/Cart">  Wróć do Koszyka</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div >

    </>);
}

export default SummaryPage

