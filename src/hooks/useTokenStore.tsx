import {create} from 'zustand';

interface TokenState {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  clearTokens: () => void;
}

export const useTokenStore = create<TokenState>(set => ({
  accessToken: '',
  refreshToken: '',
  setAccessToken: token => set({accessToken: token}),
  setRefreshToken: token => set({refreshToken: token}),
  clearTokens: () => set({accessToken: '', refreshToken: ''}),
}));
