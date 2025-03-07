import { useEffect, useState, useContext } from 'react';
import "./DetailsPage.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { HeartedContext } from '../../contexts/HeartedContext';
import { ThemeContext } from '../../contexts/DarkModeContext';

function DetailsPage() {
    const { productId } = useParams(); // Получаем ID товара из URL
    const [itemDetails, setItemDetails] = useState(null); // Состояние для хранения деталей товара
    const { darkMode } = useContext(ThemeContext); // Глобальное состояние темной темы
    const { hearted, addProduct, removeProduct } = useContext(HeartedContext); // Контекст корзины
    const [isAdded, setIsAdded] = useState(false); // Состояние для проверки добавления товара в корзину

    useEffect(() => {
        // Загружаем детали товара по ID из API
        axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then((result) => {
                setItemDetails(result.data); // Сохраняем детали товара в состоянии
            })
            .catch((error) => console.log(error));
    }, [productId]);

    useEffect(() => {
        // Проверяем, добавлен ли товар в корзину
        const foundProduct = hearted.find((product) => product.id === itemDetails?.id);
        setIsAdded(!!foundProduct); // Обновляем состояние
    }, [hearted, itemDetails]);

    return (
        <div className={darkMode ? 'details-main-container' : 'details-main-container dark-details-main-container'}>
            <div className={darkMode ? 'details-container' : 'details-container dark-details-container'}>
                <div className='details-img'>
                    <img src={itemDetails?.image} alt={itemDetails?.title} />
                </div>
                <div className={darkMode ? 'details-info' : 'details-info dark-details-info'}>
                    <h3>{itemDetails?.title}</h3>
                    <p>${itemDetails?.price}</p>
                    <p>Rating: {itemDetails?.rating?.rate} ({itemDetails?.rating?.count} ratings)</p> {/* Выводим количество оценок */}
                    <p>Description</p>
                    <p>{itemDetails?.description}</p>
                    {isAdded ? (
                        <button className='details-button red-button' onClick={() => removeProduct(itemDetails.id)}>
                            Remove From Cart
                        </button>
                    ) : (
                        <button className='details-button' onClick={() => addProduct(itemDetails)}>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
