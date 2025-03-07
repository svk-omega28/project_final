import axios from 'axios';
import "./Homepage.css";
import { useState, useEffect, useContext } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ThemeContext } from '../../contexts/DarkModeContext';

function Homepage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // Текущий список товаров (отфильтрованный/отсортированный)
  const [originalProducts, setOriginalProducts] = useState([]); // Исходный список товаров
  const [maxPrice, setMaxPrice] = useState(''); // Максимальная цена для фильтрации
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
          setOriginalProducts(result.data); // Сохраняем исходный список товаров
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
          setOriginalProducts(productResult.data); // Обновляем исходный список товаров
        })
        .catch((productError) => console.log(productError));
  };

  // Функция для применения фильтрации по цене
  const applyPriceFilter = () => {
    if (maxPrice) {
      const filteredProducts = originalProducts.filter(product => product.price <= parseFloat(maxPrice));
      setProducts(filteredProducts);
    } else {
      setProducts(originalProducts); // Если нет фильтрации, показываем все товары
    }
  };

  // Функция для сортировки товаров по цене
  const sortProducts = (order) => {
    const sortedProducts = [...originalProducts].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price; // Сортировка по возрастанию
      } else if (order === 'desc') {
        return b.price - a.price; // Сортировка по убыванию
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
