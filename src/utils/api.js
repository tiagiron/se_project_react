import { BASE_URL, handleServerResponse, request } from "./constants";

const getItemList = () => {
  return request(`${BASE_URL}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addItem = ({ name, weather, imageUrl }, token) => {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  });
};

const removeItem = (id, token) => {
  return request(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

const addCardLike = (id, token) => {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

const removeCardLike = (id, token) => {
  return request(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

const api = {
  getItemList,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
};

export default api;
