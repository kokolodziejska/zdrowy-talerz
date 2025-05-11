import { useNavigate } from "react-router-dom";
import productsData from "../assets/products.json"
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartStore";
import { useSelector } from 'react-redux';
import Header from "../components/Header";
import Footer from "../components/Fotter";

type Product = {
    id: number;
    name: string;
    price: {
        main: number;
        fractional: number;
    };
};

function ProductListPage() {

    const navigate = useNavigate();
    const productsList: Product[] = productsData;
    const dispatch = useDispatch();
    const cartItemNumber = useSelector((state: any) => state.cart.totalQuantity);


    return (<>
        <div className="page-container">
            <Header />
            <div className="main-container">
                
                <div className="main-list-container">
                    <h1 className="main-text">
                        Lista produktów
                    </h1>

                    <ul className="list-container">
                        
                        {productsList.map((product) => {
                            return (
                                <li className="list-item" key={product.id}>
                                    <h3 className="product-name">{product.name}</h3>
                                    <h3 className="product-price">{product.price.main},{product.price.fractional.toString().padStart(2, "0")} zł</h3>
                                    <button onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}> Dodaj do koszyka</button>

                                </li>
                            );
                        }
                        )}
                    </ul>

                    <button className="go-to-cart-button" onClick={() => navigate("/Cart")} > Przejdz do koszyka </button>
                </div>
                <div className="cart-number-of-elements-container">
                    <span className="material-icons icons-cart">shopping_cart</span>
                    <h2 className="number-of-cart-items">{cartItemNumber}</h2>
                </div>
            </div>
            <Footer />
        </div >

    </>);
}

export default ProductListPage