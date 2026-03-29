import Cookies from 'js-cookie';

const BASE_URL = '/api';


const getAuthHeaders = () => {
    const token = Cookies.get('jwt_token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
};


const getUploadHeaders = () => {
    const token = Cookies.get('jwt_token');
    return {
        ...(token && { Authorization: `Bearer ${token}` })
    };
};

const handleResponse = async (response) => {
    if (response.status === 204) return { success: true };
    let data;
    try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
    } catch (e) {
        data = { message: 'Unexpected response format from server' };
    }
    if (!response.ok) {
        if (data.errors && typeof data.errors === 'object') {
            const errorMessages = Object.values(data.errors).flat().join(' | ');
            throw new Error(errorMessages || data.title || `HTTP Error ${response.status}`);
        }
        throw new Error(data.message || data.title || `HTTP Error ${response.status}`);
    }
    
    if (data && typeof data === 'object' && data.success !== undefined && data.data !== undefined) {
        return data.data;
    }
    
    return data;
};

// ---------------- AUTHENTICATION ----------------

export const loginAPI = async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return handleResponse(response);
};

export const registerAPI = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return handleResponse(response);
};

// ---------------- RESTAURANTS ----------------

export const getAllRestaurantsAPI = async () => {
    const response = await fetch(`${BASE_URL}/restaurants`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getRestaurantByIdAPI = async (id) => {
    const response = await fetch(`${BASE_URL}/restaurants/${id}`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getFoodItemsByRestaurantIdAPI = async (id) => {
    const response = await fetch(`${BASE_URL}/restaurants/${id}/fooditems`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const createRestaurantAPI = async (restaurantData) => {
    const response = await fetch(`${BASE_URL}/restaurants`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(restaurantData)
    });
    return handleResponse(response);
};

export const updateRestaurantAPI = async (id, restaurantData) => {
    const response = await fetch(`${BASE_URL}/restaurants/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(restaurantData)
    });
    return handleResponse(response);
};

export const deleteRestaurantAPI = async (id) => {
    const response = await fetch(`${BASE_URL}/restaurants/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

// ---------------- FOOD ITEMS ----------------

export const getAllFoodItemsAPI = async () => {
    const response = await fetch(`${BASE_URL}/fooditems`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getFoodItemByIdAPI = async (id) => {
    const response = await fetch(`${BASE_URL}/fooditems/${id}`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const createFoodItemAPI = async (foodItemData) => {
    const response = await fetch(`${BASE_URL}/fooditems`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(foodItemData)
    });
    return handleResponse(response);
};

export const updateFoodItemAPI = async (id, foodItemData) => {
    const response = await fetch(`${BASE_URL}/fooditems/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(foodItemData)
    });
    return handleResponse(response);
};

export const deleteFoodItemAPI = async (id) => {
    const response = await fetch(`${BASE_URL}/fooditems/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

// ---------------- UPLOADS ----------------

export const uploadRestaurantImageAPI = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${BASE_URL}/upload/restaurant`, {
        method: 'POST',
        headers: getUploadHeaders(),
        body: formData
    });
    return handleResponse(response);
};

export const uploadFoodItemImageAPI = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${BASE_URL}/upload/fooditem`, {
        method: 'POST',
        headers: getUploadHeaders(),
        body: formData
    });
    return handleResponse(response);
};

// ---------------- PROFILE ----------------

export const getUserProfileAPI = async () => {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const updateUserProfileAPI = async (profileData) => {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
    });
    return handleResponse(response);
};

// ---------------- ORDERS ----------------

export const getMyOrdersAPI = async () => {
    const response = await fetch(`${BASE_URL}/orders/my`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const getAllOrdersAPI = async () => {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'GET',
        headers: getAuthHeaders()
    });
    return handleResponse(response);
};

export const createOrderAPI = async (orderData) => {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData)
    });
    return handleResponse(response);
};

export const updateOrderStatusAPI = async (id, status) => {
    const response = await fetch(`${BASE_URL}/orders/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
    });
    return handleResponse(response);
};
