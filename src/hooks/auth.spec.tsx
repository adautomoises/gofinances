import { renderHook } from '@testing-library/react-native';
import { AuthProvider, useAuth } from './auth';


describe('Auth Hook', () => {
  it('should be able to sign in with Google account existent', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    console.log(result);

  });
});