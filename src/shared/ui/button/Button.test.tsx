import { render, screen } from '@testing-library/react';

import Button from './Button';

vi.mock('@/features/providers/themeProvider', () => {
  return {
    useTheme: vi.fn().mockReturnValue(true),
  };
});

describe('Button', () => {
  it('should be render', () => {
    render(<Button>test</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent(/test/i);
  });

  it('should have additional class name', () => {
    render(<Button additionalStyles="test_class">test</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass(/test_class/i);
  });

  it('should be in the dark mode', () => {
    render(<Button>test</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass(/dark/i);
  });
});
