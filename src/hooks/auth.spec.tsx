import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const mockStartAsync = jest.fn();
jest.mock('expo-auth-session', () => {
  return { startAsync: () => mockStartAsync() };
});

jest.mock('expo-apple-authentication', () => ({}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: async () => { }
}));

describe('Auth Hook', () => {

  it('should be able to sign in with Google account existent', async () => {    
    const userTest = {
      id: 'any_id',
      email: 'test@email.com',
      name: 'Testador Beta',
      photo: 'any_photo.png'
    };
    
    mockStartAsync.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'google-token'
      }
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });

  it('user should not connect if cancel authentication with Google', async () => {
    mockStartAsync.mockReturnValueOnce({
        type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });

  it('should be error sign in with  Incorrectly Google Parameters', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    try{
      await act(() => result.current.signInWithGoogle());
    } catch{
      expect(result.current.user).toEqual({});
    }
  });
});
