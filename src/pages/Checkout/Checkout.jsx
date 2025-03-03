import { useContext, useState, useEffect } from "react";
import "./Checkout.css";
import { HeartedContext } from "../../contexts/HeartedContext";
import CartCheckout from "../../components/CartCheckout/CartCheckout";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/DarkModeContext";

function Checkout() {
  const { darkMode } = useContext(ThemeContext);
  const { hearted, setHearted } = useContext(HeartedContext);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [total, setTotal] = useState(0);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "692px",
      maxHeight: "90vh",
      overflow: "auto",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0, .5)",
    },
  };

  Modal.setAppElement(document.getElementById("root"));

  useEffect(() => {
    let updatedTotal = 0;
    hearted.forEach((item) => {
      updatedTotal += item.price * (item.quantity || 1);
    });
    setTotal(updatedTotal.toFixed(2));
  }, [hearted]);

  // Функция для изменения количества товара
  const updateQuantity = (id, amount) => {
    const updatedCart = hearted.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + amount) }
        : item
    );
    setHearted(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className={darkMode ? "checkout-container" : "checkout-container dark-checkout-container"}>
      <div className={darkMode ? "checkout-items" : "checkout-items dark-checkout-items"}>
        <div className={darkMode ? "item-details" : "item-details dark-item-details"}>
          <p>Item</p>
          <div className="item-sub-details">
            <p>Price</p>
            <p>Quantity</p>
            <p>Remove</p>
          </div>
        </div>

        {hearted.length === 0 ? (
          <h1 className="error-message">No Products In Cart</h1>
        ) : (
          hearted.map((item) => (
            <div key={item.id} className="cart-item">
              <CartCheckout
                productsAdded={item}
                onIncrease={() => updateQuantity(item.id, 1)}
                onDecrease={() => updateQuantity(item.id, -1)}
              />
            </div>
          ))
        )}

        {hearted.length > 0 && (
          <div className="total-container">
            <p>Total: ${total}</p>
            {!isCheckedOut ? (
              <button className="checkout-button" onClick={() => setIsCheckedOut(true)}>Checkout</button>
            ) : (
              <button className="checkout-button checked">Checked Out</button>
            )}

            <Modal isOpen={isCheckedOut} style={customStyles} contentLabel="Checkout Modal">
              <div className="modal-container">
                <h1>Your Order was successful!</h1>
                <h2>Check your email for the order confirmation. Thank you for shopping with Fake Store!</h2>
                <Link to="/">
                  <button className="modal-button" onClick={() => setHearted([])}>Return To Main Page</button>
                </Link>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
