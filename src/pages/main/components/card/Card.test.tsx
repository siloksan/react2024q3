import { DUMMY_SPACECRAFTS_RESPONSE } from 'shared/api/mock/mocks/dummyData/dummySpaceCraftsResponse';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';

describe('Card', () => {
  const props = {
    spacecraft: DUMMY_SPACECRAFTS_RESPONSE.spacecrafts[0],
    dataStorage: {
      name: 'test',
      uid: 'test',
      page: '1',
    },
    openDetails: vi.fn(),
  };

  it('should renders Card', () => {
    render(<Card {...props} />);

    const item = screen.getByRole('listitem');
    expect(item).toBeInTheDocument();
  });

  it('should call openDetails when button is clicked', async () => {
    render(<Card {...props} />);

    const button = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(button);

    expect(props.openDetails).toHaveBeenCalledOnce();
  });

  it('should add class active when datastorage.uid match with spacecraft.uid', async () => {
    const dataStorage = {
      name: 'test',
      uid: 'test1',
      page: '1',
    };
    const openDetails = vi.fn();

    render(
      <Card
        spacecraft={DUMMY_SPACECRAFTS_RESPONSE.spacecrafts[0]}
        dataStorage={dataStorage}
        openDetails={openDetails}
      />
    );

    const item = screen.getByRole('listitem');

    expect(item).toHaveClass(/active/i);
  });
});
