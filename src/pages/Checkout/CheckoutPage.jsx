import React, { useState } from 'react';
import PersonalDetailsForm from '../../components/Forms/PersonalDetailsForm';
import DeliveryAddressForm from '../../components/Forms/DeliveryAddressForm';
import DeliveryMethodForm from '../../components/Forms/DeliveryMethodForm';
import PaymentMethodForm from '../../components/Forms/PaymentMethodForm';
import OrderConfirmation from '../../components/Forms/OrderConfirmation';

function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [addressData, setAddressData] = useState({});
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isOrderSent, setIsOrderSent] = useState(false); // Состояние для проверки отправки заказа

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleOrderConfirmation = () => {
        console.log('Order Data:', {
            formData,
            addressData,
            deliveryMethod,
            paymentMethod
        });
        alert('Заказ успешно оформлен!');
        setIsOrderSent(true); // Отображаем модальное окно с подтверждением заказа
    };

    return (
        <div className="checkout-page">
            {step === 1 && (
                <PersonalDetailsForm
                    formData={formData}
                    setFormData={setFormData}
                    onNext={handleNextStep}
                />
            )}
            {step === 2 && (
                <DeliveryAddressForm
                    addressData={addressData}
                    setAddressData={setAddressData}
                    onNext={handleNextStep}
                    onPrevious={handlePreviousStep}
                />
            )}
            {step === 3 && (
                <DeliveryMethodForm
                    deliveryMethod={deliveryMethod}
                    setDeliveryMethod={setDeliveryMethod}
                    onNext={handleNextStep}
                    onPrevious={handlePreviousStep}
                />
            )}
            {step === 4 && (
                <PaymentMethodForm
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    onNext={handleOrderConfirmation}
                    onPrevious={handlePreviousStep}
                />
            )}
            {isOrderSent && (
                <OrderConfirmation
                    isOpen={isOrderSent}
                    onRequestClose={() => setIsOrderSent(false)}
                />
            )}
        </div>
    );
}

export default CheckoutPage;
