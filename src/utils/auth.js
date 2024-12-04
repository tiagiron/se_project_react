import { BASE_URL, handleServerResponse } from "./constants";

// /signup for user registration

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const editProfileData = (name, avatar, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
};

export const register = (email, password, name, avatar) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(handleServerResponse);
};

export const authorize = (email, password) => {
  return (fetch(`${BASE_URL}/signin`),
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};
