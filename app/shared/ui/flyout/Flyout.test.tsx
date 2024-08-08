import { render, screen } from '@testing-library/react';
import Provider from '~/features/providers';
import Flyout from './Flyout';

describe('Flyout', () => {
  function customRender() {
    render(
      <Provider>
        <Flyout />
      </Provider>
    );
  }

  it.todo('should renders Flyout');
  it('should render Flyout', () => {
    customRender();

    const flyout = screen.getByTestId('flyout');

    expect(flyout).toBeInTheDocument();
  });
});
