import { fireEvent, render, screen } from '@testing-library/react';
import ErrorButton from './ErrorButton';

describe('ErrorButton', () => {
  it('should throw an error', async () => {
    render(<ErrorButton />);

    expect(() => {
      const button = screen.getByRole('button');
      fireEvent.click(button);
    }).toThrow("It seems like you've broken something!");
  });
});
