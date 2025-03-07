import { useContext, useState, useEffect } from "react";
import "./Checkout.css";
import { HeartedContext } from "../../contexts/HeartedContext";
import CartCheckout from "../../components/CartCheckout/CartCheckout";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/DarkModeContext";
import Modal from "react-modal";

function Checkout() {
  const { darkMode } = useContext(ThemeContext);
  const { hearted, setHearted } = useContext(HeartedContext);
  const [total, setTotal] = useState(0);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let updatedTotal = 0;
    hearted.forEach((item) => {
      updatedTotal += item.price * (item.quantity || 1);
    });
    setTotal(updatedTotal.toFixed(2));
  }, [hearted]);

  const updateQuantity = (id, amount) => {
    const updatedCart = hearted.map((item) =>
        item.id === id
            ? { ...item, quantity: Math.max(1, (item.quantity || 1) + amount) }
            : item
    );
    setHearted(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (hearted.length === 0) {
      alert('Your cart is empty!');
    } else {
      setIsCheckedOut(true);
    }
  };

  const handleCloseModal = () => {
    setIsCheckedOut(false);
    setHearted([]);
    localStorage.removeItem("cart");
    navigate('/');
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
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

          <div className="total-container">
            <p>Total: ${total}</p>
            {!isCheckedOut ? (
                <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
            ) : (
                <button className="checkout-button checked">Checked Out</button>
            )}
          </div>
        </div>

        <Modal
            isOpen={isCheckedOut}
            onRequestClose={handleCloseModal}
            style={customStyles}
            contentLabel="Checkout Modal"
        >
          <div className="modal-container">
            <h1>Your Order was successful!</h1>
            <h2>Check your email for the order confirmation. Thank you for shopping with Hard Store!</h2>
            <button className="modal-button" onClick={handleCloseModal}>
              Return To Main Page
            </button>
          </div>
        </Modal>
      </div>
  );
}

export default Checkout;
