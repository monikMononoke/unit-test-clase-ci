import '@testing-library/jest-dom/vitest';

// Workaround para arreglar los timers de vitest con `waitFor` en `@testing-library/react`
// Issue: https://github.com/testing-library/react-testing-library/issues/1197

globalThis.jest = {
  ...globalThis.jest,
  advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
};
