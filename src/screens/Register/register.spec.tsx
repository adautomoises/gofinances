import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';

import { Register } from '.';

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

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

interface Props {
  children: React.ReactNode;
};

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </NavigationContainer>
  )
};

describe('Register Screen', () => {
  it('should be open category modal when user click on button', () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers
      }     
    );
    const categoryModal = getByTestId('modal-category');
    const buttonCategory = getByTestId('button-category');  
    fireEvent.press(buttonCategory);

    expect(categoryModal.props.visible).toBeTruthy();
  });
});