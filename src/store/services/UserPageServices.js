import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_URL_BASE || 'http://localhost:8080';

export const postChangeAddress = async (form, id, token) => {
  const reponseData = await axios.patch(`${URL_BASE}/api/user/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return reponseData;
};

export const patchUser = async (data, id, token) => {
  try {
    const reponseData = await axios.patch(`${URL_BASE}/api/user/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return reponseData;
  } catch (error) {
    return error;
  }
};

export const uploadSingleFile = async (data, token) => {
  try {
    const reponseData = await axios.post(`${URL_BASE}/api/upload/file`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return reponseData;
  } catch (error) {
    return error;
  }
};
