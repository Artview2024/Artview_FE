import axios from 'axios';
import {useTokenStore} from '../hooks/useTokenStore';
import {API_BASE_URL} from '@env';

const customAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

customAxios.interceptors.request.use(async config => {
  const accessToken = useTokenStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

customAxios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const {accessToken, refreshToken} = useTokenStore.getState();
        const response = await customAxios.post('/auth/reissue', {
          accessToken,
          refreshToken,
        });

        // 토큰 재발급 후 Zustand 스토어에 저장
        useTokenStore.getState().setAccessToken(response.data.accessToken);
        useTokenStore.getState().setRefreshToken(response.data.refreshToken);

        // 재발급된 토큰으로 원래 요청 다시 시도
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return customAxios(originalRequest);
      } catch (error) {
        // 재발급 실패 처리
        useTokenStore.getState().clearTokens();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default customAxios;
