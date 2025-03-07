import axios from "axios";

const API_URL = "https://api.novaposhta.ua/v2.0/json/";
const API_KEY = "5042a16f52b8ef23721bb122c0232763"; // Замени на свой API-ключ

// Функция для получения списка отделений по городу
export const getWarehouses = async (cityName) => {
    const data = {
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: { CityName: cityName },
    };

    try {
        const response = await axios.post(API_URL, data);
        return response.data.data; // Возвращаем список отделений
    } catch (error) {
        console.error("Ошибка при получении отделений:", error);
        return [];
    }
};

// Функция для создания ТТН (накладной)
export const createShipment = async (shipmentData) => {
    const data = {
        apiKey: API_KEY,
        modelName: "InternetDocument",
        calledMethod: "save",
        methodProperties: shipmentData,
    };

    try {
        const response = await axios.post(API_URL, data);
        return response.data.data;
    } catch (error) {
        console.error("Ошибка при создании ТТН:", error);
        return null;
    }
};

// Функция для отслеживания посылки по ТТН
export const trackShipment = async (ttnNumber) => {
    const data = {
        apiKey: API_KEY,
        modelName: "TrackingDocument",
        calledMethod: "getStatusDocuments",
        methodProperties: {
            Documents: [{ DocumentNumber: ttnNumber }],
        },
    };

    try {
        const response = await axios.post(API_URL, data);
        return response.data.data;
    } catch (error) {
        console.error("Ошибка при отслеживании ТТН:", error);
        return null;
    }
};
