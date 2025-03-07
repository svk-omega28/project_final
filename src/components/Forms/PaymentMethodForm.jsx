import React, { useState } from 'react';

function PaymentMethodForm({ paymentMethod, setPaymentMethod, onNext, onPrevious }) {
    const handleChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(); // Переход к следующему шагу
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Выберите способ оплаты:</label>
                <select
                    value={paymentMethod}
                    onChange={handleChange}
                    required
                >
                    <option value="">Выберите...</option>
                    <option value="карта">Карта</option>
                    <option value="наличные">Наличные</option>
                    <option value="электронные_деньги">Электронные деньги</option>
                </select>
            </div>
            <button type="button" onClick={onPrevious}>Назад</button>
            <button type="submit">Продолжить</button>
        </form>
    );
}

export default PaymentMethodForm;
