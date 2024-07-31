describe('Flyout', () => {
  it.todo('should renders Flyout');
  // it('should render Flyout', () => {
  //   renderWithProviders(<Flyout />);

  //   const flyout = screen.getByTestId('flyout');

  //   expect(flyout).toBeInTheDocument();
  // });

  // it('should unselected all items when button clicked', async () => {
  //   const createObjectURLMock = vi.spyOn(URL, 'createObjectURL').mockImplementation(() => 'mock-url');

  //   const initialSelectedItems = [
  //     {
  //       uid: 'test1',
  //       name: 'test1',
  //       spacecraftClass: null,
  //       owner: null,
  //       operator: null,
  //       affiliation: null,
  //       registry: null,
  //       status: 'active',
  //       dateStatus: '2021-01-01T00:00:00.000Z',
  //     },
  //   ];

  //   const store = setupStore({
  //     selectedItems: {
  //       value: initialSelectedItems,
  //     },
  //   });
  //   renderWithProviders(<Flyout />, {
  //     store,
  //   });

  //   const button = screen.getByRole('button', { name: /unselect/i });
  //   const user = userEvent.setup();
  //   await user.click(button);

  //   expect(store.getState().selectedItems.value).toHaveLength(0);
  //   createObjectURLMock.mockRestore();
  // });
});
