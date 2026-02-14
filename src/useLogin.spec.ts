import { useLogin } from './useLogin';
import { Credential, User } from './model';
import { renderHook, act, waitFor } from '@testing-library/react';
import * as api from './api';

describe('useLogin', () => {
  it('Should return an object credential with default name and password and setCredential a function when it calls it', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useLogin());

    // Assert
    const defaultCredential: Credential = { name: '', password: '' };

    expect(result.current.credential).toEqual(defaultCredential);
    expect(result.current.setCredential).toEqual(expect.any(Function));
  });

  it('Should set the credential with new value when passed to setCredential', () => {
    // Arrange
    const newCredential: Credential = { name: 'admin', password: 'test' };

    // Act
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setCredential(newCredential);
    });

    // Assert
    expect(result.current.credential).toEqual(newCredential);
  });

  it('Should return User equals null and onLogin function', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useLogin());

    // Assert

    expect(result.current.user).toBeNull();
    expect(result.current.onLogin).toEqual(expect.any(Function));
  });

  it('Should update user when onLogin is called', async () => {
    // Arrange
    const adminUser: User = { email: 'admin@gmail.com', role: 'admin' };
    vi.spyOn(api, 'login').mockResolvedValue(adminUser);
    // Act
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.onLogin();
    });

    // Assert
    expect(api.login).toHaveBeenCalled();
    await waitFor(
      () => {
        expect(result.current.user).toEqual(adminUser);
      },
      { timeout: 1500 }
    );
  });
});
