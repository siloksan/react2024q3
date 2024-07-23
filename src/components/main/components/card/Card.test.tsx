import { DUMMY_SPACECRAFTS_RESPONSE } from 'shared/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import { screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from 'app/store/lib/renderWithProviders';
import Card from './Card';

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

  renderWithProviders(<RouterProvider router={router} />);
}

describe('Card', () => {
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

  it("shouldn't be checked when checkbox is clicked twice", async () => {
    customRender('test1');

    const checkbox = screen.getByRole('checkbox');

    const user = userEvent.setup();
    await user.click(checkbox);
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
});
