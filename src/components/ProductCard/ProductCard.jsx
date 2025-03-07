import {useContext, useState, useEffect} from 'react';
import "./ProductCard.css";
import { AiFillHeart, AiTwotoneHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { HeartedContext } from '../../contexts/HeartedContext';
import { ThemeContext } from '../../contexts/DarkModeContext';

function ProductCard({products}) {

  const {darkMode} = useContext(ThemeContext);
  const [isHearted, setIsHearted] = useState(false);
  const {hearted, addProduct, removeProduct} = useContext(HeartedContext);

  useEffect(
    ()=>{
      setIsHearted(hearted.find(item => item.id === products?.id))
    }, [hearted, products]
  );

  return (
    <div className={
      darkMode?
      'product-card'
      :
      'product-card dark-product-card'
    }>
        <div className='img-box'>
            <Link to={`/details/${products?.id}`}><img src={products?.image} alt={products?.title}/></Link>
            <div className='icon-box'>
                {
                  isHearted?
                    <AiFillHeart className='dark-icon' onClick={()=>removeProduct(products.id)} />
                  :
                    <AiTwotoneHeart className='heart-icon' onClick={()=>addProduct(products)}/>
                }
            </div>
        </div>
        <div className={
          darkMode?
          'product-info'
          :
          'product-info dark-product-info'
        }>
            <p>{products?.title}</p>
            <p>{products?.category.charAt(0).toUpperCase() + products?.category.slice(1)}</p>
            <p>${products?.price.toFixed(2)}</p>
        </div>
    </div>
  )
}

export default ProductCard
