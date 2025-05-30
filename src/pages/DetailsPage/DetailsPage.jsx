import { useEffect, useState, useContext } from 'react';
import "./DetailsPage.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { HeartedContext } from '../../contexts/HeartedContext';
import { ThemeContext } from '../../contexts/DarkModeContext';

function DetailsPage() {
    const { productId } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    const { darkMode } = useContext(ThemeContext);
    const { hearted, addProduct, removeProduct } = useContext(HeartedContext);
    const [isAdded, setIsAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then((result) => {
                setItemDetails(result.data);
            })
            .catch((error) => console.log(error));
    }, [productId]);

    useEffect(() => {
        const foundProduct = hearted.find((product) => product.id === itemDetails?.id);
        setIsAdded(!!foundProduct);
    }, [hearted, itemDetails]);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (itemDetails) {
            addProduct({ ...itemDetails, quantity });
            setIsAdded(true);
        }
    };

    return (
        <div className={darkMode ? 'details-main-container' : 'details-main-container dark-details-main-container'}>
            <div className={darkMode ? 'details-container' : 'details-container dark-details-container'}>
                <div className='details-img'>
                    <img src={itemDetails?.image} alt={itemDetails?.title} />
                </div>
                <div className={darkMode ? 'details-info' : 'details-info dark-details-info'}>
                    <h3>{itemDetails?.title}</h3>
                    <p>${itemDetails?.price}</p>
                    <p>Rating: {itemDetails?.rating?.rate}</p>
                    <p>Description</p>
                    <p>{itemDetails?.description}</p>
                    <p>Available: {itemDetails?.rating?.count}</p>
                    <div className="quantity-controls">
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={quantity} onChange={handleQuantityChange} />
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    {isAdded ? (
                        <button className='details-button red-button' onClick={() => removeProduct(itemDetails.id)}>
                            Remove From Cart
                        </button>
                    ) : (
                        <button className='details-button' onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
