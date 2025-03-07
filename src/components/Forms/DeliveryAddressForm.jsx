import React, { useState } from 'react';

function DeliveryAddressForm({ addressData, setAddressData, onNext, onPrevious }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(); // Переход к следующему шагу
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Улица:</label>
                <input
                    type="text"
                    name="street"
                    value={addressData.street || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Город:</label>
                <input
                    type="text"
                    name="city"
                    value={addressData.city || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Область:</label>
                <input
                    type="text"
                    name="state"
                    value={addressData.state || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Почтовый индекс:</label>
                <input
                    type="text"
                    name="zip"
                    value={addressData.zip || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="button" onClick={onPrevious}>Назад</button>
            <button type="submit">Продолжить</button>
        </form>
    );
}

export default DeliveryAddressForm;
