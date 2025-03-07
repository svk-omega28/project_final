import axios from 'axios';

const DHL_API_KEY = '7AYKAwl8BCpGGshZmgPRY4xuYxgUOiLp';
const DHL_API_URL = 'https://api.dhl.com/...'; // Замени на реальный URL API DHL

export const sendOrderToDHL = async (orderData) => {
    try {
        const response = await axios.post(DHL_API_URL, orderData, {
            headers: {
                'Content-Type': 'application/json',
                'DHL-API-Key': DHL_API_KEY
            }
        });
        return response.data; // Возвращает ответ от сервера DHL
    } catch (error) {
        console.error('Error sending order to DHL:', error);
        throw error; // Передаем ошибку дальше, если что-то пошло не так
    }
};
