import { DUMMY_SPACECRAFTS_RESPONSE } from 'shared/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import userEvent from '@testing-library/user-event';
import Card from './Card';

describe('Card', () => {
  const props = {
    spacecraft: DUMMY_SPACECRAFTS_RESPONSE.spacecrafts[0],
  };

  function customRender(id: string) {
    const routes = [
      {
        path: '/',
        element: <Card {...props} />,
        children: [{ path: 'spacecrafts/:spacecraftId', element: <div>Test</div> }],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', `/spacecrafts/${id}`],
      initialIndex: 1,
    });

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  }

  it('should renders Card', () => {
    customRender('test1');

    const item = screen.getByRole('listitem');
    expect(item).toBeInTheDocument();
  });

  it('should add class active when uid match with spacecraft.uid', async () => {
    customRender('test1');

    const item = screen.getByRole('listitem');

    expect(item).toHaveClass(/active/i);
  });

  it("shouldn't add class active when uid don't match with spacecraft.uid", async () => {
    customRender('test2');

    const item = screen.getByRole('listitem');

    expect(item).not.toHaveClass(/active/i);
  });

  it('should be checked when checkbox is clicked', async () => {
    customRender('test1');

    const checkbox = screen.getByRole('checkbox');

    const user = userEvent.setup();
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
