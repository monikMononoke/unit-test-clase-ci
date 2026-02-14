import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';
import { ThemeProvider } from './theme.context';

describe('useTheme', () => {
  it('should return a theme equals {primaryColor: "darkgray"} when it renders the hook and calls to onChangeDarkTheme (with wrapper provider)', () => {
    // Arrange
    const provider = (props) => <ThemeProvider>{props.children}</ThemeProvider>;

    // Act
    const { result } = renderHook(() => useTheme(), { wrapper: provider });

    act(() => {
      result.current.onChangeDarkTheme();
    });
    // Assert
    expect(result.current.theme).toEqual({ primaryColor: 'darkgray' });
  });

  it('should return a theme equals {primaryColor: "darkgray"} when it renders the hook and calls to onChangeDarkTheme (with wrapper: ThemeProvider)', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    act(() => {
      result.current.onChangeDarkTheme();
    });
    // Assert
    expect(result.current.theme).toEqual({ primaryColor: 'darkgray' });
  });
});
