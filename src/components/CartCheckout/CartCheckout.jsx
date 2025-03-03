import { useContext } from 'react';
import './CartCheckout.css'; // Убедитесь, что стили корректно импортированы
import { BsTrash } from 'react-icons/bs'; // Иконка корзины
import { HeartedContext } from '../../contexts/HeartedContext'; // Контекст для управления корзиной
import { Link } from 'react-router-dom'; // Для ссылки на страницу деталей товара

function CartCheckout({ productsAdded, onIncrease, onDecrease }) {
  const { removeProduct } = useContext(HeartedContext); // Используем функцию удаления товара из контекста

  return (
    <div className="product-items">
      {/* Ссылка на страницу деталей товара */}
      <Link to={`/details/${productsAdded?.id}`}>
        <img src={productsAdded?.image} alt={productsAdded?.title} />
      </Link>
      <div className="title-wrap">
        <p>{productsAdded?.title}</p>
      </div>
      <p>${productsAdded?.price.toFixed(2)}</p>
      <div className="quantity-controls">
        {/* Кнопка уменьшения количества */}
        <button className="quantity-btn" onClick={onDecrease}>-</button>
        <span className="quantity-number">{productsAdded?.quantity || 1}</span>
        {/* Кнопка увеличения количества */}
        <button className="quantity-btn" onClick={onIncrease}>+</button>
      </div>
      {/* Иконка удаления товара */}
      <BsTrash onClick={() => removeProduct(productsAdded?.id)} className="trash-icon" />
    </div>
  );
}

export default CartCheckout;
