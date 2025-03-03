import { useContext } from 'react';
import './CartCheckout.css';
import { BsTrash } from 'react-icons/bs';
import { HeartedContext } from '../../contexts/HeartedContext';
import { Link } from 'react-router-dom';

function CartCheckout({ productsAdded }) {
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
      {/* Отображаем quantity из productsAdded */}
      <p>{productsAdded?.quantity || 1}</p>
      <BsTrash onClick={() => removeProduct(productsAdded?.id)} className='trash-icon' />
    </div>
  );
}

export default CartCheckout;

