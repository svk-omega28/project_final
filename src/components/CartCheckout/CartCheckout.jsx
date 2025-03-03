import { useContext } from 'react';
import './CartCheckout.css';
import { BsTrash } from 'react-icons/bs';
import { HeartedContext } from '../../contexts/HeartedContext';
import { Link } from 'react-router-dom';

function CartCheckout({ productsAdded, onIncrease, onDecrease }) {
  const { removeProduct } = useContext(HeartedContext);

  return (
    <div className='product-items'>
      <Link to={`/details/${productsAdded?.id}`}>
        <img src={productsAdded?.image} alt={productsAdded?.title} />
      </Link>
      <div className='title-wrap'>
        <p>{productsAdded?.title}</p>
      </div>
      <p>${productsAdded?.price.toFixed(2)}</p>
      <div className="quantity-controls">
        <button className="quantity-btn" onClick={() => onDecrease(productsAdded.id)}>-</button>
        <span className="quantity-number">{productsAdded?.quantity || 1}</span>
        <button className="quantity-btn" onClick={() => onIncrease(productsAdded.id)}>+</button>
      </div>
      <BsTrash onClick={() => removeProduct(productsAdded?.id)} className='trash-icon' />
    </div>
  );
}

export default CartCheckout;
