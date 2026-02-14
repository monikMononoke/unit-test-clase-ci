import { renderHook, waitFor } from '@testing-library/react';
import { usePolling } from './usePolling';

describe('usePolling spec', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  it('Should return count equals 0 when initialize the hook', () => {
    // Arrange
    const pollingTime = 500;

    // Act
    const { result } = renderHook(() => usePolling(pollingTime));

    // Assert
    expect(result.current.count).toEqual(0);
  });

  it('Should return 1 when count has been update to 1', async () => {
    // Arrange
    const pollingTime = 500;

    // Act
    const { result } = renderHook(() => usePolling(pollingTime));

    // Assert
    await waitFor(() => {
      expect(result.current.count).toEqual(1);
    });
  });

  it('Should return 3 when count has been update 3 times', async () => {
    // Arrange
    const pollingTime = 500;

    // Act
    const { result } = renderHook(() => usePolling(pollingTime));

    // Assert
    await waitFor(
      () => {
        expect(result.current.count).toEqual(3);
      },
      { timeout: 2000 }
    );
  });

  it('Should call clearInterval when it unmounts the component', async () => {
    // Arrange
    const pollingTime = 500;
    vi.spyOn(window, 'clearInterval');
    // Act
    const { unmount } = renderHook(() => usePolling(pollingTime));

    // Assert
    expect(window.clearInterval).not.toHaveBeenCalled();

    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });

  it('Should call clearInterval when it unmounts the component', async () => {
    // Arrange
    const pollingTime = 500;
    vi.spyOn(window, 'clearInterval');
    // Act
    const { unmount } = renderHook(() => usePolling(pollingTime));

    // Assert
    expect(window.clearInterval).not.toHaveBeenCalled();

    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});
