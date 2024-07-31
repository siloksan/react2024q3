import { act, renderHook } from '@testing-library/react';
import { ThemeProvider, useTheme, useThemeUpdate } from './ThemeProvider';

describe('ThemeProvider', () => {
  it('should change theme', () => {
    const { result } = renderHook(
      () => ({
        theme: useTheme(),
        changeTheme: useThemeUpdate(),
      }),
      {
        wrapper: ThemeProvider,
      }
    );

    act(() => {
      result.current.changeTheme();
    });

    expect(result.current.theme).toEqual(true);
  });
});
