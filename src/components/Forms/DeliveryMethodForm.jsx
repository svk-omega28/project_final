import React, { useState } from 'react';

function DeliveryMethodForm({ deliveryMethod, setDeliveryMethod, onNext, onPrevious }) {
    const handleChange = (e) => {
        setDeliveryMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(); // Переход к следующему шагу
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Выберите способ доставки:</label>
                <select
                    value={deliveryMethod}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите...</option>
                    <option value="курьер">Курьер</option>
                    <option value="почтой">Почтой</option>
                    <option value="самовывоз">Самовывоз</option>
                </select>
            </div>
            <button type="button" onClick={onPrevious}>Назад</button>
            <button type="submit">Продолжить</button>
        </form>
    );
}

export default DeliveryMethodForm;
