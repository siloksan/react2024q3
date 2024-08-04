import { render, screen } from '@testing-library/react';
import Wrapper from './_wrapper';

vi.mock('@/features/providers/themeProvider', () => {
  return {
    useTheme: vi.fn().mockReturnValue(true),
  };
});

describe('Wrapper', () => {
  it('should render Wrapper', async () => {
    render(
      <Wrapper>
        <h1>Content</h1>
      </Wrapper>
    );

    const wrapper = screen.getByTestId('layout');

    expect(wrapper).toBeInTheDocument();
  });

  it('should have dark theme', async () => {
    render(
      <Wrapper>
        <h1>Content</h1>
      </Wrapper>
    );

    const wrapper = screen.getByTestId('layout');

    expect(wrapper).toHaveClass(/dark/i);
  });
});
