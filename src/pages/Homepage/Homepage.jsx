import axios from 'axios';
import "./Homepage.css";
import { useState, useEffect, useContext } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ThemeContext } from '../../contexts/DarkModeContext';

function Homepage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState('');
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories")
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => console.log(error));

    axios.get("https://fakestoreapi.com/products")
        .then((result) => {
          setProducts(result.data);
          setOriginalProducts(result.data);
        })
        .catch((err) => console.log(err));
  }, []);

  const handleFilter = (category) => {
    let url = "https://fakestoreapi.com/products";
    if (category !== "All") {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }
    axios.get(url)
        .then(productResult => {
          setProducts(productResult.data);
          setOriginalProducts(productResult.data);
        })
        .catch((productError) => console.log(productError));
  };

  const applyPriceFilter = () => {
    if (maxPrice) {
      const filteredProducts = originalProducts.filter(product => product.price <= parseFloat(maxPrice));
      setProducts(filteredProducts);
    } else {
      setProducts(originalProducts);
    }
  };

  const sortProducts = (order) => {
    const sortedProducts = [...originalProducts].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else if (order === 'desc') {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
  };

  return (
      <div className={darkMode ? "homepage-container" : "homepage-container homepage-dark"}>
        <div className={darkMode ? 'category-container' : 'category-container dark-category-container'}>
          <p className='category' type='all' onClick={() => handleFilter("All")}>All</p>
          {categories.map((element) => (
              <p onClick={() => handleFilter(element)} key={element}>
                {element.charAt(0).toUpperCase() + element.slice(1)}
              </p>
          ))}

          <div className="price-filter">
            <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button onClick={applyPriceFilter}>Filter</button>
          </div>
        </div>

        <div className='product-container'>
          {products.map((item) => (
              <ProductCard products={item} key={item.id} />
          ))}
        </div>
      </div>
  );
}

export default Homepage;
