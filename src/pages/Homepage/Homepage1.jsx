import axios from 'axios';
import "./Homepage.css";
import { useState, useEffect, useContext } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ThemeContext } from '../../contexts/DarkModeContext';

function Homepage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(''); // Добавляем состояние для максимальной цены
  const [sortOrder, setSortOrder] = useState(''); // Добавляем состояние для сортировки
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Загрузка категорий и товаров при загрузке страницы
    axios.get("https://fakestoreapi.com/products/categories")
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => console.log(error));

    axios.get("https://fakestoreapi.com/products")
        .then((result) => {
          setProducts(result.data);
        })
        .catch((err) => console.log(err));
  }, []);

  // Функция для фильтрации товаров по категории
  const handleFilter = (category) => {
    let url = "https://fakestoreapi.com/products";
    if (category !== "All") {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }
    axios.get(url)
        .then(productResult => {
          setProducts(productResult.data);
        })
        .catch((productError) => console.log(productError));
  };

  // Функция для применения фильтрации по цене
  const applyPriceFilter = () => {
    if (maxPrice) {
      const filteredProducts = products.filter(product => product.price <= parseFloat(maxPrice));
      setProducts(filteredProducts);
    }
  };

  // Функция для сортировки товаров по цене
  const sortProducts = (order) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price; // Сортировка по возрастанию
      } else if (order === 'desc') {
        return b.price - a.price; // Сортировка по убыванию
      }
    });
    setProducts(sortedProducts);
    setSortOrder(order); // Сохраняем текущий порядок сортировки
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
        </div>

        {/* Добавляем инпут для ввода максимальной цены и кнопку для применения фильтра */}
        <div className="price-filter">
          <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button onClick={applyPriceFilter}>Filter</button>
        </div>

        {/* Добавляем кнопки для сортировки товаров */}
        <div className="sort-buttons">
          <button onClick={() => sortProducts('asc')}>Sort by Price: Low to High</button>
          <button onClick={() => sortProducts('desc')}>Sort by Price: High to Low</button>
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
