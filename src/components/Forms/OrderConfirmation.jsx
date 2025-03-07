import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};

function OrderConfirmation({ isOpen, onRequestClose, ttnNumber }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Order Confirmation"
        >
            <h2>Заказ успешно оформлен!</h2>
            <p>Спасибо за покупку. Вам на почту отправлено письмо с деталями заказа.</p>
            {ttnNumber && <p>Номер ТТН: {ttnNumber}</p>}
            <button onClick={onRequestClose}>Закрыть</button>
        </Modal>
    );
}

export default OrderConfirmation;
